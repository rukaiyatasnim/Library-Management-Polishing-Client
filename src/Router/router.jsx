import { createBrowserRouter } from "react-router";
import RootLayout from './../layouts/RootLayout';
import Home from '../Components/Home/Home';
import Error from "../Pages/Error/Error";
import Register from "../Pages/Register";
import SignIn from "../Pages/SignIn";
import AddBook from "../Components/AddBook/AddBook";
import AllBooks from "../Components/AllBooks/AllBooks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "allBooks",
                element: <AllBooks />
            },
            {
                path: "addBook",
                element: <AddBook />
            },

        ]
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "signIn",
        element: <SignIn />
    },
    {
        path: "*",
        element: <Error />
    }
]);