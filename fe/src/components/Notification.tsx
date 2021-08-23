import React from "react";
import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { hideNotification } from "../redux/notification/notificationRedux";
import CloseIcon from "@material-ui/icons/Close";
import { ZoomTransition } from "./CustomModal";

const Notification = () => {
  const snackbarRef = React.useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );
  const classes = useStyles({
    color: notification ? notification.color : "",
    backgroundColor: notification ? notification.backgroundColor : "",
  });

  React.useEffect(() => {
    if (notification) setOpen(true);
  }, [notification]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    dispatch(hideNotification());
  }, [dispatch]);

  return (
    <Snackbar
      ref={snackbarRef}
      autoHideDuration={5000}
      open={open}
      onClose={handleClose}
      message={notification?.message}
      action={
        <IconButton size="small" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      TransitionComponent={ZoomTransition}
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
