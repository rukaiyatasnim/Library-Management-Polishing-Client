import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();

    const handleAddBook = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newBook = {
            image: form.image.value,
            name: form.name.value,
            quantity: parseInt(form.quantity.value),
            author: form.author.value,
            category: form.category.value,
            shortDescription: form.shortDescription.value,
            rating: parseFloat(form.rating.value),
            price: parseFloat(form.price.value),
        };

        try {
            const res = await axios.post(
                "https://library-server-side-puce.vercel.app/books",
                newBook
            );

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Book added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    navigate("/allBooks");
                }, 1600);
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to add book",
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                background: "#f87171",
                color: "#7f1d1d",
                iconColor: "#7f1d1d",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Add a New Book</h2>
            <form
                onSubmit={handleAddBook}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div>
                    <label className="font-semibold">Image URL</label>
                    <input type="text" name="image" className="input input-bordered w-full mt-1" required />
                </div>
                <div>
                    <label className="font-semibold">Book Name</label>
                    <input type="text" name="name" className="input input-bordered w-full mt-1" required />
                </div>
                <div>
                    <label className="font-semibold">Quantity</label>
                    <input type="number" name="quantity" className="input input-bordered w-full mt-1" min="1" required />
                </div>
                <div>
                    <label className="font-semibold">Author Name</label>
                    <input type="text" name="author" className="input input-bordered w-full mt-1" required />
                </div>
                <div>
                    <label className="font-semibold">Category</label>
                    <select name="category" className="select select-bordered w-full mt-1" required>
                        <option value="">Choose one</option>
                        <option value="Novel">Novel</option>
                        <option value="Thriller">Thriller</option>
                        <option value="History">History</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                </div>
                <div>
                    <label className="font-semibold">Rating (1-5)</label>
                    <input type="number" name="rating" className="input input-bordered w-full mt-1" min="1" max="5" step="0.1" required />
                </div>
                <div>
                    <label className="font-semibold">Price</label>
                    <input type="number" name="price" className="input input-bordered w-full mt-1" min="0" step="0.01" required />
                </div>
                <div className="md:col-span-2">
                    <label className="font-semibold">Short Description</label>
                    <textarea name="shortDescription" className="textarea textarea-bordered w-full mt-1" rows="4" required></textarea>
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full">Add Book</button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
