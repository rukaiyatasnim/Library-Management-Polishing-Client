import React from 'react';
import Slider from '../Slider/Slider';
import Review from '../Review/Review';
import Partner from '../Partner/Partner';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Partner></Partner>
            <Review></Review>
        </div>
    );
};

export default Home;