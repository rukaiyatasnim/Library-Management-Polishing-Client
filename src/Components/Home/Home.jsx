import React from 'react';
import Slider from '../Slider/Slider';
import Review from '../Review/Review';
import Partner from '../Partner/Partner';
import Category from './../BookCategory/Category';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            <Partner></Partner>
            <Review></Review>
        </div>
    );
};

export default Home;