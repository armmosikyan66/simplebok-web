import React from "react";
import { Navigate } from "react-router-dom";
import AuthenticationLoader from "@/components/AuthenticationLoader.tsx";
import {useAppSelector} from "@/hooks/redux.ts";

type Props = {
    children: JSX.Element;
};

const UnAuthorized: React.FC<Props> = ({ children }) => {
    const {isAuth, loading} = useAppSelector(state => state.user);

    if (loading) {
        return <AuthenticationLoader/>;
    }

    return !isAuth ? children : <Navigate to={"/"} replace />;
};

export default UnAuthorized;
