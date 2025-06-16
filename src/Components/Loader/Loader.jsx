import React from 'react';

const Loader = () => {
    return (
        <div className="loader fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center  bg-white text-black z-50">
            <span className="loading loading-bars loading-xl"></span>
        </div>
    );
};

export default Loader;