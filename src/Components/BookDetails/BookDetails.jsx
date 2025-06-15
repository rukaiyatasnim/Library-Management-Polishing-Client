import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAuth from './../../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2'



const Borrow = () => {
    const { id: bookId } = useParams();
    const { user } = useAuth();

    const [returnDate, setReturnDate] = useState('');
    const [borrowedDate, setBorrowedDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!returnDate) {
            alert('Please select a return date');
            return;
        }


        const borrowedBook = {
            bookId,
            userName: user?.name,
            userEmail: user?.email,
            returnDate,
            borrowedDate
        }

        axios.post("http://localhost:3000/borrowedBooks", borrowedBook)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You Have Scuccessfully Borrowed The Book",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })

        alert(`Borrowed successfully! Please return by ${returnDate}`);
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Borrow a Book</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Your Name</label>
                    <input
                        type="text"
                        value={user?.name || ''}
                        disabled
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Borrowed Date</label>
                    <input
                        type="date"
                        value={borrowedDate}
                        onChange={(e) => setBorrowedDate(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Return Date</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        onClick={() => window.history.back()}  // Simple cancel action
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Borrow
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Borrow;