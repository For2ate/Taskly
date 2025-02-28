import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GetBoardsForUser, AddNewBoard } from "../../Components/ApiConnect/Endpoints";
import { RootState } from "../store";
import { BoardModel } from "../../Components/ApiConnect/Models";


interface BoardsState {
  boards: BoardModel[];
  selectedBoard: BoardModel | null; // Новое поле для выбранной доски
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  selectedBoard: null, // Инициализация выбранной доски
  status: "idle",
  error: null,
};

// Асинхронный Thunk для получения досок
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (userId: string) => {
    const response = await GetBoardsForUser(userId);
    return response;
  }
);

// Асинхронный Thunk для добавления новой доски
export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (boardData: { userId: string; name: string; color: string }) => {
    const response = await AddNewBoard(boardData);
    return response;
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    selectBoard: (state, action: PayloadAction<BoardModel>) => {
      state.selectedBoard = action.payload;
    },
    clearSelectedBoard: (state) => {
      state.selectedBoard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardModel[]>) => {
        state.status = "succeeded";
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch boards";
      })
      .addCase(addBoard.fulfilled, (state, action: PayloadAction<BoardModel>) => {
        state.boards.push(action.payload);
      });
  },
});

export const { selectBoard, clearSelectedBoard } = boardsSlice.actions;

export const selectBoards = (state: RootState) => state.boards.boards;
export const selectSelectedBoard = (state: RootState) => state.boards.selectedBoard;

export default boardsSlice.reducer;
