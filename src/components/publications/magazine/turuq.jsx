// src/components/committtee/Committee.jsx

"use client";

import {
  Globe,
  Calendar,
  ExternalLink,
  Award,
  Users,
  TrendingUp,
  Sparkles,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function TuruqPage() {
  const magazineInfo = {
    title: "TURUQ",
    titleMalayalam: "തുറുഖ്",
    tagline: "",
    coverImage: "/assets/publishings/turuq.png",
    category: "Webzine",
    language: "Malayalam",
    frequency: "Monthly",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pt-32">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white overflow-hidden">
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
              <div className="relative group">
                <div className="absolute -inset-4 bg-white/20 backdrop-blur-sm rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <Image
                  src={magazineInfo.coverImage}
                  alt={magazineInfo.title}
                  width={500}
                  height={500}
                  className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute top-6 right-6 z-20">
                  <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                    <Globe className="w-5 h-5 text-blue-600 inline mr-2" />
                    <span className="text-blue-600 poppins-bold text-sm">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Magazine Info */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <div transition={{ delay: 0.3, duration: 0.8 }}>
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm poppins-semibold">
                    {magazineInfo.category}
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl poppins-bold mb-2">
                  {magazineInfo.title}
                </h1>
                <p className="text-2xl text-white/90 mb-2 italic">
                  {magazineInfo.tagline}
                </p>
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    <span>Malayalam Digital Magazine</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="https://turuq.in/" target="_blank">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl poppins-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Globe className="w-5 h-5" />
                      Visit Webzine
                    </motion.button>
                  </Link>
                </div>
              </div>
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
            <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
              About TURUQ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong>TURUQ</strong> Web Magazine is the dynamic digital
              publication wing of AHSAn, created to highlight contemporary
              ideas, campus reflections, and student-led perspectives. Designed
              as an accessible online platform, it captures the evolving
              academic, cultural, and social pulse of the college community.
              Turuq showcases articles, essays, creative pieces, reviews, and
              multimedia contributions, giving students a global-friendly space
              to express their thoughts.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              As a modern web-based magazine, Turuq encourages creative freedom
              and embraces the flexibility of digital media. It promotes fast,
              relevant, and engaging content that connects students across
              committees and interests. Turuq continues to grow as a hub of
              innovation, discourse, and youthful expression, empowering
              students to engage with ideas and present them to a wider
              audience.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
