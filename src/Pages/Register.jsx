import React from 'react';
import useAuth from '../Hooks/useAuth';
import Swal  from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const { createUser } = useAuth();

    const navigate = useNavigate();


    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password, name)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Navigate after a small delay to show the alert
                setTimeout(() => navigate('/'), 1500);
            })
            .catch(err => {
                console.error("Error:", err);
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
            </form>
        </div>
    );
};

export default Register;
