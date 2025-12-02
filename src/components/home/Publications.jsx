// src/components/home/Publications.jsx

import { BookOpen, Calendar, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Publications() {
  const publications = [
    {
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop",
      title: "Annahda",
      description:
        "Comprehensive analysis of market trends, member achievements, and organizational growth throughout the year.",
      category: "Magazine",
    },
    {
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
      title: "TURUQ",
      description:
        "A complete handbook for aspiring entrepreneurs with insights on startup strategies, funding, and business planning.",
      category: "Webzine",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      title: "Chromadiaries",
      description:
        "Quarterly publication featuring expert interviews, success stories, and emerging trends in business and technology.",
      category: "Web Magazine",
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
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-4">
          OUR PUBLICATIONS
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our latest publications featuring insights, reports, and
          resources for the business community
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {publications.map((publication, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-purple-100"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
              <img
                src={publication.image}
                alt={publication.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#8a48e7] text-xs poppins-semibold rounded-full shadow-md">
                  {publication.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-xl poppins-bold text-gray-800 mb-3 group-hover:text-[#8a48e7] transition-colors">
                {publication.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {publication.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional: View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <Link href="/publications">
          <button className="px-8 py-3 border-2 border-[#8a48e7] text-[#8a48e7] rounded-full poppins-semibold hover:bg-[#8a48e7] hover:text-white transition-all duration-300 inline-flex items-center gap-2">
            View Publications
            <ExternalLink className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
