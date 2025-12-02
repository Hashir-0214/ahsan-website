// src/components/publications/PublicationPage.jsx
"use client";

import { BookOpen, Calendar, Download, ExternalLink, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { link } from "motion/react-client";

export default function PublicationsPage() {
  const publications = [
    {
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
      title: "Annahda",
      description:
        "Our flagship magazine featuring comprehensive coverage of industry trends, member achievements, and organizational milestones. A quarterly publication that showcases the best of our community's innovation and success stories.",
      category: "Magazine",
      link: "/publications/annahda/",
    },
    {
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop",
      title: "TURUQ",
      description:
        "A digital-first publication dedicated to entrepreneurship and business development. TURUQ provides aspiring entrepreneurs with actionable insights, startup strategies, funding opportunities, and expert guidance for navigating the business landscape.",
      category: "Webzine",
        link: "/publications/turuq/",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=500&fit=crop",
      title: "Chromadiaries",
      description:
        "An innovative web magazine that celebrates creativity, design thinking, and technological innovation. Features in-depth interviews with industry leaders, case studies, and emerging trends that shape the future of business and technology.",
      category: "Web Magazine",
        link: "/publications/chromadiaries/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl md:text-5xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mb-6">
            OUR PUBLICATIONS
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#8a48e7] to-[#5c21d2] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Dive into our curated collection of publications that bring you the
            latest insights, expert perspectives, and inspiring stories from the
            world of business and innovation.
          </p>
        </motion.div>

        {/* Publications List */}
        <div className="space-y-12">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="group"
            >
              <div
                className={`bg-white rounded-md overflow-hidden transition-all duration-500 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex flex-col lg:flex`}
              >
                {/* Image Section */}
                <div className="lg:w-2/5 relative overflow-hidden">
                  <div className="relative h-80 lg:h-full">
                    <img
                      src={publication.image}
                      alt={publication.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[#8a48e7] text-sm poppins-bold rounded-full shadow-lg">
                        {publication.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl poppins-bold text-gray-800 mb-4 group-hover:text-[#8a48e7] transition-colors">
                    {publication.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-8 text-base lg:text-lg">
                    {publication.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link href={publication.link}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl poppins-semibold hover:border-[#8a48e7] hover:text-[#8a48e7] transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View More
                      </motion.button>
                    </Link>
                  </div>

                  {/* Stats Bar */}
                  <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-6 text-sm">
                    <p className="text-xl text-black"> • • •</p>
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
