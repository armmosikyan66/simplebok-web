import router from "@/router";
import {RouterProvider} from "react-router-dom";
import {useEffect} from "react";
import {getMe} from "@/services/user.ts";
import {useAppDispatch} from "@/hooks/redux.ts";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return <RouterProvider router={router}/>
};

export default App;
