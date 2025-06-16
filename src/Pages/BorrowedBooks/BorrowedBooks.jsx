import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';

const BorrowedBooks = () => {
    const { user, loading } = useAuth();
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);

    useEffect(() => {
        if (!loading && user?.email) {
            setLoadingBooks(true);

            axios
                .get(`http://localhost:3000/borrowedBook?email=${user.email}`)
                .then(async (res) => {
                    const borrowed = res.data;

                    // Fetch details for each borrowed book
                    const detailedBooks = await Promise.all(
                        borrowed.map(async (borrow) => {
                            // Fetch the actual book info from /books/:id
                            const bookRes = await axios.get(`http://localhost:3000/books/${borrow.bookId}`);
                            return {
                                ...borrow,
                                ...bookRes.data,
                            };
                        })
                    );

                    setBorrowedBooks(detailedBooks);
                })
                .catch((err) => {
                    console.error(err);
                    setBorrowedBooks([]);
                })
                .finally(() => setLoadingBooks(false));
        }
    }, [user, loading]);

    if (loading || loadingBooks) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Your Borrowed Books</h2>

            {borrowedBooks.length === 0 ? (
                <p className="text-center text-gray-600">No borrowed books found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {borrowedBooks.map((book) => (
                        <div key={book._id} className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 flex flex-col">
                            <img
                                src={book.image || 'https://via.placeholder.com/300x180?text=Book+Cover'}
                                alt={'Book Cover'}
                                className="w-full h-44 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-blue-800 mb-1">{book.title || 'No Title'}</h3>
                            <p className="text-sm text-gray-700 mb-1">
                                <span className="font-medium">Category:</span> {book.category || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                                <span className="font-medium">Borrowed Date:</span> {book.borrowedDate || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Return Date:</span> {book.returnDate || 'N/A'}
                            </p>

                            <button className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                                Return
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BorrowedBooks;