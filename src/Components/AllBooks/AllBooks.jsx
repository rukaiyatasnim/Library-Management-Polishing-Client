import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("card");
    const [sortOption, setSortOption] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("https://library-server-side-puce.vercel.app/books");
            const data = await res.json();
            setBooks(data.reverse()); // newest first
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch books", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (bookId) => {
        navigate(`/allBooksUpdate/${bookId}`);
    };

    // Sorting logic
    const sortedBooks = [...books].sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;

        if (sortOption === "price-asc") return priceA - priceB;
        if (sortOption === "price-desc") return priceB - priceA;
        return 0;
    });

    if (loading)
        return (
            <div className="text-center mt-10">
                <Loader />
            </div>
        );

    if (!books.length)
        return <p className="text-center mt-10">No books available</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Top Controls */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* View Mode Switcher */}
                <div>
                    <label className="mr-3 font-semibold" htmlFor="viewMode">
                        View:
                    </label>
                    <select
                        id="viewMode"
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>

                {/* Sorting Dropdown */}
                <div>
                    <label className="mr-3 font-semibold" htmlFor="sort">
                        Sort By:
                    </label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Default</option>
                        <option value="price-asc">Price (Low → High)</option>
                        <option value="price-desc">Price (High → Low)</option>
                    </select>
                </div>
            </div>

            {/* Views */}
            {viewMode === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedBooks.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white rounded-lg shadow p-4 flex flex-col h-full"
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
                            <p className="text-yellow-500 font-semibold mb-1">
                                ⭐ {book.rating}
                            </p>
                            <p className="text-blue-600 font-bold mb-2">
                                {book.price ? `$${Number(book.price).toFixed(2)}` : "N/A"}
                            </p>

                            <p className="text-gray-700 flex-grow">{book.shortDescription}</p>

                            <button
                                onClick={() => handleUpdate(book._id)}
                                className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Author</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-center">Quantity</th>
                                <th className="py-3 px-4 text-center">Rating</th>
                                <th className="py-3 px-4 text-center">Price</th>
                                <th className="py-3 px-4 text-left">Short Description</th>
                                <th className="py-3 px-4 text-center">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBooks.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-b hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="py-2 px-4">{book.name}</td>
                                    <td className="py-2 px-4">{book.author}</td>
                                    <td className="py-2 px-4">{book.category}</td>
                                    <td className="py-2 px-4 text-center">{book.quantity}</td>
                                    <td className="py-2 px-4 text-center">{book.rating}</td>
                                    <td className="py-2 px-4 text-center">
                                        {book.price ? `$${Number(book.price).toFixed(2)}` : "N/A"}
                                    </td>
                                    <td className="py-2 px-4">{book.shortDescription}</td>
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => navigate(`/allBooksUpdate/${book._id}`)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllBooks;
