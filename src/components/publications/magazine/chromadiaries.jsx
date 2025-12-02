// src/components/publications/magazine/chromadiaries.jsx
"use client";

import {
  Palette,
  Calendar,
  ExternalLink,
  Award,
  Users,
  Camera,
  Sparkles,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ChromadiariesPage() {
  const magazineInfo = {
    title: "Chromadiaries",
    tagline: "",
    coverImage: "/assets/publishings/chromadiaries.png",
    category: "Web Magazine",
    language: "English & Malayalam",
    frequency: "Monthly",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-32">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#f97316] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Magazine Cover */}
            <div className="lg:w-2/5">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-white/20 backdrop-blur-sm rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <Image
                  src={magazineInfo.coverImage}
                  alt={magazineInfo.title}
                  width={800}
                  height={1000}
                  className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute top-6 right-6 z-20">
                  <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                    <Palette className="w-5 h-5 text-pink-600 inline mr-2" />
                    <span className="text-pink-600 font-bold text-sm">
                      Digital
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Magazine Info */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    {magazineInfo.category}
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold mb-4">
                  {magazineInfo.title}
                </h1>
                <p className="text-2xl text-white/90 mb-6 italic">
                  {magazineInfo.tagline}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="https://www.chromadiaries.in" target="_blank">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-white text-pink-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Visit Magazine
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 mb-4">
              About Chromadiaries
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong>Chromadiaries</strong> is the vibrant online English
              magazine designed exclusively for students under 18, offering a
              colourful platform for creativity and self-expression. It
              celebrates young voices by publishing stories, poems, essays,
              illustrations, reflections, and creative experiments that capture
              the imaginations and experiences of early learners. Chromadiaries
              nurtures confidence in communication and builds strong English
              language skills through engaging and youthful content.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              With its interactive structure and fresh visual appeal,
              Chromadiaries represents the energy, curiosity, and creativity of
              young minds. It encourages students to explore new ideas, express
              themselves freely, and take pride in their talents. As a growing
              digital space, it continues to inspire emerging writers and
              artists, making it a signature initiative of AHSAn for developing
              young creative leaders.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
