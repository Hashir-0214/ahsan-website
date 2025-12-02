// src/components/committtee/Committee.jsx

"use client";

import { Globe, Calendar, ExternalLink, Award, Users, TrendingUp, Sparkles, Lightbulb, Target, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function TuruqPage() {
  const magazineInfo = {
    title: "TURUQ",
    titleMalayalam: "തുറുഖ്",
    tagline: "Pathways to Success",
    taglineMalayalam: "വിജയത്തിലേക്കുള്ള വഴികൾ",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1000&fit=crop",
    category: "Webzine",
    language: "Malayalam",
    frequency: "Monthly",
  };

  const features = [
    {
      icon: Lightbulb,
      title: "സംരംഭക മാർഗ്ഗനിർദേശം",
      titleEng: "Entrepreneurial Guidance",
      description: "സംരംഭകത്വത്തിന്റെ യാത്രയിൽ വിജയിക്കാൻ ആവശ്യമായ ഉപദേശങ്ങളും തന്ത്രങ്ങളും.",
      descriptionEng: "Essential advice and strategies to succeed in your entrepreneurial journey.",
    },
    {
      icon: Target,
      title: "ബിസിനസ് കഥകൾ",
      titleEng: "Business Stories",
      description: "വിജയകരമായ സംരംഭങ്ങളുടെയും സംരംഭകരുടെയും പ്രചോദനാത്മക കഥകൾ.",
      descriptionEng: "Inspiring stories of successful ventures and entrepreneurs.",
    },
    {
      icon: Rocket,
      title: "സ്റ്റാർട്ടപ്പ് ഗൈഡ്",
      titleEng: "Startup Guide",
      description: "സ്റ്റാർട്ടപ്പുകൾക്ക് ആവശ്യമായ ഫണ്ടിംഗ്, പ്ലാനിംഗ്, വളർച്ച എന്നിവയെക്കുറിച്ചുള്ള വിശദമായ വിവരങ്ങൾ.",
      descriptionEng: "Detailed information on funding, planning, and growth for startups.",
    },
    {
      icon: Users,
      title: "വിദഗ്ദ്ധ അഭിപ്രായങ്ങൾ",
      titleEng: "Expert Opinions",
      description: "വ്യവസായ വിദഗ്ധരുടെ അഭിപ്രായങ്ങളും വിശകലനങ്ങളും.",
      descriptionEng: "Opinions and analyses from industry experts.",
    },
  ];

  const sections = [
    { 
      nameMal: "എഡിറ്റേഴ്സ് നോട്ട്",
      nameEng: "Editor's Note"
    },
    { 
      nameMal: "കവർ സ്റ്റോറി",
      nameEng: "Cover Story"
    },
    { 
      nameMal: "സംരംഭക ലോകം",
      nameEng: "Entrepreneurship World"
    },
    { 
      nameMal: "വിജയ കഥകൾ",
      nameEng: "Success Stories"
    },
    { 
      nameMal: "സ്റ്റാർട്ടപ്പ് സ്പോട്ട്ലൈറ്റ്",
      nameEng: "Startup Spotlight"
    },
    { 
      nameMal: "വിപണി വിശകലനം",
      nameEng: "Market Analysis"
    },
    { 
      nameMal: "ഫണ്ടിംഗ് ഗൈഡ്",
      nameEng: "Funding Guide"
    },
    { 
      nameMal: "സാങ്കേതിക പുരോഗതി",
      nameEng: "Technology Advancement"
    },
  ];

  const recentEditions = [
    { 
      month: "ഡിസംബർ 2024",
      monthEng: "December 2024",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      theme: "ഡിജിറ്റൽ പരിവർത്തനം",
      themeEng: "Digital Transformation"
    },
    { 
      month: "നവംബർ 2024",
      monthEng: "November 2024",
      cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
      theme: "സുസ്ഥിര ബിസിനസ്",
      themeEng: "Sustainable Business"
    },
    { 
      month: "ഒക്ടോബർ 2024",
      monthEng: "October 2024",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      theme: "യുവ സംരംഭകർ",
      themeEng: "Young Entrepreneurs"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pt-32">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
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
                <img
                  src={magazineInfo.coverImage}
                  alt={magazineInfo.title}
                  className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute top-6 right-6 z-20">
                  <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                    <Globe className="w-5 h-5 text-blue-600 inline mr-2" />
                    <span className="text-blue-600 poppins-bold text-sm">Online</span>
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
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl poppins-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Globe className="w-5 h-5" />
                    Visit Webzine
                  </motion.button>
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
            <h2 className="text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
              About TURUQ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              <strong>TURUQ</strong> Web Magazine is the dynamic digital publication wing of AHSAn, created to highlight contemporary ideas, campus reflections, and student-led perspectives. Designed as an accessible online platform, it captures the evolving academic, cultural, and social pulse of the college community. Turuq showcases articles, essays, creative pieces, reviews, and multimedia contributions, giving students a global-friendly space to express their thoughts.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              As a modern web-based magazine, Turuq encourages creative freedom and embraces the flexibility of digital media. It promotes fast, relevant, and engaging content that connects students across committees and interests. Turuq continues to grow as a hub of innovation, discourse, and youthful expression, empowering students to engage with ideas and present them to a wider audience.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}