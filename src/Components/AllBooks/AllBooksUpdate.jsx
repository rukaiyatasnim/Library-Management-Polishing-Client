import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AllBooksUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        author: "",
        category: "",
        quantity: 0,
        rating: 0,
        shortDescription: "",
        image: "",
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/books/${id}`)
            .then((res) => {
                setFormData(res.data);
            })
            .catch(() => {
                Swal.fire("Error", "Failed to load book", "error");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "rating" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await axios.patch(`http://localhost:3000/books/${id}`, formData);
            Swal.fire("Updated", "Book updated successfully", "success");
            navigate("/all-books");
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Update failed", "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading book details...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">📘 Update Book Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Book Name"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Rating"
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="3"
                />
                <div className="flex justify-between items-center pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-5 py-2 rounded font-medium transition"
                        disabled={updating}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded font-semibold transition"
                        disabled={updating}
                    >
                        {updating ? "Saving..." : "Update Book"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AllBooksUpdate;
