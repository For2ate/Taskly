import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StickerModel } from "../../Components/ApiConnect/Models";
import { GetStickerById, GetStickersIdForBoard, UpdateSticker } from "../../Components/ApiConnect/Endpoints";
import { RootState } from "../store";


interface stickersState {
    stickers: StickerModel[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState : stickersState = {
    stickers: [],
    status: "idle",
    error: null
}

export const fetchStickers = createAsyncThunk(
    "stickers/fetchStickers",
    async(boardId: string) => {

        const response = await GetStickersIdForBoard(boardId);
        const stickerPromises = response.map((stickerId:string) => GetStickerById(stickerId));

        const results = await Promise.allSettled(stickerPromises);

        // Фильтруем успешные запросы
        const stickers = results
            .filter(result => result.status === "fulfilled")
            .map(result => (result as PromiseFulfilledResult<StickerModel>).value);

        return stickers;
    }
)

export const updateStickerOnServer = createAsyncThunk(
    "stickers/updateStickerOnServer",
    async (updatedSticker: StickerModel, { dispatch }) => {

        await UpdateSticker(updatedSticker);

        dispatch(updateSticker(updatedSticker));

        return updatedSticker;
    }
);

const stickersSlice = createSlice({
    name: "stickers",
    initialState,
    reducers: {
        updateSticker: (state, action) => {
            const updatedSticker = action.payload;
            const index = state.stickers.findIndex(sticker => sticker.id === updatedSticker.id);
            if (index !== -1) {
                state.stickers[index] = updatedSticker;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStickers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStickers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.stickers = action.payload;
            })
            .addCase(fetchStickers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    }
});


export const { updateSticker } = stickersSlice.actions;

export const selectStickers = (state: RootState) => state.stickers.stickers;

export default stickersSlice.reducer;
