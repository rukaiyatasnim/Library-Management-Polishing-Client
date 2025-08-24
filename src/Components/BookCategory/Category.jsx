import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://library-server-side-puce.vercel.app/books")
            .then((res) => {
                const allBooks = res.data;
                const uniqueCategories = Array.from(
                    new Map(
                        allBooks.map((book) => [
                            book.category,
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

    if (loading) {
        return (
            <div className="text-center mt-10">
                <Loader />
            </div>
        );
    }

    if (!categories.length) {
        return <p className="text-center mt-10">No categories found</p>;
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Book Categories</h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map(({ name, image }, index) => (
                    <motion.div
                        key={name}
                        onClick={() =>
                            navigate(`/category/${encodeURIComponent(name)}`)
                        }
                        className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-full"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4 flex-1 flex items-center justify-center">
                            <h3 className="text-xl font-semibold text-gray-800 text-center">
                                {name}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Category;
