import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    // Email & Password Sign In
    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signInUser(email, password);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message
            });
        }
    };

    // Google Sign In
    const handleGoogleLogIn = async () => {
        try {
            await googleSignIn();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Google Login Successful",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Google Login Failed",
                text: err.message
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h1>

                    <form onSubmit={handleSignIn} className="relative space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Your password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>

                        <div className="text-sm text-gray-600 flex justify-between items-center">
                            <span>Don't have an account?</span>
                            <NavLink to="/register" className="text-blue-500 font-medium hover:underline">
                                Register
                            </NavLink>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-2 text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        onClick={handleGoogleLogIn}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
