import { createBrowserRouter } from "react-router";
import RootLayout from './../layouts/RootLayout';
import Home from '../Components/Home/Home';
import Error from "../Pages/Error/Error";
import Register from "../Pages/Register";
import SignIn from "../Pages/SignIn";
import AddBook from "../Components/AddBook/AddBook";
import AllBooks from "../Components/AllBooks/AllBooks";
import BookDetails from './../Components/BookDetails/BookDetails';
import PrivateRoute from "../Routes/PrivateRoute";
import Borrow from "../Components/BookDetails/Borrow";
import BorrowedBooks from "../Pages/BorrowedBooks/BorrowedBooks";

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
                element: <PrivateRoute><AllBooks /></PrivateRoute>
            },
            {
                path: "/books/:id",
                element: < BookDetails />,
                loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`)
            },
            {
                path: "borrow/:id",
                element: <Borrow />,
            },
            {
                path: "borrowedBooks",
                element: <BorrowedBooks />,
            },
            {
                path: "addBook",
                element: <PrivateRoute> <AddBook /> </PrivateRoute>
            },
        ],
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