import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    textSideBar: {
        main: string, // Основной цвет
        light: string,
        dark: string,
        contrastText: string,
    };
  }

  interface PaletteOptions {
    textSideBar?: {
        main?: string, // Основной цвет
        light?: string,
        dark?: string,
        contrastText?: string,
    };
  }
}

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
      textSideBar: true; // Добавляем поддержку пользовательского цвета
    }
}