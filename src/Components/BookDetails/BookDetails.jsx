import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const BookDetails = () => {
    const book = useLoaderData();

    if (!book) return <p className="text-center mt-10">Book not found.</p>;

    return (
        <div className="max-w-2xl mx-auto my-14 px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="mb-5 bg-blue-50 text-blue-800 border border-blue-200 p-4 rounded-lg text-sm text-center">
                📖 Viewing: <span className="font-semibold text-blue-900">{book.name}</span>
            </div>

            <h1 className="text-3xl font-bold text-blue-700 mb-4">{book.name}</h1>

            <div className="space-y-3 text-sm text-gray-700">
                <p>
                    <span className="font-semibold text-blue-600">Author:</span> {book.author}
                </p>
                <p>
                    <span className="font-semibold text-blue-600">Category:</span> {book.category}
                </p>
                <p>
                    <span className="font-semibold text-blue-600">Quantity:</span> {book.quantity}
                </p>
                <p>
                    <span className="font-semibold text-blue-600">Rating:</span> ⭐ {book.rating} / 5
                </p>
                <p>
                    <span className="font-semibold text-blue-600">Short Description:</span>
                    <br />
                    {book.shortDescription}
                </p>

                <div>
                    <p className="font-semibold text-blue-600">Content:</p>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{book.content}</div>
                </div>
            </div>

            <Link to={`/borrow/${book._id}`}>
                <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300 text-center">
                    📚 Borrow This Book
                </button>
            </Link>
        </div>
    );
};

export default BookDetails;
