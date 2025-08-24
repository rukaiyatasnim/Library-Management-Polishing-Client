import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Borrow = () => {
    const { id: bookId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];
    const [borrowedDate, setBorrowedDate] = useState(today);
    const [returnDate, setReturnDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);

    // Fetch the book by ID
    useEffect(() => {
        axios
            .get("https://library-server-side-puce.vercel.app/books")
            .then((res) => {
                const foundBook = res.data.find((b) => b._id === bookId);
                if (!foundBook) {
                    Swal.fire({
                        icon: "error",
                        title: "Book Not Found",
                        text: "The selected book does not exist.",
                    });
                    navigate("/");
                } else {
                    setBook(foundBook);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch books:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch books from server.",
                });
                navigate("/");
            });
    }, [bookId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!book || book.quantity <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Not Available",
                text: "This book is currently unavailable for borrowing.",
            });
            setLoading(false);
            return;
        }

        // --- FRONTEND-ONLY SIMULATION ---
        // Decrease quantity in frontend
        setBook({ ...book, quantity: book.quantity - 1 });

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `You borrowed "${book.name}" successfully!`,
            showConfirmButton: false,
            timer: 1500,
        });

        setLoading(false);

        setTimeout(() => navigate("/"), 1500); // navigate to home or borrowed books page
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                Borrow a Book
            </h2>

            {book && (
                <p className="text-center mb-4 text-sm text-gray-700">
                    <strong>Book:</strong> {book.name} |{" "}
                    <strong>Available:</strong> {book.quantity}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Your Name</label>
                    <input
                        type="text"
                        value={user?.name || ""}
                        disabled
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
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
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded text-white ${book?.quantity <= 0
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        disabled={loading || book?.quantity <= 0}
                    >
                        {loading ? "Borrowing..." : "Borrow"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Borrow;
