import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8 flex justify-center items-start">
            <div className="max-w-4xl bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
                    About Library Management System
                </h1>
                <p className="mb-4 text-gray-700">
                    The Library Management System is a modern web application built using React, Tailwind CSS, DaisyUI, and Firebase.
                    It allows users to browse, borrow, and manage books in a digital library environment. The system is designed to provide
                    a smooth and responsive experience on both desktop and mobile devices.
                </p>
                <p className="mb-4 text-gray-700">
                    Users can register and log in securely using email/password or Google authentication. Once logged in, they can:
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                    <li>View all available books in the library.</li>
                    <li>Check detailed information about each book.</li>
                    <li>Borrow books while adhering to borrowing limits.</li>
                    <li>View and manage their borrowed books with due dates.</li>
                    <li>Filter books by categories or availability.</li>
                </ul>
                <p className="mb-4 text-gray-700">
                    Administrators have the ability to add new books, update existing ones, and manage the library inventory efficiently.
                    Real-time updates ensure that users always have accurate information about book availability.
                </p>
                <p className="mb-4 text-gray-700">
                    Notifications and alerts are used throughout the system to provide feedback for important actions like successful login,
                    book borrowing, or errors. Overall, this project simulates a real-world library experience, making it easy and intuitive
                    for students, teachers, and administrators to interact with books digitally.
                </p>
                <p className="mb-4 text-gray-700">
                    This project is a demonstration of how modern web technologies can be combined to create a secure, interactive, and
                    user-friendly library management system.
                </p>
            </div>
        </div>
    );
};

export default About;
