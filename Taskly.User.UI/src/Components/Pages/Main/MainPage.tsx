import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  TextField,
  Button,
  Typography,
  CssBaseline,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SideBar } from "../../CommonComponents/SideBar";
import { SidebarProvider } from "../../Contexts/SidebarContext";

const theme = createTheme({
  typography: {
    fontFamily: "Sora",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Отключаем эффект ripple для всех кнопок
      },
      styleOverrides: {
        root: {
          "& .MuiButton-root": {
            borderRadius: "25px / 25px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    MuiGrid2: {
      defaultProps: {},
      styleOverrides: {
        root: {
          "&:not(.MuiGrid2-container)": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      },
    },
  },
  palette: {
    textSideBar: {
      main: "#353535",
      light: "#353535",
      dark: "#353535",
      contrastText: "#353535",
    },
    primary: {
      main: "#FF2800", // Основной цвет
      light: "#FF5D40",
      dark: "#BF4630",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FF8300", // Вторичный цвет
      light: "#FFA240",
      dark: "#A65500",
      contrastText: "#black",
    },
    error: {
      main: "#FF0000", // Цвет для ошибок
    },
  },
});

export const MainPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ background: "white" }}>
        <Grid>
          <SidebarProvider>
            <SideBar></SideBar>
          </SidebarProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
