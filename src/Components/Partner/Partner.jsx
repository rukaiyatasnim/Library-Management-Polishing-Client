import React from 'react';

const Partner = () => {
    return (
        <section className="py-16 bg-cyan-50 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-cyan-900 text-center mb-12">
                    Events & Organizations We've Collaborated With
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {partners.map(({ name, desc, img }, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <figure className="flex justify-center mb-4">
                                <img
                                    src={img}
                                    alt={name}
                                    className="h-24 object-contain rounded-xl"
                                />
                            </figure>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-cyan-800 mb-2">{name}</h2>
                                <p className="text-gray-600 text-sm">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const partners = [
    {
        name: 'BUET',
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/BUET_LOGO.svg/1200px-BUET_LOGO.svg.png',
        desc: 'Organizers of prestigious tech events, workshops, and conferences in Bangladesh.',
    },
    {
        name: 'Shilpakala Academy',
        img: 'https://scontent.fdac145-1.fna.fbcdn.net/v/t39.30808-6/470700551_603504008865697_7006684000393852012_n.jpg?...',
        desc: 'Host of cultural events, art exhibitions, and performances showcasing Bangladeshi talent.',
    },
    {
        name: 'Bangladesh Photography Club',
        img: 'https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?w=500&auto=format&fit=crop&q=60',
        desc: 'Organizers of photography challenges and exhibitions across Dhaka and beyond.',
    },
    {
        name: 'ICCB',
        img: 'https://scontent.fdac145-1.fna.fbcdn.net/v/t39.30808-6/358705819_272778832065017_4537462105771026487_n.jpg?...',
        desc: 'Hosts large-scale conventions, exhibitions, and concerts in Dhaka.',
    },
    {
        name: 'Bangladesh Film Academy',
        img: 'https://img.freepik.com/free-photo/man-filming-with-professional-camera_23-2149066324.jpg',
        desc: 'Promoting independent filmmakers and film festivals in Bangladesh.',
    },
    {
        name: 'Dhaka Art Summit',
        img: 'https://scontent.fdac145-1.fna.fbcdn.net/v/t39.30808-6/325651067_1290365108193119_7178101223333487215_n.jpg?...',
        desc: 'Platform for contemporary art in South Asia, showcasing international and local artists.',
    },
    {
        name: 'Bangladesh Academy of Fine Arts',
        img: 'https://scontent.fdac145-1.fna.fbcdn.net/v/t39.30808-6/415014597_818618876736244_2728199419485330319_n.jpg?...',
        desc: 'A hub for learning and promoting fine arts, with regular exhibitions and workshops.',
    },
    {
        name: 'BRAC University',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw-9nh7_7_NzXRJ29p1HHmE8BpI7mt-hIuxA&s',
        desc: 'Hosts academic and cultural events, bringing together students from diverse fields.',
    },
    {
        name: 'IAB',
        img: 'https://scontent.fdac145-1.fna.fbcdn.net/v/t39.30808-6/472238268_1011091661061792_683298278711206413_n.jpg?...',
        desc: 'Organizes architectural exhibitions, conferences, and award ceremonies in Bangladesh.',
    }
];

export default Partner;
