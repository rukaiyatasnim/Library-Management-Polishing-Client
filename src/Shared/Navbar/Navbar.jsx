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

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  // Rectangular buttons with shadow and hover
  const buttonClass =
    "px-5 py-2 border border-gray-300 font-medium text-gray-700 hover:bg-gray-100 hover:shadow-md transition duration-200";

  const loginButtonClass =
    "px-5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-md transition duration-200";

  const registerButtonClass =
    "px-5 py-2 bg-green-600 text-white font-medium hover:bg-green-700 hover:shadow-md transition duration-200";

  return (
    <>
      <nav className="bg-white w-full fixed top-0 z-50 shadow-md h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            BookiQ
          </Link>

          {/* Center Links */}
          <ul className="hidden lg:flex space-x-8">
            <li>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/allBooks" className={linkClass}>
                All Books
              </NavLink>
            </li>

            {/* Links for logged-in users */}
            {user && (
              <>
                <li>
                  <NavLink to="/addBook" className={linkClass}>
                    Add Book
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/borrowedBooks" className={linkClass}>
                    Borrowed Books
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <img
                  src={
                    user.photoURL ||
                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                  }
                  alt={user.displayName || "User Avatar"}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <button onClick={handleSignOut} className={buttonClass}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signIn" className={loginButtonClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={registerButtonClass}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-44 border border-gray-200"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/allBooks">All Books</Link>
                </li>

                {/* Links for logged-in users */}
                {user && (
                  <>
                    <li>
                      <Link to="/addBook">Add Book</Link>
                    </li>
                    <li>
                      <Link to="/borrowedBooks">Borrowed Books</Link>
                    </li>
                  </>
                )}

                {/* Auth links */}
                {!user && (
                  <>
                    <li>
                      <Link to="/signIn">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
