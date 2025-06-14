import React from "react";

const categories = [
    {
        id: 1,
        name: "Novels",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 2,
        name: "Thriller",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 3,
        name: "History",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 4,
        name: "Science Fiction",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
    },
];

const Category = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Book Categories</h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {categories.map(({ id, name, image }) => (
                    <div
                        key={id}
                        className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    // onClick={() => handleCategoryClick(name)} // Add navigation logic here
                    >
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-48 object-cover"
                        />
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
