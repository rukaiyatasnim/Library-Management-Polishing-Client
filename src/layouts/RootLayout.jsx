import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import Home from '../Components/Home/Home';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;