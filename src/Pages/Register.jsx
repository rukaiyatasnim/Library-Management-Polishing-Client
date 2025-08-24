import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const { createUser, googleSignIn } = useAuth();
    const [showPassword, setShowPassWord] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!name || !email || !password) {
            Swal.fire({ icon: 'error', title: 'Missing Fields', text: 'Please fill all required fields.' });
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
            Swal.fire({ icon: 'warning', title: 'Weak Password', text: 'Password must be 6+ characters with uppercase & lowercase letters.' });
            return;
        }

        try {
            await createUser(email, password);
            Swal.fire({ position: "top-end", icon: "success", title: "Registered Successfully", showConfirmButton: false, timer: 1500 });
            navigate('/');
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.message });
        }
    };

    const handleGoogleSignUp = () => {
        googleSignIn()
            .then(() => {
                Swal.fire({ position: "top-end", icon: "success", title: "Google Sign Up Successful", showConfirmButton: false, timer: 1500 });
                navigate('/');
            })
            .catch(err => Swal.fire({ icon: 'error', title: 'Google Sign Up Failed', text: err.message }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transform transition-all hover:scale-105">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Name</label>
                        <input type="text" name="name" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input type="email" name="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            />
                            <button type="button" onClick={() => setShowPassWord(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all shadow-md">
                        Register
                    </button>
                </form>

                <div className="text-center my-4 text-gray-500">OR</div>

                <button
                    onClick={handleGoogleSignUp}
                    className="w-full py-2 rounded-lg border border-blue-300 flex items-center justify-center gap-2 hover:bg-blue-50 transition-all text-blue-700 font-medium"
                >
                    <svg aria-label="Google logo" width="20" height="20" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff" />
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                        </g>
                    </svg>
                    Sign Up with Google
                </button>

                <div className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <NavLink to="/signIn" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;
