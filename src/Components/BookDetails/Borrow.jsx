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

    // Fetch book info including quantity
    useEffect(() => {
        axios.get(`http://localhost:3000/books/${bookId}`)
            .then(res => setBook(res.data))
            .catch(err => {
                console.error("Failed to fetch book:", err);
                Swal.fire({
                    icon: "error",
                    title: "Book Not Found",
                    text: "The selected book does not exist.",
                });
                navigate("/");
            });
    }, [bookId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (book?.quantity <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Not Available",
                text: "This book is currently unavailable for borrowing.",
            });
            setLoading(false);
            return;
        }

        try {
            const checkRes = await axios.get("http://localhost:3000/borrowedBooks/check", {
                params: { userEmail: user.email, bookId },
            });

            if (!checkRes.data.canBorrow) {
                Swal.fire({
                    icon: "warning",
                    title: "You already borrowed this book",
                    text: "Please return it before borrowing again.",
                });
                setLoading(false);
                return;
            }

            const borrowedBook = {
                bookId,
                userName: user?.name || "Unknown",
                userEmail: user?.email || "unknown@example.com",
                borrowedDate,
                returnDate,
            };

            const res = await axios.post("http://localhost:3000/borrowedBooks", borrowedBook);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Borrowed",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => navigate("/borrowedBooks"), 1500);
            }
        } catch (err) {
            console.error("Error borrowing book:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to borrow the book. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Borrow a Book</h2>

            {book && (
                <p className="text-center mb-4 text-sm text-gray-700">
                    <strong>Book:</strong> {book.name} | <strong>Available:</strong> {book.quantity}
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
                        className={`px-4 py-2 rounded text-white ${book?.quantity <= 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
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