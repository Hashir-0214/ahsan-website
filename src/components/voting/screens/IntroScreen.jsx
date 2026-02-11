"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ELECTION_REF } from "@/data/votingData";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export default function IntroScreen({ onStart, onAdmin }) {
    const [stats, setStats] = useState({
        total: 0,
        voted: 0,
        waiting: 0,
        classStats: [],
    });
    const [config, setConfig] = useState(null);
    const [broadcast, setBroadcast] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isVotingOpen, setIsVotingOpen] = useState(false);

    useEffect(() => {
        // Fetch Voter List (Total & Class Grouping)
        const votersListRef = ref(db, `${ELECTION_REF}/voters_list`);
        const votesRef = ref(db, `${ELECTION_REF}/voters`); // Tracks who voted

        let votersList = {};
        let votes = {};

        const calculateStats = () => {
            const totalStudents = Object.keys(votersList).length;
            const totalVotedCount = Object.keys(votes).length;

            // Group by Class
            const classGroups = {};
            // Structure: { "SS1": { total: 0, voted: 0 }, ... }

            Object.entries(votersList).forEach(([id, confirmData]) => {
                const className = confirmData.class || "Unknown";
                if (!classGroups[className]) {
                    classGroups[className] = { total: 0, voted: 0 };
                }
                classGroups[className].total += 1;
                if (votes[id]) {
                    classGroups[className].voted += 1;
                }
            });

            const classStatsData = Object.entries(classGroups).map(([className, data]) => ({
                className,
                classTotal: data.total,
                classVoted: data.voted,
                percentage: data.total > 0 ? ((data.voted / data.total) * 100).toFixed(1) : 0
            })).sort((a, b) => a.className.localeCompare(b.className));

            setStats({
                total: totalStudents,
                voted: totalVotedCount,
                waiting: totalStudents - totalVotedCount,
                classStats: classStatsData
            });
        };

        const unsubscribeVotersList = onValue(votersListRef, (snapshot) => {
            votersList = snapshot.val() || {};
            calculateStats();
        });

        const unsubscribeVotes = onValue(votesRef, (snapshot) => {
            votes = snapshot.val() || {};
            calculateStats();
        });

        // Listen for Broadcast & Config
        const configRef = ref(db, `${ELECTION_REF}/config/voting`);
        const unsubscribeConfig = onValue(configRef, (snapshot) => {
            const data = snapshot.val() || {};
            setBroadcast(data.broadcast);
            setConfig(data);
        });

        return () => {
            unsubscribeVotersList();
            unsubscribeVotes();
            unsubscribeConfig();
        };
    }, []);

    // Timer Logic
    useEffect(() => {
        if (!config) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const start = config.startTime || 0;
            const enabled = config.enabled !== false; // Default true if undefined

            if (!enabled) {
                setIsVotingOpen(false);
                setTimeLeft("Election Disabled");
                return;
            }

            if (now >= start) {
                setIsVotingOpen(true);
                setTimeLeft(null);
            } else {
                setIsVotingOpen(false);
                const diff = start - now;

                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft({
                    h: String(hours).padStart(2, '0'),
                    m: String(minutes).padStart(2, '0'),
                    s: String(seconds).padStart(2, '0')
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [config]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white relative">

            {/* Broadcast Banner */}
            {broadcast?.active && broadcast?.message && (
                <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black font-bold py-2 px-4 shadow-lg z-50 overflow-hidden whitespace-nowrap">
                    <div className="animate-marquee inline-block">
                        {broadcast.message}
                    </div>
                </div>
            )}

            {/* Admin Button */}
            <button
                onClick={onAdmin}
                className="absolute top-4 right-4 p-2 text-white/1 hover:text-white/20 transition-colors"
                title="Admin Login"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center mb-8"
            >
                <Image
                    src="/assets/logo.png"
                    alt="AHSAN Logo"
                    width={100}
                    height={100}
                    className="w-24 h-auto drop-shadow-lg mb-4 hover:scale-105 transition-transform"
                />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm">
                    AHSAN
                </h1>
                <p className="text-lg md:text-xl opacity-90 font-medium mt-2">
                    2026 - 27 Committee Election
                </p>
            </motion.div>

            {/* Main Stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl"
            >
                {[
                    { label: "Total Students", value: stats.total },
                    { label: "Votes Cast", value: stats.voted },
                    { label: "Not Voted", value: stats.waiting },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex-1 min-w-[120px] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-lg hover:bg-white/20 transition-all"
                    >
                        <span className="block text-3xl md:text-4xl font-extrabold text-[#ffd700] drop-shadow-md">
                            {item.value}
                        </span>
                        <span className="text-xs md:text-sm uppercase tracking-wider opacity-80 mt-2 block">
                            {item.label}
                        </span>
                    </div>
                ))}
            </motion.div>

            {/* Class Stats */}
            {isVotingOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-5xl"
                >
                    <h3 className="text-xl font-semibold mb-4 border-b border-white/20 pb-2">
                        Class Wise Live Updates
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        {stats.classStats.map((cls) => (
                            <div
                                key={cls.className}
                                className="bg-white text-gray-800 p-5 rounded-xl shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xl font-bold text-[#1a237e]">
                                        {cls.className}
                                    </span>
                                    <span className="text-lg font-bold text-[#c62828]">
                                        {cls.percentage}%
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mb-3">
                                    <span>Voted: <b>{cls.classVoted}</b></span>
                                    <span>Total: <b>{cls.classTotal}</b></span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${cls.percentage}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-[#1a237e] to-[#42a5f5] rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ACTION AREA: BUTTON OR TIMER */}
            <div className="mb-10 w-full max-w-sm text-center">
                {isVotingOpen ? (
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStart}
                        className="bg-[#ffd700] text-[#1a237e] px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-[#ffea00] transition-all w-full"
                    >
                        Start Voting
                    </motion.button>
                ) : (
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
                        {typeof timeLeft === 'string' ? (
                            // Disabled State
                            <div className="text-red-300 font-bold text-xl uppercase tracking-widest animate-pulse">
                                {timeLeft}
                            </div>
                        ) : (
                            // Countdown State
                            <div>
                                <p className="text-sm uppercase tracking-widest opacity-80 mb-4 font-bold text-blue-200">Voting Starts In</p>
                                <div className="flex justify-center gap-4 text-center">
                                    {['h', 'm', 's'].map((unit, i) => (
                                        <div key={unit} className="flex flex-col items-center">
                                            <div className="bg-white/90 text-[#1a237e] w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-black shadow-lg">
                                                {timeLeft ? timeLeft[unit] : "--"}
                                            </div>
                                            <span className="text-xs mt-2 uppercase font-bold opacity-70">
                                                {unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
