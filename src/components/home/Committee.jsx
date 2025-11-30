// src/components/home/Committee.jsx

"use client";

import { Crown, Star, Mail, Linkedin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeCommittee() {
  const featuredMembers = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      name: "John Anderson",
      position: "President",
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      name: "Sarah Mitchell",
      position: "Vice President",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      name: "Michael Chen",
      position: "Secretary",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-36 max-w-7xl mx-auto px-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-4">
          Our Committee
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the leadership team guiding our mission forward
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
        {featuredMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group relative"
          >
            <div className="bg-white rounded-md overflow-hidden shadow-lg transition-all duration-500 border border-purple-100">
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Social Icons (appear on hover) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#8a48e7] hover:text-white transition-colors shadow-lg">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#8a48e7] hover:text-white transition-colors shadow-lg">
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 text-center relative">
                <div className="">
                  <h3 className="text-md uppercase poppins-bold text-gray-800 mb-2 group-hover:text-[#8a48e7] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs poppins-semibold text-[#8a48e7] uppercase tracking-wider">
                    {member.position}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group px-8 py-3 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
        >
          View Full Committee
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}