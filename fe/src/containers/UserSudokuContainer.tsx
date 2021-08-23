import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserSudokuScreen from "../screens/UserSudokuScreen";
import service from "../service/service";
import { Sudoku } from "../types/Sudoku";

const UserSudokuContainer = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [sudoku, setSudoku] = React.useState<Sudoku[]>([]);
  const [publishToggle, setPublishToggle] = React.useState(false);

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

  return (
    <UserSudokuScreen
      sudoku={sudoku}
      user={user}
      onSudokuPublish={onSudokuPublish}
    />
  );
};

export default UserSudokuContainer;
