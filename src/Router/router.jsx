import { createBrowserRouter } from "react-router-dom"; 
import RootLayout from "../layouts/RootLayout";
import Home from "../Components/Home/Home";
import Error from "../Pages/Error/Error";
import Register from "../Pages/Register";
import SignIn from "../Pages/SignIn";
import AddBook from "../Components/AddBook/AddBook";
import AllBooks from "../Components/AllBooks/AllBooks";
import BookDetails from "../Components/BookDetails/BookDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import Borrow from "../Components/BookDetails/Borrow";
import BorrowedBooks from "../Pages/BorrowedBooks/BorrowedBooks";
import CategoryBooks from "../Components/BookCategory/CategoryBooks";
import AllBooksUpdate from "../Components/AllBooks/AllBooksUpdate";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "allBooks", element: <PrivateRoute><AllBooks /></PrivateRoute> },
            {
                path: "books/:id",
                element: <BookDetails />,
                loader: ({ params }) =>
                    fetch(`http://localhost:3000/books/${params.id}`).then(res => res.json()),
            },
            {
                path: "category/:name",
                element: <CategoryBooks />,
                loader: async ({ params }) => {
                    const res = await fetch(`http://localhost:3000/books?category=${encodeURIComponent(params.name)}`);
                    if (!res.ok) throw new Response("Failed to fetch", { status: res.status });
                    return res.json();
                },
            },
            { path: "borrow/:id", element: <Borrow /> },
            { path: "borrowedBooks", element: <PrivateRoute><BorrowedBooks /></PrivateRoute> },
            { path: "addBook", element: <PrivateRoute><AddBook /></PrivateRoute> },
            { path: "allBooksUpdate/:id", element: <PrivateRoute><AllBooksUpdate /></PrivateRoute> },
        ],
    },
    { path: "register", element: <Register /> },
    { path: "signIn", element: <SignIn /> },
    { path: "*", element: <Error /> },
]);
