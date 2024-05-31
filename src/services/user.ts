import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "@/http";
import {ISuccess} from "@/types/ISuccess.ts";
import {ITokenSchema, IUser} from "@/types/IUser.ts";
import {AxiosError} from "axios";
import {IErrorResponse} from "@/types/IErrors.ts";
import {PublicKeyCredentialRequestOptionsJSON} from "@simplewebauthn/types";

export const register = createAsyncThunk('user/register', async (email: string, {rejectWithValue}) => {
    try {
        const {data} = await $api.post<ISuccess>("/user/sign-up", {email})

        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return rejectWithValue(response?.data?.detail)
    }
})


export const login = createAsyncThunk(
    'user/login',
    async (email: string, {rejectWithValue}) => {
        try {
            const {data} = await $api.post<ISuccess>("/user/sign-in", {email})

            return data
        } catch (err) {
            const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

            return rejectWithValue(response?.data?.detail)
        }
    },
)

export const resend = createAsyncThunk(
    'user/login',
    async (email: string, {rejectWithValue}) => {
        try {
            const {data} = await $api.post<ISuccess>("/user/resend-verification-code", {email})

            return data
        } catch (err) {
            const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

            return rejectWithValue(response?.data?.detail)
        }
    },
)
export const verify = createAsyncThunk(
    'user/verify',
    async (body: { verification_code: string, email: string }, {rejectWithValue}) => {
        try {
            const {data} = await $api.post<ITokenSchema>("/user/verify-code", body)
            localStorage.setItem("token", data.token)
            return data.user
        } catch (err) {
            const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

            return rejectWithValue(response?.data?.detail)
        }
    },
)

export const getMe = createAsyncThunk(
    'user/me',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await $api.get<IUser>("/user/me");

            return data
        } catch (err) {
            const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;
            localStorage.clear();

            return rejectWithValue(response?.data?.detail)
        }
    },
)

export const updateUsername = createAsyncThunk(
    'user/update-username',
    async (username: string, {rejectWithValue}) => {
        try {
            const {data} = await $api.put<IUser>(`/user/update-username?username=${username}`);

            return data
        } catch (err) {
            const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

            return rejectWithValue(response?.data?.detail)
        }
    },
)


export const generateRegistrationOptions = async () => {
    try {
        const {data} = await $api.get('/user/generate-registration-options');
        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return response?.data as IErrorResponse
    }
}
export const generateAuthenticationOptions = async (username: string): Promise<PublicKeyCredentialRequestOptionsJSON | IErrorResponse> => {
    try {
        const {data} = await $api.get<PublicKeyCredentialRequestOptionsJSON>(`/user/generate-authentication-options?username=${username}`);
        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return response?.data as IErrorResponse
    }
}

export const verifyRegistrationResponse = async (body: object): Promise<ISuccess | IErrorResponse> => {
    try {
        const {data} = await $api.post<ISuccess>('/user/verify-registration-response', body);
        return data
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return response?.data as IErrorResponse
    }
}

export const verifyAuthenticationResponse = createAsyncThunk("user/verify-passkey", async (body: object, {rejectWithValue}) => {
    try {
        const {data} = await $api.post<ITokenSchema>('/user/verify-authentication-response', body);
        localStorage.setItem("token", data.token)
        return data.user
    } catch (err) {
        const {response}: AxiosError<IErrorResponse> = err as AxiosError<IErrorResponse>;

        return rejectWithValue(response?.data?.detail)
    }
})
