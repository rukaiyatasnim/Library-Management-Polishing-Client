import React, { useEffect, useState } from 'react';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10">Loading books...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map(book => (
                <div
                    key={book._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                    <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-semibold rounded-t-lg">
                        Image Here
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{book.name}</h3>
                        <p className="text-gray-600 mb-1">By <span className="font-medium">{book.author}</span></p>
                        <p className="text-gray-600 mb-1">Category: <span className="font-medium">{book.category}</span></p>
                        <p className="text-gray-600 mb-1">Quantity: <span className="font-medium">{book.quantity}</span></p>
                        <p className="text-yellow-500 font-semibold mb-3">⭐ {book.rating} / 5</p>
                        <p className="text-gray-700 flex-grow">{book.shortDescription}</p>

                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-semibold transition"
                            onClick={() => alert(`Show details for: ${book.name}`)}
                        >
                            Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllBooks;
