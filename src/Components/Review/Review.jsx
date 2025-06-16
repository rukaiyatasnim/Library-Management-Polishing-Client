import React from 'react';
import CountUp from "react-countup";

const Review = () => {
    return (
        <section className="py-20 bg-cyan-50 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-cyan-900 mb-4 leading-tight">
                        Discover Top Book Events in Bangladesh
                    </h1>
                    <p className="text-lg md:text-xl text-cyan-700 max-w-3xl mx-auto leading-relaxed">
                        Connect with authors, readers, and thinkers through curated book fairs, discussions, and literary gatherings.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <div className="text-4xl font-bold text-cyan-800 mb-2">
                            <CountUp end={120} duration={3} />+
                        </div>
                        <h3 className="text-lg font-semibold text-cyan-700">Literary Events Organized</h3>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <div className="text-4xl font-bold text-cyan-800 mb-2">
                            <CountUp end={8000} duration={3} />+
                        </div>
                        <h3 className="text-lg font-semibold text-cyan-700">Readers Engaged</h3>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <div className="text-4xl font-bold text-cyan-800 mb-2">
                            <CountUp end={350} duration={3} />+
                        </div>
                        <h3 className="text-lg font-semibold text-cyan-700">Authors Featured</h3>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <div className="text-4xl font-bold text-cyan-800 mb-2">
                            <CountUp end={18000} duration={3} />+
                        </div>
                        <h3 className="text-lg font-semibold text-cyan-700">Books Borrowed & Read</h3>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <div className="text-4xl font-bold text-cyan-800 mb-2">
                            <CountUp end={95} duration={3} />%
                        </div>
                        <h3 className="text-lg font-semibold text-cyan-700">Positive Feedback</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;
