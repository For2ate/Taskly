import React, { useEffect, useState } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Для управления меню
  const [selectedBoardForMenu, setSelectedBoardForMenu] =
    useState<BoardModel | null>(null); // Для хранения выбранного элемента

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

  // Обработчик открытия меню
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    board: BoardModel
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBoardForMenu(board);
  };

  // Обработчик закрытия меню
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBoardForMenu(null);
  };

  // Обработчик удаления доски
  const handleDeleteBoard = () => {
    if (selectedBoardForMenu) {
      // Здесь добавьте логику для удаления доски
      console.log("Удалить доску:", selectedBoardForMenu);
      handleMenuClose();
    }
  };

  // Обработчик изменения доски
  const handleEditBoard = () => {
    if (selectedBoardForMenu) {
      // Здесь добавьте логику для изменения доски
      console.log("Изменить доску:", selectedBoardForMenu);
      handleMenuClose();
    }
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
      <Grid container direction={"column"}>
        <Accordion sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container direction={"row"} sx={{ width: "90%" }}>
              <Grid size={7}>
                <Typography component="span">My boards</Typography>
              </Grid>
              <Grid size={5}>
                <Button onClick={handleOpenDialog}>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              background: "transparent",
              height: "200px",
              flex: 1,
              overflow: "auto",
              width: "90%",
            }}
          >
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
                    <Button onClick={(event) => handleMenuClick(event, board)}>
                      <MoreVertIcon />
                    </Button>
                  </ListItemButton>
                ))}
              </List>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* Меню для кнопки MoreVertIcon */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditBoard}>Изменить</MenuItem>
        <MenuItem onClick={handleDeleteBoard}>Удалить</MenuItem>
      </Menu>

      <CreateBoardDialog open={openDialog} onClose={handleCloseDialog} />
    </Grid>
  );
};
