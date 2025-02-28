import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./Redusers/boardsSlice";
import stickersReducer from "./Redusers/stickersSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    stickers: stickersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;