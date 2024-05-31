import {createSlice} from '@reduxjs/toolkit'
import {IUser} from "@/types/IUser.ts";
import {getMe, login, register, updateUsername, verify, verifyAuthenticationResponse} from "@/services/user.ts";
import {IErrorResponse} from "@/types/IErrors.ts";

interface UserSliceState {
    me: IUser;
    isAuth: boolean;
    loading: boolean;
    errors: IErrorResponse | null
}

const initialState: UserSliceState = {
    me: {} as IUser,
    isAuth: false,
    errors: null,
    loading: true,
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, { meta }) => {
            state.me.email = String(meta.arg);
            state.loading = false
        })
        builder.addCase(register.rejected, (state, { payload }) => {
            state.errors = payload as IErrorResponse
            state.loading = false
        })
        builder.addCase(login.fulfilled, (state, { meta }) => {
            state.me.email = String(meta.arg);
            state.loading = false;
        })
        builder.addCase(login.rejected, (state, { payload }) => {
            state.errors = payload as IErrorResponse;
            state.loading = false;
        })
        builder.addCase(getMe.fulfilled, (state, { payload }) => {
            state.me = payload;
            state.isAuth = true;
            state.errors = null;
            state.loading = false;
        })
        builder.addCase(getMe.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMe.rejected, (state, { payload }) => {
            state.errors = payload as IErrorResponse;
            state.loading = false;
        })
        builder.addCase(updateUsername.fulfilled, (state, { payload }) => {
            state.me = payload;
            state.isAuth = true;
            state.errors = null;
            state.loading = false;
        })
        builder.addCase(updateUsername.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateUsername.rejected, (state, { payload }) => {
            state.errors = payload as IErrorResponse;
            state.loading = false;
        })
        builder.addCase(verify.fulfilled, (state, { payload }) => {
            state.me = payload;
            state.isAuth = true;
            state.errors = null;
            state.loading = false;
        })
        builder.addCase(verify.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(verify.rejected, (state, { payload }) => {
            state.errors = payload as IErrorResponse;
            state.loading = false;
        })
        builder.addCase(verifyAuthenticationResponse.fulfilled, (state, { payload }) => {
            state.me = payload;
            state.isAuth = true;
            state.errors = null;
            state.loading = false;
        })
        builder.addCase(verifyAuthenticationResponse.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(verifyAuthenticationResponse.rejected, (state, { payload }) => {
            state.errors = payload as IErrorResponse;
            state.loading = false;
        })
    }
})

export default userSlice.reducer
