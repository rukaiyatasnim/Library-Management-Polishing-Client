import { createBrowserRouter } from "react-router";
import RootLayout from './../layouts/RootLayout';
import Home from '../Components/Home/Home';
import Error from "../Pages/Error/Error";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },

        ]
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "*",
        element: <Error />
    }
]);
