import React from "react";

const Feedback = [
    {
        name: "Rafiq Hasan",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        feedback:
            "BookIQ has made managing my reading list so easy. I can borrow and track books effortlessly!",
    },
    {
        name: "Sabrina Akter",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        feedback:
            "I love the clean design and smooth navigation. Finding books by category is super simple.",
    },
    {
        name: "Tariq Rahman",
        photo: "https://randomuser.me/api/portraits/men/65.jpg",
        feedback:
            "The borrowing system is smart and prevents double borrowing. I always know which books I have.",
    },
    {
        name: "Moushumi Begum",
        photo: "https://randomuser.me/api/portraits/women/55.jpg",
        feedback:
            "BookIQ is my go-to platform for discovering new books. The interface is intuitive and fast.",
    },
];

export default function UserTestimonials() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16 bg-blue-50 rounded-2xl shadow-lg">
            <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">
                What Our Users Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {Feedback.map(({ name, photo, feedback }, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={photo}
                                alt={name}
                                className="w-16 h-16 rounded-full mr-4 border-2 border-blue-300"
                            />
                            <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
                        </div>
                        <p className="text-blue-700 italic leading-relaxed">"{feedback}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
