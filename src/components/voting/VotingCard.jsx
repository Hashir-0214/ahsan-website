
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Check } from "lucide-react";

export default function VotingCard({ option, onVote, hasVoted, isSelected }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 ${
        isSelected
          ? "border-[#1FA447] ring-2 ring-[#1FA447]/20"
          : "border-gray-100 hover:border-[#1FA447]/50"
      }`}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {option.image ? (
          <Image
            src={option.image}
            alt={option.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-4xl">?</span>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        
        {/* Badge/Category if needed */}
        {option.category && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#16a741] shadow-sm">
            {option.category}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#1FA447] transition-colors">
          {option.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {option.description}
        </p>

        {/* Stats & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm font-medium text-gray-500">
            <span className="text-gray-900 font-bold text-lg">{option.votes}</span> votes
          </div>

          <button
            onClick={() => onVote(option.id)}
            disabled={hasVoted}
            className={`
              relative overflow-hidden px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform active:scale-95
              ${
                hasVoted
                  ? isSelected
                    ? "bg-[#1FA447] text-white cursor-default"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#16a741] to-[#1FA447] text-white shadow-lg hover:shadow-[#1FA447]/30 hover:-translate-y-0.5"
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSelected ? (
                <>
                  Voted <Check size={16} />
                </>
              ) : (
                "Vote Now"
              )}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
