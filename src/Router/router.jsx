import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Components/Home/Home";
import About from "../Shared/About/About";
import Error from "../Pages/Error/Error";
import Register from "../Pages/Register";
import SignIn from "../Pages/SignIn";
import AddBook from "../Components/AddBook/AddBook";
import AllBooks from "../Components/AllBooks/AllBooks";
import BookDetails from "../Components/BookDetails/BookDetails";
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
            { path: "about", element: <About /> },
            { path: "allBooks", element: <AllBooks /> },

            // AddBook now accessible to everyone
            { path: "addBook", element: <AddBook /> },
            { path: "borrowedBooks", element: <BorrowedBooks /> },
            { path: "books/:id", element: <BookDetails /> },
            { path: "borrow/:id", element: <Borrow /> },
            { path: "category/:name", element: <CategoryBooks /> },
            { path: "allBooksUpdate/:id", element: <AllBooksUpdate /> },
        ],
    },
    { path: "register", element: <Register /> },
    { path: "signIn", element: <SignIn /> },
    { path: "*", element: <Error /> },
]);
