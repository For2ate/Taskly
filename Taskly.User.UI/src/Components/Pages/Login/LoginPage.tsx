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
import backgroundImage from "../../Assets/background.png"; // Импортируем изображение
import { LoginFetch } from "../../ApiConnect/Endpoints";
import { LoginData } from "../../ApiConnect/Constants";

// Создаём кастомную тему
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
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px / 25px", // Закругленные углы
            "& fieldset": {
              border: "2px solid rgba(255, 255, 255, 0.24)",
            },
            "&:hover fieldset": {
              borderColor: "#AAAAAA", // Цвет границы при наведении
            },
            "&.Mui-focused fieldset": {
              borderColor: "#AAAAAA", // Цвет границы при фокусе
            },
          },
          "& .MuiInputLabel-root": {
            color: "white", // Цвет текста метки
            "&.Mui-focused": {
              color: "white", // Цвет текста метки при фокусе
            },
          },
          "& .MuiInputBase-input": {
            color: "white", // Цвет текста внутри поля
          },
        },
      },
    },
    MuiGrid2: {
      defaultProps: {},
      styleOverrides: {
        root: {
          "&:not(.MuiGrid2-container)": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center,",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#FFFFFF", // Основной цвет
      light: "#FFFFFF",
      dark: "#AAAAAA",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FFFFFF", // Вторичный цвет
      light: "#FFAC40",
      dark: "#BF8130",
      contrastText: "#white",
    },
  },
});

export const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data: LoginData = { login, password };
    const result = await LoginFetch(data);

    if (result) {
      console.log("Login successful:", result);

      localStorage[`userId`] = result.id;
      localStorage[`userName`] = result.username;
      localStorage[`userEmail`] = result.email;
    } else {
      // Ошибка логина
      console.error("Login failed:", result);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          background: "#f5f5f5",
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat", // Отдельное свойство для запрета повторения
          backgroundSize: "cover", // Масштабирование изображения
          backgroundPosition: "center", // Центрирование изображения
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          rowSpacing={2}
          sx={{
            border: "2px solid rgba(255,255,255, .1)",
            padding: "2%",
            minHeight: "55vh",
            width: { xs: "100%", sm: "60%", md: "40%", lg: "30%" },
            display: "flex",
            flexDirection: "column",
            borderRadius: "25px/25px",
            backdropFilter: "blur(30px)",
          }}
        >
          <Typography color="primary">
            <h1>Sign In</h1>
          </Typography>
          <Grid width={"100%"}>
            <TextField
              label="Login"
              value={login}
              color="primary"
              required
              onChange={(e) => setLogin(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid width={"100%"}>
            <TextField
              label="Password"
              type="password"
              value={password}
              required
              color="primary"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid container direction={"row"} spacing={2}>
            <Link href="/register">Don't have an account?</Link>
            <Link href="/forgotpass">Forgot password?</Link>
          </Grid>
          <Grid width={"100%"}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "50%",
                borderRadius: "25px/25px",
                fontWeight: "bold",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
