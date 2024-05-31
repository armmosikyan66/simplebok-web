import {
    createBrowserRouter, Outlet,
} from "react-router-dom";
import SignUp from "@/pages/sign-up.tsx";
import Signin from "@/pages/sign-in.tsx";
import VerifyCode from "@/pages/verify-code.tsx";
import Home from "@/pages/home.tsx";
import Username from "@/pages/username.tsx";
import UnAuthorized from "@/components/UnAuthenticated.tsx";
import Protected from "@/components/Protected.tsx";
import HomeLayout from "@/layouts/home.tsx";
import {Suspense} from "react";
import Library from "@/pages/library.tsx";
import Profile from "@/pages/profile.tsx";
import Passkey from "@/pages/passkey.tsx";


const router = createBrowserRouter([
    {
        element: (
            <Protected>
                <HomeLayout>
                    <Suspense>
                        <Outlet/>
                    </Suspense>
                </HomeLayout>
            </Protected>
        ),
        children: [
            {
                index: true,
                element: (
                    <Home/>
                ),
            },
            {
                path: "/library",
                element: (
                    <Library/>
                ),
            },
            {
                path: "/profile",
                element: (
                    <Profile/>
                ),
            }
        ]
    },
    {
        path: "/sign-in",
        element: (
            <UnAuthorized>
                <Signin/>
            </UnAuthorized>
        ),
    },
    {
        path: "/sign-up",
        element: (
            <UnAuthorized>
                <SignUp/>
            </UnAuthorized>
        ),
    },
    {
        path: "/verify-code",
        element: (
            <UnAuthorized>
                <VerifyCode/>
            </UnAuthorized>
        ),
    },
    {
        path: "/username",
        element: (
            <Protected>
                <Username/>
            </Protected>
        ),
    },
    {
        path: "/passkey",
        element: (
            <Protected>
                <Passkey/>
            </Protected>
        ),
    },
]);

export default router
