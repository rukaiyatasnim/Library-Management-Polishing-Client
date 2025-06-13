import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { NavLink } from 'react-router';

const Register = () => {
    const { createUser } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // Call createUser inside the form handler
        createUser(email, password)
            .then(res => {
                console.log("User created:", res.user);
            })
            .catch(err => {
                console.error("Registration error:", err);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse"></div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold text-black">Register now!</h1>
                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Name" required />
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" required />
                        <label className="label">PhotoURL</label>
                        <input type="text" className="input" name='photo' placeholder="PhotoURL" required />
                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Password" required />
                        <div><a className="link link-hover">Already Have an Account?</a> <NavLink className="text-red-600" to="/signIn">
                            Login Here</NavLink> </div>
                        <button type="submit" className="btn btn-neutral mt-4">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
