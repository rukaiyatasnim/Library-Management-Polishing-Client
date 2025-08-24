import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignIn = () => {
    const [showPassword, setShowPassWord] = useState(false);

    const { signInUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(async (result) => {
                const loggedUser = result.user;

                const { data } = await axios.post('https://library-server-side-puce.vercel.app/jwt', { email: loggedUser.email });

                localStorage.setItem('access-token', data.token);

                console.log("Saved token (Email/Password):", localStorage.getItem('access-token'));

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate(from);
            })
            .catch((err) => console.log(err));
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(async (result) => {
                const loggedUser = result.user;

                const { data } = await axios.post('https://library-server-side-puce.vercel.app/jwt', { email: loggedUser.email });

                localStorage.setItem('access-token', data.token);

                console.log("Saved token (Google):", localStorage.getItem('access-token'));

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Google Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(from);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-black">Sign In now!</h1>
                        <form onSubmit={handleSignIn} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" required />
                            <label className="label">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input"
                                placeholder="Password"
                                name='password'
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassWord(!showPassword)}
                                className='btn btn-xs absolute top-47 right-8'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                            </button>

                            <div>
                                <a className="link link-hover">Don't Have An Account?</a>
                                <NavLink className="text-red-600" to="/register"> Register Here</NavLink>
                            </div>
                            <button type="submit" className="btn btn-neutral mt-4">Sign In</button>
                        </form>
                        <button
                            onClick={handleGoogleLogIn}
                            className="btn bg-white text-black border-[#e5e5e5] mt-4"
                        >
                            <svg
                                aria-label="Google logo"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                </g>
                            </svg>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
