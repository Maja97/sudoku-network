import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  Zoom,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import colors from "../constants/colors";

export interface ModalRef {
  openDialog: () => void;
  closeDialog: () => void;
}

interface Props {
  title: string;
  content?: JSX.Element;
  acceptButtonText: string;
  cancelDisabled?: boolean;
  acceptButtonAction: () => void;
}

export const ZoomTransition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => {
    return <Zoom in={true} ref={ref} {...props} />;
  }
);

const CustomModal = (
  {
    title,
    content,
    acceptButtonText,
    cancelDisabled,
    acceptButtonAction,
  }: Props,
  ref: any
) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = React.useCallback(() => setOpen(false), []);

  React.useImperativeHandle(ref, (): ModalRef => ({ openDialog, closeDialog }));

  return (
    <Dialog open={open} TransitionComponent={ZoomTransition}>
      <DialogTitle>
        <Typography classes={{ root: classes.title }}>{title}</Typography>
      </DialogTitle>
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        {!cancelDisabled && (
          <Button disableRipple onClick={closeDialog}>
            Cancel
          </Button>
        )}
        <Button
          disableRipple
          className={classes.acceptButton}
          onClick={acceptButtonAction}
        >
          {acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  title: {
    color: colors.darkPurple,
    fontSize: 20,
  },
  acceptButton: {
    color: colors.purple,
  },
});

export default React.forwardRef(CustomModal);
