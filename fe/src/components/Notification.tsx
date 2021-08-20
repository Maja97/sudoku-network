import React from "react";
import { makeStyles, Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { hideNotification } from "../redux/notification/notificationRedux";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );
  const classes = useStyles({
    color: notification ? notification.color : "",
    backgroundColor: notification ? notification.backgroundColor : "",
  });

  const handleClose = React.useCallback(() => {
    dispatch(hideNotification());
  }, [dispatch]);

  return (
    <Snackbar
      autoHideDuration={3000}
      open={Boolean(notification)}
      onClose={handleClose}
      message={notification?.message}
      ContentProps={{
        className: classes.notification,
      }}
    />
  );
};

interface StyleProps {
  color: string;
  backgroundColor: string;
}

const useStyles = makeStyles({
  notification: (props: StyleProps) => ({
    color: props.color,
    backgroundColor: props.backgroundColor,
  }),
});

export default Notification;
