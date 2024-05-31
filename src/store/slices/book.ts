import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IErrorResponse} from "@/types/IErrors.ts";
import {IBook} from "@/types/IBook.ts";
import {lastReadBook, library, reaction, recentlyView} from "@/services/book.ts";

interface BookSliceState {
    currentReading: IBook;
    errors: IErrorResponse | null;
    recentlyViewed: {
        items: IBook[];
        loading: boolean;
    },
    library: {
        items: IBook[];
        loading: boolean;
        total_pages: number;
        total_count: number;
        selected: IBook;
    }
}

const initialState: BookSliceState = {
    errors: null,
    currentReading: {} as IBook,
    recentlyViewed: {
        items: [],
        loading: false
    },
    library: {
        total_pages: 0,
        total_count: 0,
        items: [],
        loading: false,
        selected: {} as IBook,
    }
}

export const userSlice = createSlice({
    initialState,
    name: 'book',
    reducers: {
        changeSelectedInLibrary: (state, action: PayloadAction<IBook>) => {
            state.library.selected = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(lastReadBook.fulfilled, (state, action) => {
            state.currentReading = action.payload;
            state.errors = null;
        })
        builder.addCase(lastReadBook.rejected, (state, action) => {
            state.errors = action.payload as IErrorResponse;
        })
        builder.addCase(recentlyView.fulfilled, (state, action) => {
            state.recentlyViewed.items = action.payload;
            state.errors = null;
            state.recentlyViewed.loading = false
        })
        builder.addCase(recentlyView.pending, (state) => {
            state.recentlyViewed.loading = true
        })
        builder.addCase(recentlyView.rejected, (state, action) => {
            state.errors = action.payload as IErrorResponse;
            state.recentlyViewed.loading = false
        })
        builder.addCase(library.fulfilled, (state, action) => {
            state.library.items = action.payload.items;
            state.library.total_count = action.payload.total_count;
            state.library.total_pages = action.payload.total_pages;
            state.errors = null;
            state.library.loading = false
        })
        builder.addCase(library.pending, (state) => {
            state.library.loading = true
        })
        builder.addCase(library.rejected, (state, action) => {
            state.errors = action.payload as IErrorResponse;
            state.library.loading = false
        })
        builder.addCase(reaction.fulfilled, (state, action) => {
            const idx = state.library.items.findIndex((obj) => obj.id === action.payload.id)

            if (idx !== -1) {
                state.library.items[idx] = action.payload

                if (Object.entries(state.library.selected).length && state.library.selected.id === action.payload.id) {
                    state.library.selected = action.payload
                }
            }
        })
        builder.addCase(reaction.rejected, (state, action) => {
            state.errors = action.payload as IErrorResponse
        })
    }
})

export const { changeSelectedInLibrary } = userSlice.actions;

export default userSlice.reducer
