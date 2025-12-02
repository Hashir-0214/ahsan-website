"use client";

import { motion } from "framer-motion";

export default function ProgramsPage() {
  const programs = [
    {
      image: "/assets/programs/aksahara-jeevitham.jpeg",
      title: "Aksahara Jeevitham",
    },
    {
      image: "/assets/programs/al-idrisi-award.jpeg",
      title: "Al Idrisi Award",
    },
    {
      image: "/assets/programs/al-muhadith.jpeg",
      title: "Al Muhadith",
    },
    {
      image: "/assets/programs/all-kerala-mega-online-quiz.jpeg",
      title: "All Kerala Mega Online Quiz",
    },
    {
      image: "/assets/programs/aurum-iq-reality-show.jpeg",
      title: "Aurum IQ Reality Show",
    },
    {
      image: "/assets/programs/aurum-iq.jpeg",
      title: "Aurum IQ",
    },
    {
      image: "/assets/programs/award-of-excellence.jpeg",
      title: "Award of Excellence",
    },
    {
      image: "/assets/programs/best-chief-editor-award.jpeg",
      title: "Best Chief Editor Award",
    },
    {
      image: "/assets/programs/book-fair.jpeg",
      title: "Book Fair",
    },
    {
      image: "/assets/programs/caligraphy-mathsaram.jpeg",
      title: "Caligraphy Mathsaram",
    },
    {
      image: "/assets/programs/celebrating-imam-ghazali.jpeg",
      title: "Celebrating Imam Ghazali",
    },
    {
      image: "/assets/programs/celebrating-imam-ibn-arabi.jpeg",
      title: "Celebrating Imam Ibn Arabi",
    },
    {
      image: "/assets/programs/celebrating-imam-ibn-sina.jpeg",
      title: "Celebrating Imam Ibn Sina",
    },
    {
      image: "/assets/programs/celebrating-imam-said-ramadan-al-bouti.jpeg",
      title: "Celebrating Imam Said Ramadan Al-Bouti",
    },
    {
      image: "/assets/programs/celebrating-imams-imam-al-haramain.jpeg",
      title: "Celebrating Imams: Imam al-Haramain",
    },
    {
      image: "/assets/programs/day-celebration-of ibn-khaldun.jpeg",
      title: "Day Celebration of Ibn Khaldun",
    },
    {
      image: "/assets/programs/fiqh-seminar.jpeg",
      title: "Fiqh Seminar",
    },
    {
      image: "/assets/programs/hit-of-the-year-history.jpeg",
      title: "Hit of the Year – History",
    },
    {
      image: "/assets/programs/ignite.jpeg",
      title: "Ignite",
    },
    {
      image: "/assets/programs/labbaik.jpeg",
      title: "Labbaik",
    },
    {
      image: "/assets/programs/ma-al-habeeb.jpeg",
      title: "Ma'al Habeeb",
    },
    {
      image: "/assets/programs/neelakasham-summer-camp.jpeg",
      title: "Neelakasham Summer Camp",
    },
    {
      image: "/assets/programs/nilav.jpeg",
      title: "Nilav",
    },
    {
      image: "/assets/programs/program-x.jpeg",
      title: "Program X",
    },
    {
      image: "/assets/programs/rabeeh-speech.jpeg",
      title: "Rabeeh Speech",
    },
    {
      image: "/assets/programs/rijal-al-fikr.jpeg",
      title: "Rijal al-Fikr",
    },
    {
      image: "/assets/programs/riwaq.jpeg",
      title: "Riwaq",
    },
    {
      image: "/assets/programs/sabeel-herald.jpeg",
      title: "Sabeel Herald",
    },
    {
      image: "/assets/programs/sabeel-meelad-rali.jpeg",
      title: "Sabeel Meelad Rally",
    },
    {
      image: "/assets/programs/sabeel-talks.jpeg",
      title: "Sabeel Talks",
    },
    {
      image: "/assets/programs/sabeel-tour.jpeg",
      title: "Sabeel Tour",
    },
    {
      image: "/assets/programs/scriptoria.jpeg",
      title: "Scriptoria",
    },
    {
      image: "/assets/programs/thechnologia.jpeg",
      title: "Thechnologia",
    },
    {
      image: "/assets/programs/ulhiyyath-study-class.jpeg",
      title: "Ulhiyyath Study Class",
    },
    {
      image: "/assets/programs/union-inauguration.jpeg",
      title: "Union Inauguration",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl md:text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-6">
            OUR PROGRAMS
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#16a741] to-[#1FA447] mx-auto rounded-full mb-6"></div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl poppins-bold text-white mb-2">
                      {program.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
