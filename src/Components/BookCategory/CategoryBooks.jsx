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
                        className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white block"
                    >
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{book.name}</h3>
                            <p className="text-sm text-gray-600">By {book.author}</p>
                            <p className="text-sm text-gray-600">Category: {book.category}</p>
                            <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>
                            <p className="mt-2 text-gray-700 text-sm">{book.shortDescription}</p>
                        </div>


                        <div className="mx-auto">
                            <button className="btn btn-wide text-white bg-blue-800"> Details</button>
                        </div>
                    </Link>


                ))}
            </div>

        </section>
    );
};

export default CategoryBooks;
