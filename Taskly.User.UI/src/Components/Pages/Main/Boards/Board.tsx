import { Grid2 as Grid, List, ListItem } from "@mui/material";
import { Sticker } from "../Stickers/Sticker";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useEffect } from "react";
import { selectSelectedBoard } from "../../../../Store/Redusers/boardsSlice";
import {
  fetchStickers,
  selectStickers,
} from "../../../../Store/Redusers/stickersSlice";

export const Board = () => {
  const dispatch = useAppDispatch();

  const selectedBoard = useAppSelector(selectSelectedBoard);
  const stickers = useAppSelector(selectStickers);

  useEffect(() => {
    const fetchStickersFromApi = async () => {
      const boardId = selectedBoard?.id;
      if (boardId) {
        dispatch(fetchStickers(boardId));
      }
    };

    fetchStickersFromApi();
  }, [dispatch, selectedBoard]);

  return (
    <>
      <Grid container direction={"row"} sx={{ width: "100%", height: "100vh" }}>
        <List>
          {stickers.map((sticker) => (
            <ListItem>
              <Sticker {...sticker} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
};
