// src/components/home/Vision.jsx

"use client";

import { Target, TrendingUp, Handshake, Lightbulb, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Vision() {
  const visionItems = [
    {
      icon: Award,
      text: "To promote the holistic development of its members in line with the vision and values of Sabeelul Hidaya Islamic College.",
    },
    {
      icon: TrendingUp,
      text: "To serve students through representation, cooperation, and communication in a manner th aligns with the institutional objectives of the College.",
    },
    {
      icon: Handshake,
      text: "To foster personal and social equity. educational advancement, creativity, and unity among all members.",
    },
    {
      icon: Lightbulb,
      text: "To uphold the dignity of student identity through academic excellence, discipline, and adherence to Islamic principles.",
    },
    {
      icon: Lightbulb,
      text: "To contribute to the broader mission of Darul Huda Islamic University by cultivating students of knowledge, ethics, and service.",
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
        <div className="inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-4">
          OUR VISION
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {visionItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#8a48e7]/5 to-[#5c21d2]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#8a48e7] to-[#5c21d2] rounded-xl flex items-center justify-center shadow-lg">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-700 leading-relaxed pt-1">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}