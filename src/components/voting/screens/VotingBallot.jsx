
"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { NOMINEES, POSITIONS, ELECTION_REF } from "@/data/votingData";
import { onValue, ref, runTransaction, update, push } from "firebase/database";
import { db } from "@/lib/firebase";

export default function VotingBallot({ voter, onFinished }) {
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    const [selections, setSelections] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nomineesData, setNomineesData] = useState(null);

    // Listen for dynamic nominees
    useState(() => {
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

    const handleVote = async (nominee) => {
        // Confirm dialog
        if (!confirm(`Confirm vote for ${nominee.name} as ${currentPosition}?`)) return;

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
                    <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                        <span className="text-gray-500 text-xs font-semibold mr-1">VOTER:</span>
                        {/* Find ID from name or pass ID? Voter object has name but we need ID for path. 
                LoginScreen passed 'voter' object which comes from VOTERS[id]. 
                We need to ensure 'voter' object has the ID. 
                Wait, VOTERS is keyed by ID. The object value doesn't have ID.
                We need to inject ID in LoginScreen or pass it here.
                Let's assume LoginScreen passed { id: "1050", ...voterData }
             */}
                        <span className="text-[#1a237e] font-bold text-sm truncate max-w-[150px] inline-block align-bottom">{voter?.name}</span>
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
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1a237e] mb-10 capitalize tracking-tight">
                            {currentPosition}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {nominees.map((nominee) => (
                                <div
                                    key={nominee.id}
                                    onClick={() => handleVote(nominee)}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-[#1a237e]/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Image Area */}
                                    <div className="bg-gray-200 h-56 w-full relative overflow-hidden">
                                        {/* Placeholder for missing images */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1a237e] mb-1 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                                            {nominee.name}
                                        </h3>
                                        <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-full">
                                            {currentPosition}
                                        </span>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-[#1a237e]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
                                        <span className="text-white text-xl font-bold tracking-widest border-2 border-white px-6 py-2 rounded-lg">
                                            VOTE
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Progress Dots */}
            <div className="py-6 flex justify-center gap-2">
                {POSITIONS.map((pos, idx) => (
                    <div
                        key={pos}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === currentPositionIndex ? "bg-[#1a237e]" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
