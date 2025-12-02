"use client";

import { Briefcase, Users, Rocket, GraduationCap, Award, Calendar, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgramsPage() {
  const programs = [
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=600&fit=crop",
      title: "Job Bank",
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop",
      title: "Business Support",
    },
    {
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=600&fit=crop",
      title: "Startup Support",
    },
    {
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=600&fit=crop",
      title: "Training Programs",
    },
    {
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=600&fit=crop",
      title: "Member Benefits",
    },
    {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=600&fit=crop",
      title: "Events & Networking",
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=600&fit=crop",
      title: "Business Mentorship",
    },
    {
      image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500&h=600&fit=crop",
      title: "Career Development",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-6">
            OUR PROGRAMS
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-6"></div>

        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
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
                    <h3 className="text-xl poppins-bold text-white mb-2 transition-colors">
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