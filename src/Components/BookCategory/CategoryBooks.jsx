import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryBooks = () => {
    const { name } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const categoryName = encodeURIComponent(name);
        axios
            .get(`https://library-server-side-puce.vercel.app/books?category=${categoryName}`)
            .then((res) => setBooks(res.data))
            .catch((err) => {
                console.error("Failed to fetch books:", err);
                setBooks([]);
            })
            .finally(() => setLoading(false));
    }, [name]);

    if (loading) return <p className="text-center mt-10">Loading books...</p>;
    if (!books.length) return <p className="text-center mt-10">No books found in "{name}"</p>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Books in "<span className="text-blue-600">{name}</span>" Category
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                    <div
                        key={book._id}
                        className="border rounded-lg shadow hover:shadow-lg transition duration-300 bg-white flex flex-col"
                    >
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-48 object-cover rounded-t"
                            loading="lazy"
                        />
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-semibold">{book.name}</h3>
                            <p className="text-sm text-gray-600">By {book.author}</p>
                            <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>
                            <p className="mt-2 text-gray-700 text-sm">{book.shortDescription}</p>

                            <button
                                onClick={() => navigate(`/borrow/${book._id}`)}
                                className={`mt-auto w-full px-3 py-2 rounded text-white mt-4 ${book.quantity > 0 ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={book.quantity === 0}
                            >
                                {book.quantity > 0 ? "Borrow this Book" : "Out of Stock"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryBooks;
