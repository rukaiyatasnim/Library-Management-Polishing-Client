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
        name: 'Bangladesh National Library',
        img: 'https://nanl.portal.gov.bd/sites/default/files/files/nanl.portal.gov.bd/page/5305e7d8_e2b5_49da_8756_bdaaa90cbfd3/NLB.jpg',
        desc: 'The central public library of Bangladesh, supporting reading programs, archiving national literature, and public access to books.',
    },
    {
        name: 'British Council Library',
        img: 'https://pbs.twimg.com/media/DVQoDMEVMAAl4V6.jpg:large',
        desc: 'International cultural hub offering books, digital content, and global literature events in Bangladesh.',
    },
    {
        name: 'Dhaka University Central Library',
        img: 'https://cosmosgroup.sgp1.digitaloceanspaces.com/news/9m5i3JaDlHlUzZqpp4hzjiM3Vs7FG8brcIkrs9oB.jpeg',
        desc: 'One of the oldest and largest academic libraries, partnering in research, reading campaigns, and student-focused literary events.',
    },
    {
        name: 'Shishu Academy Library',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4x716BBh8LqWueqJNpi3roDiKMelVaKIgQ&s',
        desc: 'Dedicated to child education and literature, hosting storytelling sessions, book fairs, and cultural programs for kids.',
    },
    {
        name: 'Bangla Academy',
        img: 'https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/uploads/1613787349.jpg',
        desc: 'Promotes Bengali language, literature, and hosts the annual Ekushey Boi Mela and literary award events.',
    },
    {
        name: 'Bishwa Shahitto Kendro',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZIU99yTy26dxGpDFaElQDXtpGTUzJ_wRgew&s',
        desc: 'Non-profit organization encouraging reading habits among youth through book distribution, reading programs, and mobile libraries.',
    },
    {
        name: 'Shilpakala Academy',
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Seal_of_Bangladesh_Shilpakala_Academy.svg/1200px-Seal_of_Bangladesh_Shilpakala_Academy.svg.png',
        desc: 'Government institution promoting fine arts, music, drama, and literature; hosts exhibitions and literary festivals.',
    },
    {
        name: 'Rokomari.com',
        img: 'https://www.rokomari.com/static/200/images/rokomari_og.jpg',
        desc: 'Leading online bookstore in Bangladesh, often involved in book campaigns, author meetups, and reading events.',
    },
    {
        name: 'Tech For Bangladesh',
        img: 'https://media.licdn.com/dms/image/v2/D4D0BAQHW1Tp0qsV2DA/company-logo_200_200/company-logo_200_200/0/1732084882706/tfbangladesh_logo?e=2147483647&v=beta&t=MvvzADAhYOEnzy_TY7xjWPAAw02ubVKr8TgcHM-84sk',
        desc: 'A youth tech community organizing workshops, innovation events, and educational collaborations for a smarter Bangladesh.',
    }
];

export default Partner;
