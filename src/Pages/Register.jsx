import React from 'react';

const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, email, password);
};

const Register = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
]            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold text-black">Register now!</h1>
                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Name" required />
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" required />
                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Password" required />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button type="submit" className="btn btn-neutral mt-4">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
