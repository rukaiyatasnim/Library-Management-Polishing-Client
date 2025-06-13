import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    {
        title: "Welcome to City Library",
        desc: "Discover books, journals, and archives from all over the world — in one place.",
        btn: "Explore Now",
        link: "/explore",
    },
    {
        title: "Your Knowledge Partner",
        desc: "Access our digital library 24/7 from anywhere. No need to visit in person!",
        btn: "Read Online",
        link: "/read-online",
    },
    {
        title: "Academic Events Every Week",
        desc: "Join discussions, workshops, and author talks hosted at your library.",
        btn: "See Events",
        link: "/events",
    },
    {
        title: "Reserve Study Rooms",
        desc: "Book quiet spaces for individual or group study sessions easily.",
        btn: "Book Now",
        link: "/study-rooms",
    },
    {
        title: "Library Membership Open",
        desc: "Become a member to unlock borrowing privileges and digital content.",
        btn: "Join Us",
        link: "/membership",
    },
];

const Slider = () => (
    <div className="w-full mt-6 bg-cyan-100 dark:bg-cyan-900">
        <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            loop
        >
            {slides.map(({ title, desc, btn, link }, i) => (
                <SwiperSlide key={i}>
                    <div className="h-[280px] flex flex-col justify-center items-center text-center px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-cyan-800 dark:text-cyan-100 mb-3">
                            {title}
                        </h2>
                        <p className="text-cyan-700 dark:text-cyan-200 max-w-2xl mb-5">
                            {desc}
                        </p>
                        <a
                            href={link}
                            className="bg-cyan-700 text-white px-5 py-2 rounded-full hover:bg-cyan-800 dark:hover:bg-cyan-600 transition"
                        >
                            {btn}
                        </a>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);

export default Slider;