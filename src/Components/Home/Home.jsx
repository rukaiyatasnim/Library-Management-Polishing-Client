import React from 'react';
import Slider from '../Slider/Slider';
import Review from '../Review/Review';
import Partner from '../Partner/Partner';
import Category from './../BookCategory/Category';
import FeedBack from '../../Shared/Feedback/Feedback';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            <Partner></Partner>
            <FeedBack></FeedBack>
            <Review></Review>
        </div>
    );
};

export default Home;