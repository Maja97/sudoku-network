import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ModalRef } from "../components/CustomModal";
import { goToSingleSudoku } from "../helpers/navigation";
import { RootState } from "../redux/store";
import UserSudokuScreen from "../screens/UserSudokuScreen";
import service from "../service/service";
import { Sudoku } from "../types/Sudoku";

const UserSudokuContainer = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.auth.user);
  const [sudoku, setSudoku] = React.useState<Sudoku[]>([]);
  const [publishToggle, setPublishToggle] = React.useState<boolean>(false);
  const modalRef = React.useRef<ModalRef>();

  React.useEffect(() => {
    if (user)
      service
        .getUserSudokus(user.username)
        .then((res) => {
          service
            .getAllSolvedByUser(user.username)
            .then((all) => {
              const ids = all.map((item: any) => item.board_id);
              const newSudoku = res.map((item) =>
                item.boardId && ids.includes(item.boardId)
                  ? {
                      ...item,
                      solved: true,
                    }
                  : item
              );
              setSudoku(newSudoku);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
  }, [user, publishToggle]);

  const onSudokuPublish = React.useCallback((id: number | undefined) => {
    if (id) {
      service
        .publishSudoku(id, dayjs().format("YYYY-MM-DD HH:mm:ss"))
        .then((res) => setPublishToggle((prev) => !prev))
        .catch((err) => console.log(err));
    }
  }, []);

  const onGoToSingleSudoku = React.useCallback(
    (id: number | undefined) => {
      if (id) goToSingleSudoku(history, id);
    },
    [history]
  );

  const onSudokuDelete = React.useCallback(
    (id: number | undefined, published: number | null) => {
      if (id)
        service
          .deleteSudoku(id, published)
          .then((res) => {
            modalRef.current?.closeDialog();
            setPublishToggle((prev) => !prev);
          })
          .catch((e) => {
            modalRef.current?.closeDialog();
          });
    },
    []
  );

  return (
    <UserSudokuScreen
      sudoku={sudoku}
      modalRef={modalRef}
      user={user}
      onSudokuPublish={onSudokuPublish}
      onGoSolveSudoku={onGoToSingleSudoku}
      onSudokuDelete={onSudokuDelete}
    />
  );
};

export default UserSudokuContainer;
