
"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NOMINEES, POSITIONS, ELECTION_REF } from "@/data/votingData";
import { onValue, ref, runTransaction, update, push } from "firebase/database";
import { db } from "@/lib/firebase";
import { Check, MousePointerClick } from "lucide-react";

export default function VotingBallot({ voter, onFinished }) {
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    const [selections, setSelections] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nomineesData, setNomineesData] = useState(null);
    const [selectedNomineeId, setSelectedNomineeId] = useState(null);

    // Listen for dynamic nominees
    useEffect(() => {
        const nomineesRef = ref(db, `${ELECTION_REF}/nominees`);
        const unsubscribe = onValue(nomineesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setNomineesData(data);
        });
        return () => unsubscribe();
    }, []);

    const currentPosition = POSITIONS[currentPositionIndex];
    // Use dynamic data if available, otherwise fallback to static
    const activeNomineesSource = nomineesData || NOMINEES;
    const nominees = activeNomineesSource[currentPosition] || [];

    // Reset selection when position changes
    useEffect(() => {
        setSelectedNomineeId(null);
    }, [currentPositionIndex]);

    const handleConfirmVote = async (nominee) => {
        const newSelections = { ...selections, [currentPosition]: nominee.id };
        setSelections(newSelections);

        // Move to next position or finish
        if (currentPositionIndex < POSITIONS.length - 1) {
            setCurrentPositionIndex((prev) => prev + 1);
        } else {
            await submitVotes(newSelections);
        }
    };

    const submitVotes = async (finalSelections) => {
        setIsSubmitting(true);
        try {
            const timestamp = Date.now();
            const updates = {};

            // 1. Mark voter as voted with timestamp
            updates[`${ELECTION_REF}/voters/${voter.id}`] = {
                voted: true,
                votedAt: timestamp
            };

            // 2. Create Log Entry
            const logRef = push(ref(db, `${ELECTION_REF}/logs`));
            updates[`${ELECTION_REF}/logs/${logRef.key}`] = {
                voterId: voter.id,
                name: voter.name,
                selections: finalSelections,
                timestamp: timestamp
            };

            // 3. Increment vote counts (using transactions for safety)
            const promises = Object.entries(finalSelections).map(([post, candidateId]) => {
                const voteRef = ref(db, `${ELECTION_REF}/votes/${post}/${candidateId}`);
                return runTransaction(voteRef, (currentVotes) => {
                    return (currentVotes || 0) + 1;
                });
            });

            await Promise.all(promises);

            // 4. Atomic update for voter status and log
            await update(ref(db), updates);

            onFinished();
        } catch (error) {
            console.error("Voting failed:", error);
            alert("Failed to submit vote. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSubmitting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#1a237e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-[#1a237e]">Submitting your vote...</h2>
                    <p className="text-gray-500">Please wait, do not close this window.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image src="/assets/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8" />
                        <span className="font-bold text-[#1a237e] text-lg">AHSAN</span>
                    </div>
                    <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 flex items-center gap-2">
                        <span className="text-gray-500 text-xs font-semibold">VOTER:</span>
                        <span className="text-[#1a237e] font-bold text-sm truncate max-w-[150px]">{voter?.name}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPosition}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl poppins-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#16a741] to-[#1FA447] mb-2">
                                {currentPosition}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#16a741] to-[#1FA447] mx-auto rounded-full mb-4"></div>
                            <p className="text-gray-500 text-sm">Select a candidate to continue</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto pb-10">
                            {nominees.map((nominee) => {
                                const isSelected = selectedNomineeId === nominee.id;

                                return (
                                    <div
                                        key={nominee.id}
                                        onClick={() => setSelectedNomineeId(nominee.id)}
                                        className={`group relative bg-white rounded-md overflow-hidden shadow-lg transition-all duration-300 border cursor-pointer ${isSelected ? "ring-4 ring-[#16a741] border-[#16a741] scale-[1.02]" : "border-purple-100 hover:shadow-xl"
                                            }`}
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-40 md:h-72 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                                            <NomineeImage id={nominee.id} name={nominee.name} />

                                            {/* Gradient Overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                                            {/* Action Overlay */}
                                            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                {isSelected ? (
                                                    <motion.button
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleConfirmVote(nominee);
                                                        }}
                                                        className="bg-[#16a741] text-white font-bold py-2 px-6 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#138e36] transition-colors"
                                                    >
                                                        <Check size={20} />
                                                        CONFIRM
                                                    </motion.button>
                                                ) : (
                                                    <div className="text-white font-bold tracking-widest border-2 border-white px-4 py-1 rounded-lg flex items-center gap-2">
                                                        <MousePointerClick size={16} />
                                                        SELECT
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className={`p-3 text-center relative transition-colors ${isSelected ? 'bg-green-50' : 'bg-white'}`}>
                                            <h3 className={`text-[12px] md:text-[14px] uppercase poppins-bold md:mb-1 transition-colors ${isSelected ? 'text-[#16a741]' : 'text-gray-800 group-hover:text-[#16a741]'}`}>
                                                {nominee.name}
                                            </h3>
                                            <p className="text-[10px] md:text-[12px] poppins-semibold text-gray-500 uppercase tracking-wider">
                                                {currentPosition}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Progress Dots */}
            <div className="py-6 flex justify-center gap-2 bg-white/50 backdrop-blur-sm sticky bottom-0 border-t border-gray-200">
                {POSITIONS.map((pos, idx) => (
                    <div
                        key={pos}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${idx === currentPositionIndex ? "bg-[#16a741] w-8" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

function NomineeImage({ id, name }) {
    const [error, setError] = useState(false);
    const src = `/nominees/${id}.jpg`;

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 group-hover:scale-110 transition-transform duration-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={name}
            className="w-full h-full object-top object-cover group-hover:scale-110 transition-transform duration-700"
            width={288}
            height={288}
            onError={() => setError(true)}
        />
    );
}
