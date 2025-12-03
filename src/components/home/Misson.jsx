// src/components/home/Misson.jsx

import { Compass, Users, Rocket, Globe, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Mission() {
  const missionItems = [
    {
      icon: Users,
      text: "Empower entrepreneurs and professionals through comprehensive business support and networking opportunities.",
    },
    {
      icon: Rocket,
      text: "Foster innovation and growth by providing startups with mentorship, resources, and strategic guidance.",
    },
    {
      icon: Globe,
      text: "Build a thriving ecosystem that connects businesses, creates jobs, and drives economic development.",
    },
    {
      icon: Heart,
      text: "Support our community through skill development programs, training workshops, and career advancement opportunities.",
    },
    {
      icon: Star,
      text: "Deliver exceptional value to our members through exclusive benefits, events, and collaborative partnerships.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      id="mission"
      className="mb-36 max-w-7xl mx-auto px-6"
    >
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r from-[#16a741] to-[#1FA447] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Compass className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl md:text-4xl poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-2 md:mb-4">
          OUR MISSION
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#16a741] to-[#1FA447] mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        {missionItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03, translateY: -5 }}
            className="group relative bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#16a741]/5 to-[#1FA447]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#16a741] to-[#1FA447] rounded-xl flex items-center justify-center shadow-lg">
                <item.icon className="w-4 md:w-6 h-4 md:h-6 text-white" />
              </div>
              <p className="text-gray-700 text-[12px] md:text-[14px] leading-relaxed pt-1">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
