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
  const [publishToggle, setPublishToggle] = React.useState(false);
  const modalRef = React.useRef<ModalRef>();

  React.useEffect(() => {
    if (user)
      service
        .getUserSudokus(user.username)
        .then((res) => setSudoku(res))
        .catch((e) => console.log(e));
  }, [user, publishToggle]);

  const onSudokuPublish = React.useCallback((id: number | undefined) => {
    if (id) {
      service
        .publishSudoku(id)
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
    (id: number | undefined, published: number) => {
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
