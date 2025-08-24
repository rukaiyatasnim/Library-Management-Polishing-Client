import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";

const BorrowedBooks = () => {
    const { user } = useAuth();
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchBorrowedBooks = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://library-server-side-puce.vercel.app/borrowedBooks?email=${user.email}`
                );
                setBorrowedBooks(res.data);
            } catch (err) {
                console.error("Failed to fetch borrowed books", err);
                setBorrowedBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBorrowedBooks();
    }, [user]);

    const handleReturnBook = async (borrowedBookId, bookId) => {
        try {
            await axios.patch(`https://library-server-side-puce.vercel.app/books/${bookId}/increment`);

            await axios.delete(`https://library-server-side-puce.vercel.app/borrowedBooks/${borrowedBookId}`);

            setBorrowedBooks((prevBooks) =>
                prevBooks.filter((book) => book._id !== borrowedBookId)
            );
        } catch (error) {
            console.error("Failed to return book:", error);
        }
    };

    if (loading)
        return (
            <div className="text-center mt-10">
                <Loader />
            </div>
        );

    if (borrowedBooks.length === 0)
        return (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="No borrowed books"
                    className="w-40 h-40 mb-4 opacity-50"
                />
                <p className="text-xl font-semibold">
                    You have no borrowed books currently.
                </p>
                <p className="mt-2 text-center max-w-sm">
                    Browse our collection and borrow your favorite books to get started!
                </p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                Your Borrowed Books
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {borrowedBooks.map((borrowedBook) => {
                    const book = borrowedBook.bookDetails || {};
                    return (
                        <div
                            key={borrowedBook._id}
                            className="border p-4 rounded shadow flex flex-col"
                        >
                            <img
                                src={book.image || "https://via.placeholder.com/150"}
                                alt={book.title || "Book Cover"}
                                className="w-full h-64 object-cover mb-4 rounded"
                            />

                            <p className="text-gray-600 mb-1">
                                <strong>Category:</strong> {book.category || "Unknown"}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Borrowed:</strong>{" "}
                                {new Date(borrowedBook.borrowedDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 mb-3">
                                <strong>Return by:</strong>{" "}
                                {new Date(borrowedBook.returnDate).toLocaleDateString()}
                            </p>

                            <button
                                onClick={() =>
                                    handleReturnBook(borrowedBook._id, borrowedBook.bookId)
                                }
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Return Book
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BorrowedBooks;