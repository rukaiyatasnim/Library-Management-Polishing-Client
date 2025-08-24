import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await axios.get(
                    "https://library-server-side-puce.vercel.app/books"
                );

                const bookData = res.data.find((b) => b._id === id);

                if (!bookData) setError("Book not found");
                else setBook(bookData);
            } catch (err) {
                setError("Failed to fetch book");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBook();
    }, [id]);

    if (loading) return <Loader></Loader>;
    if (error)
        return (
            <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
                {error}
            </p>
        );
    if (!book) return <p style={{ textAlign: "center" }}>No book found</p>;

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "50px auto",
                borderRadius: "12px",
                border: "2px solid #0d6efd",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            {/* Header */}
            <div
                style={{
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    padding: "20px 30px",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                }}
            >
                Book Details
            </div>

            {/* Content */}
            <div
                style={{
                    display: "flex",
                    gap: "25px",
                    padding: "30px",
                    flexWrap: "wrap",
                    backgroundColor: "#f9f9f9",
                }}
            >
                {/* Book Image */}
                <img
                    src={book.image}
                    alt={book.name}
                    style={{
                        width: "280px",
                        height: "380px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "2px solid #0d6efd",
                    }}
                />

                {/* Book Info */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h2 style={{ margin: "0 0 10px", color: "#0d6efd" }}>
                        {book.name}
                    </h2>
                    <p>
                        <strong>Author:</strong> {book.author}
                    </p>
                    <p>
                        <strong>Category:</strong> {book.category}
                    </p>
                    <p>
                        <strong>Rating:</strong> {book.rating} ⭐
                    </p>
                    <p>
                        <strong>Quantity:</strong> {book.quantity}
                    </p>
                    <p>
                        <strong>Price:</strong> ${book.price}
                    </p>
                    <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
                        <strong>Description:</strong> {book.shortDescription}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
