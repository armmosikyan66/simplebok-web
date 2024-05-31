import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@/http";
import {AxiosError} from "axios";
import {IErrorResponse} from "@/types/IErrors.ts";
import {IBook, ILibrary} from "@/types/IBook.ts";

export const lastReadBook = createAsyncThunk('book/last-read-book', async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api.get<IBook>("/book/last-read-book/")

        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return rejectWithValue(response?.data?.detail)
    }
})

export const recentlyView = createAsyncThunk("book/recent-viewed", async (_, {rejectWithValue}) => {
    try {
        const {data} = await $api.get<IBook[]>("/book/recent-viewed")

        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return rejectWithValue(response?.data?.detail)
    }
})

export const library = createAsyncThunk("book/library", async (query: string, {rejectWithValue}) => {
    try {
        const {data} = await $api.get<ILibrary>(`/book/library?${query}`)

        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return rejectWithValue(response?.data?.detail)
    }
})

// todo check the response file and add types
export const getFile = async (directory: string): Promise<string | null> => {
    try {
        const {data} = await $api.get(`/book/${directory}/file/cover-image`, {
            responseType: 'blob',
        })

        return URL.createObjectURL(data)
    } catch (err) {
        return null
    }
}

export const reaction = createAsyncThunk("book/reaction", async (bookId: number, {rejectWithValue}) => {
    try {
        const {data} = await $api.patch<IBook>(`/book/${bookId}/reaction`)

        return data
    } catch (err) {
        return rejectWithValue(null)
    }
})

export const changeCurrentBook = createAsyncThunk("book/change-current-book", async (bookId: number, {rejectWithValue}) => {
    try {
        const {data} = await $api.patch(`/book/change-current-book/${bookId}`)

        return  data
    } catch (e) {
        return rejectWithValue(null);
    }
})
