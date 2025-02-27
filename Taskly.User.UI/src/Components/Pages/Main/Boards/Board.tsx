import { Grid2 as Grid } from "@mui/material";
import { Sticker } from "../Stickers/Sticker";

export const Board = () => {
  return (
    <>
      <Grid sx={{ width: "100%", height: "100vh" }}>
        <Sticker></Sticker>
      </Grid>
    </>
  );
};
