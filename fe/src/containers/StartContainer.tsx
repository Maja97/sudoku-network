import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { goToHomePage, goToLogin } from "../helpers/navigation";
import { RootState } from "../redux/store";
import StartScreen from "../screens/StartScreen";

const StartContainer = () => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.auth.user);

  React.useEffect(() => {
    if (user) goToHomePage(history);
  }, [history, user]);

  const navigateToLogin = React.useCallback(
    () => goToLogin(history),
    [history]
  );
  return <StartScreen goToLogin={navigateToLogin} />;
};

export default StartContainer;
