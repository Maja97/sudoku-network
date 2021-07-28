import React from "react";
import { ACCESS_TOKEN } from "../constants/auth";
import MainRouter from "../routes/MainRouter";
import Notification from "../components/Notification";
import { setHeaders } from "../service/axios";
import service from "../service/service";

const AuthenticationWrapper = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const at = localStorage.getItem(ACCESS_TOKEN);
    if (at) {
      setHeaders(at);
      service
        .checkToken()
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          setHeaders("");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) return null;
  return (
    <>
      <MainRouter />
      <Notification />
    </>
  );
};

export default AuthenticationWrapper;
