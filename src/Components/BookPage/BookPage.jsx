import React, { useState, useEffect } from 'react';
import AddBook from './AddBook';
import AllBooks from './AllBooks';
import Loader from '../Loader/Loader';

const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = () => {
        setLoading(true);
        fetch('http://localhost:3000/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching books:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Library Management System</h1>
            <AddBook onBookAdded={fetchBooks} />
            {loading ? (
                <div className="text-center text-gray-500"> <Loader /> </div>
            ) : (
                <AllBooks books={books} />
            )}
        </div>
    );
};

export default BookPage;
