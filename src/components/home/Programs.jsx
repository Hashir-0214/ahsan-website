import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Programs() {
  const programs = [
    {
      image:
        "/assets/programs/fiqh-seminar.jpeg",
      title: "Fiqh Seminar",
    },
    {
      image:
        "/assets/programs/neelakasham-summer-camp.jpeg",
      title: "Neelakasham Summer Camp",
    },
    {
      image:
        "/assets/programs/rijal-al-fikr.jpeg",
      title: "Rijal Al Fikr",
    },
    {
      image:
        "/assets/programs/union-inauguration.jpeg",
      title: "Union Inauguration",
    },
    {
      image:
        "/assets/programs/book-fair.jpeg",
      title: "Book Fair",
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

      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 mb-10">
        {programs.map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="py-3">
                <h3 className="text-[10px] lg:text-[12px] poppins-bold line-clamp-1 text-gray-800 text-center group-hover:text-[#16a741] transition-colors">
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
