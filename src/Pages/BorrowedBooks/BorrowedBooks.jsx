import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const BorrowedBooks = () => {
    const { user } = useAuth();
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        if (!user) return;
        const stored = localStorage.getItem(`borrowedBooks_${user.email}`);
        if (stored) setBorrowedBooks(JSON.parse(stored));
    }, [user]);

    useEffect(() => {
        if (user)
            localStorage.setItem(
                `borrowedBooks_${user.email}`,
                JSON.stringify(borrowedBooks)
            );
    }, [borrowedBooks, user]);

    const handleReturnBook = (bookId) => {
        setBorrowedBooks((prev) => prev.filter((b) => b.id !== bookId));
        Swal.fire({
            icon: "success",
            title: "Book returned successfully",
            timer: 1500,
            showConfirmButton: false,
            toast: true,
        });
    };

    if (!user) return <p className="text-center mt-20">Please log in</p>;

    if (!borrowedBooks.length)
        return (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="No borrowed books"
                    className="w-40 h-40 mb-6 opacity-50"
                />
                <p className="text-2xl font-semibold mb-2">
                    You have no borrowed books currently.
                </p>
                <p className="text-center text-gray-500 max-w-md">
                    Browse our collection and borrow your favorite books to get started!
                </p>
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto mt-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 border-b-4 border-blue-300 pb-3">
                Your Borrowed Books
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {borrowedBooks.map((book) => (
                    <div
                        key={book.id}
                        className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                    >
                        <img
                            src={book.image || "https://via.placeholder.com/150"}
                            alt={book.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                {book.name}
                            </h3>
                            <p className="text-gray-600 mb-1">
                                <strong>Category:</strong> {book.category}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Borrowed:</strong>{" "}
                                {new Date(book.borrowedDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 mb-4">
                                <strong>Return by:</strong>{" "}
                                {new Date(book.returnDate).toLocaleDateString()}
                            </p>

                            <button
                                onClick={() => handleReturnBook(book.id)}
                                className="mt-auto px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                            >
                                Return Book
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowedBooks;
