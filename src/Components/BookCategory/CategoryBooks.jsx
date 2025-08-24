import React from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";

const CategoryBooks = () => {
    const books = useLoaderData();
    const { name } = useParams();

    if (!books.length)
        return (
            <p className="text-center mt-10">
                No books found in category "<strong>{name}</strong>"
            </p>
        );

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Books in "<span className="text-blue-600">{name}</span>" Category
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                    <Link
                        to={`/books/${book._id}`}
                        key={book._id}
                        className="border rounded-lg shadow hover:shadow-lg transition duration-300 bg-white flex flex-col"
                    >
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />

                        <div className="p-4 flex flex-col">
                            {/* Full Title */}
                            <h3 className="text-lg font-semibold">{book.name}</h3>

                            {/* Author & Info */}
                            <p className="text-sm text-gray-600">By {book.author}</p>
                            <p className="text-sm text-gray-600">Category: {book.category}</p>
                            <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>

                            {/* FULL Description (no line-clamp) */}
                            <p className="mt-2 text-gray-700 text-sm">
                                {book.shortDescription}
                            </p>

                            {/* Button */}
                            <div className="mt-4">
                                <button className="btn btn-sm w-full text-white bg-blue-800">
                                    See More
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryBooks;
