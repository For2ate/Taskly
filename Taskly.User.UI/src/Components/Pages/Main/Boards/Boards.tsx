import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CreateBoardDialog } from "./CreateBoardDialog";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  fetchBoards,
  selectBoard,
  clearSelectedBoard,
  selectBoards,
  selectSelectedBoard,
} from "../../../../Store/Redusers/boardsSlice";
import { BoardModel } from "../../../ApiConnect/Models";

export const Boards = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const selectedBoard = useAppSelector(selectSelectedBoard);

  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    const fetchBoardsFromApi = async () => {
      const userId = localStorage[`userId`];
      dispatch(fetchBoards(userId));
    };

    fetchBoardsFromApi();
  }, [dispatch]);

  const handleBoardClick = (board: BoardModel) => {
    dispatch(selectBoard(board));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(clearSelectedBoard());
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        alignContent: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid size={12}>
        <Button sx={{ width: "90%" }} onClick={handleOpenDialog}>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "flex-start", width: "100%" }}
          >
            <Grid size={2}>
              <AddIcon />
            </Grid>
            <Grid size={9}>
              <Typography color="textSideBar" style={{ textTransform: "none" }}>
                {" "}
                Create New Board{" "}
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid container direction={"column"} sx={{ flex: 1, overflow: "auto" }}>
        <Accordion sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Boards</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid size={12}>
              <List
                sx={{
                  width: "100%",
                  height: "100%",
                  overflowY: "hidden",
                }}
              >
                {boards.map((board) => (
                  <ListItemButton
                    key={board.id}
                    selected={selectedBoard?.id === board.id}
                    onClick={() => handleBoardClick(board)}
                    color="primary"
                    sx={{
                      backgroundColor:
                        selectedBoard?.id === board.id
                          ? "rgba(0, 0, 0, 0.1)"
                          : "transparent",
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemAvatar sx={{ color: board.color }}>
                      <AutoAwesomeMosaicIcon />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ color: "#000000" }}
                      primary={board.name}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <CreateBoardDialog open={openDialog} onClose={handleCloseDialog} />
    </Grid>
  );
};
