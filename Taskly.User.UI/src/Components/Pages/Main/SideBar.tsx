import { Button, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SearchIcon from "@mui/icons-material/Search";
import { Boards } from "./Boards/Boards";
import { useSidebar } from "../../../hooks";

export const SideBar = () => {
  const { isOpen } = useSidebar();

  return (
    <Grid
      container
      direction="column"
      sx={{
        width: isOpen ? "250px" : "70px", // Минимальная ширина для полоски
        height: "100vh", // Высота на весь экран
        backgroundColor: "#E5E3E3", // Цвет фона из темы
        borderRight: "1px solid rgba(255, 255, 255, 0)",
        padding: "0px",
        transition: "width 0.3s", // Плавный переход
        overflow: "hidden", // Скрыть содержимое при скрытии
      }}
    >
      {isOpen ? <OpenSideBar /> : <CloseSideBar />}
    </Grid>
  );
};

const OpenSideBar = () => {
  const { toggleSideBar } = useSidebar();

  return (
    <>
      <Grid size={12}>
        <Grid
          container
          direction={"row"}
          spacing={2}
          sx={{ marginTop: "2%", width: "100%", marginBottom: "5%" }}
        >
          <Grid size={{ xs: 4 }}>
            {/* <img src="/TasklyLogo.jpeg" alt="Taskly Logo" /> */}
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="h5" color="textSideBar">
              Taskly
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 4 }}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "8px",
            }}
          >
            <IconButton
              onClick={toggleSideBar}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <FastRewindIcon color="textSideBar"></FastRewindIcon>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ marginBottom: "5px" }}>
        <Button
          sx={{
            width: "90%",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "flex-start", width: "100%" }}
          >
            <Grid size={2}>
              <SearchIcon></SearchIcon>
            </Grid>
            <Grid size={4}>
              <Typography color="textSideBar" style={{ textTransform: "none" }}>
                {" "}
                Search{" "}
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid
        size={12}
        sx={{
          width: "100%",
          height: "50%",
        }}
      >
        <Boards />
      </Grid>
      <Grid size={12}>
        <Grid container direction={"row"} spacing={2}>
          <Grid size={{ xs: 4 }}></Grid>
          <Grid size={{ xs: 8 }}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

const CloseSideBar = () => {
  const { toggleSideBar } = useSidebar();

  return (
    <Grid container direction={"column"} sx={{ marginTop: "10px" }}>
      <Grid
        size={{ xs: 12 }}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "8px",
        }}
      >
        <IconButton
          onClick={toggleSideBar}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <FastForwardIcon color="textSideBar" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
