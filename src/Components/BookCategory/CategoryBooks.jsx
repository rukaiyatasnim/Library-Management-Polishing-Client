import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
import Loader from "../Loader/Loader";

const CategoryBooks = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("http://localhost:3000/books");
            if (!res.ok) throw new Error("Failed to fetch books");
            const data = await res.json();
            setBooks(data.reverse());
        } catch (err) {
            console.error(err);
            setError(err.message);
            Swal.fire("Error", "Failed to fetch books", "error");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <p className="text-center mt-10">
                <Loader />
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-10 text-red-600">
                Error: {error}
            </p>
        );

    // Filter books by category (case insensitive)
    const filteredBooks = books.filter(
        (book) =>
            book.category &&
            book.category.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (filteredBooks.length === 0)
        return (
            <p className="text-center mt-10">
                No books found in the category: <strong>{name}</strong>
            </p>
        );

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
                // Debugging purpose - remove later
                // console.log(book.name, book.rating);

                return (
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

                        {/* Star Rating */}
                        <div className="mb-3">
                            <ReactStars
                                count={5}
                                value={book.rating || 0}
                                size={24}
                                edit={false}
                                isHalf={true}
                                activeColor="#f59e0b"
                            />
                        </div>

                        <button
                            onClick={() => navigate(`/books/${book._id}`)}
                            className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Details
                        </button>

                    </div>
                );
            })}
        </div>
    );
};

export default CategoryBooks;
