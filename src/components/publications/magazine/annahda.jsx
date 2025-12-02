// src/components/committtee/magazine/annahda.jsx

"use client";

import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  Share2,
  Award,
  Users,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AnnahdaPage() {
  const magazineInfo = {
    title: "Annahda",
    tagline: "نبض الواقع والابداع",
    coverImage: "/assets/publishings/annahda.png",
    category: "Magazine",
    frequency: "Bi-Monthly",
  };

  const features = [
    {
      icon: Award,
      title: "Excellence Spotlights",
      description:
        "In-depth profiles of outstanding members and their remarkable achievements in business and innovation.",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description:
        "Comprehensive analysis of industry trends, market dynamics, and economic forecasts from expert contributors.",
    },
    {
      icon: Users,
      title: "Community Stories",
      description:
        "Heartwarming narratives of collaboration, mentorship, and the positive impact of our community initiatives.",
    },
    {
      icon: Sparkles,
      title: "Innovation Corner",
      description:
        "Showcasing cutting-edge projects, startup success stories, and breakthrough ideas from our ecosystem.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white pt-32">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#16a741] to-[#1FA447] text-white overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
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
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm poppins-semibold">
                    {magazineInfo.category}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl poppins-bold mb-4">
                  {magazineInfo.title}
                </h1>
                <p className="text-2xl text-white/90 mb-6 italic">
                  {magazineInfo.tagline}
                </p>
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm mb-8">
                  <div>{magazineInfo.frequency}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="https://annahda.in" target="_blank">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl poppins-bold hover:bg-white hover:text-[#16a741] transition-all duration-300"
                    >
                      Visit Website
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
            <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-4">
              About Annahda
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#16a741] to-[#1FA447] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong>Annahda Arabic Magazine</strong> , the flagship Arabic
              publication of Sabeelul Hidaya Islamic College, has proudly
              completed two decades of meaningful academic and literary
              contribution. Over the years, it has evolved into a trusted
              platform that preserves, celebrates, and promotes Arabic language,
              culture, and intellectual tradition within the campus. Its
              bimonthly issues feature scholarly articles, literary works,
              reflections, and student writings that reflect both linguistic
              beauty and academic depth.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              As a magazine born from the passion of aspiring Arabic scholars,
              Annahda plays an integral role in nurturing expression,
              creativity, and critical thinking among students. It continues to
              inspire a culture of reading, writing, and intellectual dialogue,
              making it one of the most respected and enduring student-led
              Arabic publications in the region.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
