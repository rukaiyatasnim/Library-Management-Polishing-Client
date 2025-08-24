// Category.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://library-server-side-puce.vercel.app/books")
            .then((res) => {
                const allBooks = res.data;
                // Get unique categories
                const uniqueCategories = Array.from(
                    new Map(
                        allBooks.map((book) => [
                            book.category.toLowerCase(),
                            { name: book.category, image: book.image },
                        ])
                    ).values()
                );
                setCategories(uniqueCategories);
            })
            .catch((err) => {
                console.error("Failed to fetch categories:", err);
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-10">Loading categories...</p>;
    if (!categories.length) return <p className="text-center mt-10">No categories found</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
                Book Categories
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className="border rounded-lg p-4 cursor-pointer text-center hover:bg-blue-50 transition"
                        onClick={() => navigate(`/category/${encodeURIComponent(cat.name)}`)}
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-40 object-cover mb-2 rounded"
                        />
                        <h3 className="font-semibold text-blue-800">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
