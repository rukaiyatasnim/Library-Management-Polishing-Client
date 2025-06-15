import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal control state
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        category: "",
        quantity: 0,
        rating: 0,
        shortDescription: "",
    });

    const [updating, setUpdating] = useState(false);

    // Data fetch on mount
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("http://localhost:3000/books");
            const data = await res.json();
            setBooks(data.reverse());
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch books", "error");
        } finally {
            setLoading(false);
        }
    };

    // Open modal & set form data for editing
    const openEditModal = (book) => {
        setEditingBook(book);
        setFormData({
            name: book.name || "",
            author: book.author || "",
            category: book.category || "",
            quantity: book.quantity || 0,
            rating: book.rating || 0,
            shortDescription: book.shortDescription || "",
        });
    };

    // Handle form input changes, convert quantity & rating to number
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "rating" ? Number(value) : value,
        }));
    };

    // Submit update to backend
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const res = await axios.patch(
                `http://localhost:3000/books/${editingBook._id}`,
                formData
            );

            if (res.data.modifiedCount || res.data.modifiedCount === undefined) {
                // Update UI optimistically
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book._id === editingBook._id ? { ...book, ...formData } : book
                    )
                );

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Book Details Updated",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEditingBook(null);
            } else {
                Swal.fire("Info", "No changes made", "info");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Update failed: " + error.message, "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading books...</p>;
    if (!books.length)
        return <p className="text-center mt-10">No books available</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
                <div
                    key={book._id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
                    {book.image && (
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-48 object-cover rounded mb-3"
                        />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                    <p className="text-gray-600 mb-1">By {book.author}</p>
                    <p className="text-gray-600 mb-1">Category: {book.category}</p>
                    <p className="text-gray-600 mb-1">Quantity: {book.quantity}</p>
                    <p className="text-yellow-500 font-semibold mb-3">⭐ {book.rating}</p>
                    <p className="text-gray-700 flex-grow">{book.shortDescription}</p>

                    <button
                        onClick={() => openEditModal(book)}
                        className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                </div>
            ))}

            {/* Modal */}
            {editingBook && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => !updating && setEditingBook(null)} // ক্লিক করলে modal বন্ধ
                >
                    <form
                        onClick={(e) => e.stopPropagation()} // ফর্মে ক্লিক করলে modal বন্ধ হবেনা
                        onSubmit={handleUpdateSubmit}
                        className="bg-white p-6 rounded-lg max-w-md w-full"
                    >
                        <h2 className="text-xl font-bold mb-4">Update Book Details</h2>

                        <label className="block mb-2">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="border rounded w-full px-2 py-1"
                                required
                            />
                        </label>

                        <label className="block mb-2">
                            Author:
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                className="border rounded w-full px-2 py-1"
                                required
                            />
                        </label>

                        <label className="block mb-2">
                            Category:
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="border rounded w-full px-2 py-1"
                            />
                        </label>

                        <label className="block mb-2">
                            Quantity:
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="border rounded w-full px-2 py-1"
                                min={0}
                            />
                        </label>

                        <label className="block mb-2">
                            Rating:
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className="border rounded w-full px-2 py-1"
                                min={0}
                                max={5}
                                step={0.1}
                            />
                        </label>

                        <label className="block mb-2">
                            Short Description:
                            <textarea
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                                className="border rounded w-full px-2 py-1"
                            />
                        </label>

                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                type="button"
                                onClick={() => !updating && setEditingBook(null)}
                                className="bg-gray-300 px-4 py-2 rounded"
                                disabled={updating}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={updating}
                            >
                                {updating ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AllBooks;
