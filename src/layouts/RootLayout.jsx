import React from 'react';
import { Outlet, useLocation, matchPath } from 'react-router-dom'; // use react-router-dom
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const routesWithTitle = [
    { path: "/", title: "Home - BookiQ" },
    { path: "/allBooks", title: "All Books - BookiQ" },
    { path: "/books/:id", title: "Book Details - BookiQ" },
    { path: "/category/:name", title: "Category Books - BookiQ" },
    { path: "/borrow/:id", title: "Borrow Book - BookiQ" },
    { path: "/borrowedBooks", title: "Borrowed Books - BookiQ" },
    { path: "/addBook", title: "Add Book - BookiQ" },
    { path: "/allBooksUpdate/:id", title: "Update Book - BookiQ" },
    { path: "/register", title: "Register - BookiQ" },
    { path: "/signIn", title: "Sign In - BookiQ" },
];

const TitleUpdater = () => {
    const location = useLocation();

    React.useEffect(() => {
        const matchedRoute = routesWithTitle.find(({ path }) =>
            matchPath({ path, end: true }, location.pathname)
        );
        document.title = matchedRoute ? matchedRoute.title : "BookiQ";
    }, [location.pathname]);

    return null;
};

const RootLayout = () => {
    return (
        <div>
            <TitleUpdater />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;
