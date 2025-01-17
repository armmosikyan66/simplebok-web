import { configureStore } from '@reduxjs/toolkit'
import user from "@/store/slices/user.ts";
import book from "@/store/slices/book.ts";

export const store = configureStore({
    reducer: {
        user,
        book
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
