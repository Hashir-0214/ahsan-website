// src/components/home/Hero.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full pt-60 pb-20 px-6"
    >
      {/* Background Blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#16a741]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-[#1FA447]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative w-full max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center justify-between gap-12 mb-36"
        >
          <motion.div variants={itemVariants} className="flex-1 max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2 bg-gradient-to-r from-[#1FA447] to-[#16a741] text-white rounded-full text-sm poppins-semibold shadow-lg select-none pointer-events-none">
                Welcome to AHSAn
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA447] to-[#1FA447] mb-6 leading-tight">
              AHSAn is a platform where students learn, lead, and shine.
            </h2>

            <div className="space-y-5 text-gray-700 text-md leading-relaxed">
              <p className="relative text-gray-500 pl-6 border-l-4 border-[#16a741]">
                <strong className="text-[#1FA447]">
                  Al-Hidaya Students Association (AHSAn)
                </strong>
                , the Students’ Union of Sabeelul Hidaya Islamic College, is
                dedicated to nurturing the academic, cultural, and personal
                growth of every student. Through its dynamic wings and
                subcommittees, AHSAn conducts meaningful programmes—from debates
                and seminars to publications, language clubs, cultural events,
                and social initiatives.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1 max-w-md">
            <motion.div animate={floatAnimation} className="relative">
              <div className="relative rounded-3xl p-8">
                <Image
                  src="/assets/logo.png"
                  alt="Cochin Connect"
                  width={256}
                  height={256}
                  className="w-48 mx-auto mb-6 object-contain"
                  priority
                />
                <div className="text-center">
                  <h1 className="text-5xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-2">
                    AHSAn
                  </h1>
                  <p className="text-xl text-gray-400 poppins-medium">
                    <strong className="text-[#1FA447]">A</strong>l  
                    <strong className="text-[#1FA447]"> H</strong>idaya 
                    <strong className="text-[#1FA447]"> S</strong>tudents 
                    <strong className="text-[#1FA447]"> A</strong>ssociatio<strong className="text-[#1FA447]">n</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}