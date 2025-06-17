import React from 'react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const { createUser, googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // Password Validation
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !isLongEnough) {
            Swal.fire({
                icon: 'warning',
                title: 'Weak Password',
                text: 'Password must be at least 6 characters and contain both uppercase and lowercase letters.',
            });
            return; // Stop submission
        }

        createUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => navigate('/'), 1500);
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email Already In Use',
                        text: 'Please try logging in or use a different email.',
                    });
                } else if (err.code === 'auth/weak-password') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Weak Password',
                        text: 'Password should be at least 6 characters.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: err.message,
                    });
                }
                console.error("Error:", err);
            });
    };


    const handleGoogleSignUp = () => {
        googleSignIn()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Google Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign In Failed',
                    text: err.message
                });
                console.error(err);
            });
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input type="text" name="name" className="w-full border px-3 py-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input type="email" name="email" className="w-full border px-3 py-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium mb-1">Password</label>
                    <input type="password" name="password" className="w-full border px-3 py-2 rounded" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Register
                </button>

                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full mt-2 bg-white border text-black py-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                    <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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

                <div className="mt-4 text-center">
                    <span className="text-sm">Already Have An Account?</span>{' '}
                    <NavLink className="text-blue-600 font-medium" to="/signIn">
                        Login Here
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Register;
