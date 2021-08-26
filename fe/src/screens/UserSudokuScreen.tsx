import React, { MutableRefObject } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Navbar from "../components/Navbar";
import SudokuCard from "../components/SudokuCard";
import { Sudoku } from "../types/Sudoku";
import { User } from "../types/User";
import CustomModal, { ModalRef } from "../components/CustomModal";

interface Props {
  sudoku: Sudoku[];
  user: User | undefined;
  modalRef: MutableRefObject<ModalRef | undefined>;
  onSudokuPublish: (id: number | undefined) => void;
  onGoSolveSudoku: (id: number | undefined) => void;
  onSudokuDelete: (id: number | undefined, published: number) => void;
}

const UserSudokuScreen = ({
  sudoku,
  user,
  modalRef,
  onSudokuDelete,
  onSudokuPublish,
  onGoSolveSudoku,
}: Props) => {
  const [boardInfo, setBoardInfo] = React.useState<{
    id: number;
    published: number;
  }>();
  const onOpenDeleteDialog = React.useCallback(
    (id: number | undefined, published: number) => {
      if (id) {
        setBoardInfo({ id: id, published: published });
        modalRef && modalRef.current?.openDialog();
      }
    },
    [modalRef]
  );

  const acceptButtonAction = React.useCallback(() => {
    if (boardInfo) onSudokuDelete(boardInfo.id, boardInfo.published);
  }, [boardInfo, onSudokuDelete]);

  return (
    <>
      <Navbar pageName="My Sudoku" />
      <Box px={5} py={5}>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography>
              On this page you can see a list of the unique Sudoku you've found
              and added. If you didn't publish them all, you still can. Note: If
              you delete a published Sudoku, it will still appear on the front
              page, but be deleted from the list of your Sudokus.
            </Typography>
          </Grid>
          {sudoku.map((item, index) => {
            const source = item.boardImage.toString("base64");
            return (
              <Grid item md={3} sm={4} key={`user-sudoku-card${index}`}>
                <SudokuCard
                  sudoku={item}
                  image={source}
                  user={user}
                  onSudokuPublish={onSudokuPublish}
                  onOpenDeleteDialog={onOpenDeleteDialog}
                  onGoSolveSudoku={onGoSolveSudoku}
                />
              </Grid>
            );
          })}
        </Grid>
        <CustomModal
          title="Delete Sudoku?"
          ref={modalRef}
          acceptButtonAction={acceptButtonAction}
          acceptButtonText="Delete"
        />
      </Box>
    </>
  );
};

export default UserSudokuScreen;
