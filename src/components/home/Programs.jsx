import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Programs() {
  const programs = [
    {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      title: "Job Bank",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      title: "Business Support",
    },
    {
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      title: "Startup Support",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      title: "Training Programs",
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
        <h2 className="text-3xl md:text-4xl poppins-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-4">
          Our Programs
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover programs designed to elevate our career
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {programs.map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="py-3">
                <h3 className="text-md poppins-bold text-gray-800 text-center group-hover:text-[#16a741] transition-colors">
                  {program.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/programs">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-3 bg-gradient-to-r from-[#16a741] to-[#1FA447] text-white rounded-full poppins-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
          >
            See More Programs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
