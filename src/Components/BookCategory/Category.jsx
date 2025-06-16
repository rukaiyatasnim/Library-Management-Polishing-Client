import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/books")
            .then((res) => {
                const allBooks = res.data;

                // Unique categories extraction with an image
                const uniqueCategories = Array.from(
                    new Map(
                        allBooks.map((book) => [
                            book.category,
                            {
                                name: book.category,
                                image: book.image, // Use first book's image for category
                            },
                        ])
                    ).values()
                );

                setCategories(uniqueCategories);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch categories:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading categories...</p>;

    if (!categories.length)
        return <p className="text-center mt-10">No categories found</p>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Book Categories</h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {categories.map(({ name, image }) => (
                    <div
                        key={name}
                        onClick={() => navigate(`/category/${encodeURIComponent(name)}`)}
                        className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img src={image} alt={name} className="w-full h-48 object-cover" />
                        <div className="p-4 bg-white">
                            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Category;