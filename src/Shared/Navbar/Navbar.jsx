import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 text-white w-full fixed top-0 z-50 shadow-md h-16">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">BookiQ</Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex space-x-6">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "underline font-bold" : ""}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "underline font-bold" : ""}>About</NavLink>
            </li>
            {user ? (
              <>
                <li><NavLink to="/allBooks" className={({ isActive }) => isActive ? "underline font-bold" : ""}>All Books</NavLink></li>
                <li><NavLink to="/addBook" className={({ isActive }) => isActive ? "underline font-bold" : ""}>Add Book</NavLink></li>
                <li><NavLink to="/borrowedBooks" className={({ isActive }) => isActive ? "underline font-bold" : ""}>Borrowed Books</NavLink></li>
                <li><NavLink to="/profile" className={({ isActive }) => isActive ? "underline font-bold" : ""}>Profile</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/signIn" className={({ isActive }) => isActive ? "underline font-bold" : ""}>Login</NavLink></li>
                <li><NavLink to="/register" className={({ isActive }) => isActive ? "underline font-bold" : ""}>Sign Up</NavLink></li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {user && (
            <div className="flex items-center space-x-3">
              <div className="relative flex flex-col items-center group">
                <img
                  src={user.photoURL || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
                  alt={user.displayName || "User Avatar"}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-md"
                />
                <div className="absolute top-12 text-xs bg-blue-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {user.displayName}
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-all"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-blue-600 rounded-box w-52 text-white">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {user ? (
                  <>
                    <li><Link to="/allBooks">All Books</Link></li>
                    <li><Link to="/addBook">Add Book</Link></li>
                    <li><Link to="/borrowedBooks">Borrowed Books</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/signIn">Login</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
