
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import VotingCard from "./VotingCard";

const INITIAL_CANDIDATES = [
    {
        id: 1,
        title: "Eco-Friendly Campus Initiative",
        description: "Launch a comprehensive recycling and waste reduction program across the campus.",
        category: "Sustainability",
        image: "/assets/voting/eco.jpg", // Placeholder image path
        votes: 124,
    },
    {
        id: 2,
        title: "New Student Lounge",
        description: "Create a modern, comfortable space for students to relax and collaborate.",
        category: "Facilities",
        image: "/assets/voting/lounge.jpg", // Placeholder image path
        votes: 89,
    },
    {
        id: 3,
        title: "Tech Workshop Series",
        description: "Monthly workshops covering coding, design, and digital skills.",
        category: "Education",
        image: "/assets/voting/tech.jpg", // Placeholder image path
        votes: 156,
    },
    {
        id: 4,
        title: "Annual Sports Tournament",
        description: "Organize a week-long sports event with various competitions.",
        category: "Sports",
        image: "/assets/voting/sports.jpg", // Placeholder image path
        votes: 201,
    },
];

export default function VotingList() {
    const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVote = (id) => {
        if (hasVoted) return;

        const updatedCandidates = candidates.map((candidate) => {
            if (candidate.id === id) {
                return { ...candidate, votes: candidate.votes + 1 };
            }
            return candidate;
        });

        setCandidates(updatedCandidates);
        setHasVoted(true);
        setSelectedOption(id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-4"
                >
                    Cast Your Vote
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    Your voice matters! Choose the initiative you want to see implemented next.
                    Voting is anonymous and secure.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {candidates.map((candidate, index) => (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <VotingCard
                            key={candidate.id}
                            option={candidate}
                            onVote={handleVote}
                            hasVoted={hasVoted}
                            isSelected={selectedOption === candidate.id}
                        />
                    </motion.div>
                ))}
            </div>

            {hasVoted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl text-center"
                >
                    <p className="text-green-800 font-medium text-lg">
                        Thank you for voting! result will be announced soon.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
