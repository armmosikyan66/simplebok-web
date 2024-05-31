import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import AuthenticationLoader from "@/components/AuthenticationLoader.tsx";
import {useAppSelector} from "@/hooks/redux.ts";

type Props = {
    children: JSX.Element;
};

const Protected: React.FC<Props> = ({children}) => {
    const {isAuth, loading} = useAppSelector(state => state.user);
    const location = useLocation().pathname;

    if (loading) {
        return <AuthenticationLoader/>;
    }

    if (!isAuth) {
        return <Navigate to={"/sign-in"} state={{from: location}} replace/>
    }

    return children
};

export default Protected;
