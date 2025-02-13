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
import { RegisterData } from "../../ApiConnect/Constants";
import { RegisterFetch } from "../../ApiConnect/Endpoints";

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
            alignItems: "center",
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
    error: {
      main: "#FF0000", // Цвет для ошибок
    },
  },
});

export const RegistrationPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: ["Passwords do not match"],
      }));
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: [] }));
    }

    const data: RegisterData = {
      login,
      email,
      password,
      firstname,
      lastname,
    };

    const result = await RegisterFetch(data);

    console.log(result.errors);

    if (!result.success) {
      setErrors(result.errors);
    } else {
      setErrors({});
      console.log("Registration successful:", result.data);
      // Сохраните данные пользователя или выполните другие действия
      localStorage.setItem("userId", result.data.id);
      localStorage.setItem("userName", result.data.username);
      localStorage.setItem("userEmail", result.data.email);
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
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
            <h1>Sign Up</h1>
          </Typography>
          <Grid width={"100%"}>
            <TextField
              label="Login"
              value={login}
              color="primary"
              required
              onChange={(e) => setLogin(e.target.value)}
              sx={{ width: "90%" }}
              error={!!errors.Login}
              helperText={errors.Login?.join(", ")}
            />
          </Grid>
          <Grid width={"100%"}>
            <TextField
              label="Email"
              value={email}
              color="primary"
              required
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "90%" }}
              error={!!errors.Email}
              helperText={errors.Email?.join(", ")}
            />
          </Grid>
          <Grid width={"100%"}>
            <TextField
              label="First name"
              value={firstname}
              color="primary"
              required
              onChange={(e) => setFirstname(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid width={"100%"}>
            <TextField
              label="Last name"
              value={lastname}
              color="primary"
              onChange={(e) => setLastname(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid width={"100%"}>
            <TextField
              label="Password"
              type="password"
              value={password}
              color="primary"
              required
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "90%" }}
              error={!!errors.Password}
              helperText={errors.Password?.join(", ")}
            />
          </Grid>
          <Grid width={"100%"}>
            <TextField
              label="Confirm password"
              type="password"
              value={confirmPassword}
              color="primary"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ width: "90%" }}
              error={!!errors.confirmPassword || !!errors.Password}
              helperText={
                errors.confirmPassword?.join(", ") ||
                errors.Password?.join(", ")
              }
            />
          </Grid>
          <Grid container direction={"row"} spacing={2}>
            <Link href="/login">Do you have an account?</Link>
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
              onClick={handleRegister}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
