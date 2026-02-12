"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, Trophy, BarChart3, PieChart, Users, ChevronRight, TrendingUp } from "lucide-react";
import { onValue, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { NOMINEES, POSITIONS, CLASS_ROSTER, ELECTION_REF } from "@/data/votingData";

// --- HELPERS ---

const processElectionData = (logs, votersList, candidates) => {
    // 1. Initialize Structure
    const results = {};
    const classBreakdowns = {};

    POSITIONS.forEach(pos => {
        results[pos] = {};
        classBreakdowns[pos] = {};
        (candidates?.[pos] || NOMINEES[pos] || []).forEach(cand => {
            results[pos][cand.id] = 0;
            classBreakdowns[pos][cand.id] = {}; // { 'SS1': 0, 'SS2': 0 ... }
        });
    });

    // 2. Process Logs (Real Votes)
    // Logs contain { voterId, selections: { president: 'p1', ... } }
    if (logs) {
        Object.values(logs).forEach(log => {
            const voterId = log.voterId;
            const voterClass = votersList?.[voterId]?.class || findClassFromRoster(voterId) || "UNKNOWN";

            if (log.selections) {
                Object.entries(log.selections).forEach(([pos, candId]) => {
                    // Update Total
                    if (!results[pos]) results[pos] = {};
                    results[pos][candId] = (results[pos][candId] || 0) + 1;

                    // Update Class Breakdown
                    if (!classBreakdowns[pos]) classBreakdowns[pos] = {};
                    if (!classBreakdowns[pos][candId]) classBreakdowns[pos][candId] = {};

                    classBreakdowns[pos][candId][voterClass] = (classBreakdowns[pos][candId][voterClass] || 0) + 1;
                });
            }
        });
    }

    return { results, classBreakdowns };
};

const findClassFromRoster = (voterId) => {
    for (const [className, ids] of Object.entries(CLASS_ROSTER)) {
        if (ids.includes(String(voterId))) return className;
    }
    return null;
};

// --- COMPONENT ---

export default function ResultsScreen({ onClose }) {
    const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'details' (managed via selectedPosition)
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [electionData, setElectionData] = useState({ results: {}, classBreakdowns: {} });
    const [nomineesData, setNomineesData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // We need 3 things: Logs (for granular data), Voters List (for classes), Nominees (for names)
                const logsRef = ref(db, `${ELECTION_REF}/logs`);
                const votersListRef = ref(db, `${ELECTION_REF}/voters_list`);
                const nomineesRef = ref(db, `${ELECTION_REF}/nominees`);

                // Using onValue for real-time updates
                const unsubscribeLogs = onValue(logsRef, (snapLogs) => {
                    const logs = snapLogs.val();

                    onValue(votersListRef, (snapVoters) => {
                        const voters = snapVoters.val();

                        onValue(nomineesRef, (snapNominees) => {
                            const nominees = snapNominees.val();
                            setNomineesData(nominees);

                            const processed = processElectionData(logs, voters, nominees);
                            setElectionData(processed);
                            setIsLoading(false);
                        });
                    });
                });

                return () => {
                    unsubscribeLogs();
                    // Others are nested, but Firebase usually handles this okay. 
                    // ideally we'd track all unsubscribes but for now simplicity.
                };
            } catch (e) {
                console.error("Error fetching results", e);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const activeNominees = nomineesData || NOMINEES;

    return (
        <div className="fixed inset-0 z-[9999] bg-gray-50/95 backdrop-blur-sm overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a237e] flex items-center gap-2">
                        <Trophy className="text-yellow-500" />
                        Election Results
                    </h1>
                    <p className="text-sm text-gray-500">Live Analytics & Class Breakdowns</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={24} className="text-gray-600" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto p-6 md:p-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e]"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Winner Showcase (Minimal View) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {POSITIONS.map((pos, idx) => (
                                <WinnerCard
                                    key={pos}
                                    position={pos}
                                    candidates={activeNominees[pos] || []}
                                    votes={electionData.results[pos] || {}}
                                    onClick={() => setSelectedPosition(pos)}
                                    delay={idx * 0.1}
                                />
                            ))}
                        </div>

                        {/* Detailed Analysis Modal */}
                        <AnimatePresence>
                            {selectedPosition && (
                                <DetailedStatsModal
                                    position={selectedPosition}
                                    candidates={activeNominees[selectedPosition] || []}
                                    votes={electionData.results[selectedPosition] || {}}
                                    breakdowns={electionData.classBreakdowns[selectedPosition] || {}}
                                    onClose={() => setSelectedPosition(null)}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

function WinnerCard({ position, candidates, votes, onClick, delay }) {
    // Calculate Winner
    const winnerId = Object.keys(votes).reduce((a, b) => (votes[a] || 0) > (votes[b] || 0) ? a : b, candidates[0]?.id);
    const winner = candidates.find(c => c.id === winnerId) || candidates[0];
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    const winnerVotes = votes[winnerId] || 0;
    const percentage = totalVotes > 0 ? ((winnerVotes / totalVotes) * 100).toFixed(1) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10 }}
            onClick={onClick}
            className="relative bg-white pt-16 pb-8 px-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group border border-gray-100 mt-12 overflow-visible"
        >
            {/* Floating Avatar */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-gray-100">
                <Image
                    src={`/nominees/${winner.id}.jpg`}
                    alt={winner.name}
                    fill
                    className="object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Img"; }}
                />
            </div>

            {/* Position Pill */}
            <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
                    {position}
                </span>
            </div>

            {/* Content */}
            <div className="text-center mt-4">
                <h3 className="text-xl font-extrabold text-[#1a237e] group-hover:text-blue-600 transition-colors line-clamp-1">
                    {winner.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2 mb-6">
                    <span className="text-3xl font-black text-gray-900">{percentage}%</span>
                    <span className="text-sm font-medium text-gray-400 self-end mb-1">of votes</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6 relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    />
                </div>

                {/* Stats Footer */}
                <div className="flex items-center justify-between text-sm p-4 bg-gray-50 rounded-2xl">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-400 font-semibold uppercase">Votes</span>
                        <span className="font-bold text-gray-800">{winnerVotes}</span>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-200"></div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 font-semibold uppercase">Total</span>
                        <span className="font-bold text-gray-800">{totalVotes}</span>
                    </div>
                </div>

                <div className="mt-4 text-xs font-semibold text-blue-600 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    View Analytics <TrendingUp size={14} />
                </div>
            </div>
        </motion.div>
    );
}

function DetailedStatsModal({ position, candidates, votes, breakdowns, onClose }) {
    // Helpers
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    const sortedCandidates = [...candidates].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

    // Get all unique classes involved
    const allClasses = new Set();
    Object.values(breakdowns).forEach(candBreakdown => {
        Object.keys(candBreakdown).forEach(cls => allClasses.add(cls));
    });
    const sortedClasses = Array.from(allClasses).sort();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 uppercase flex items-center gap-2">
                            {position} <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{totalVotes} Votes</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-10">

                    {/* 1. Overall Comparison (Bar Chart) */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <BarChart3 size={20} /> Overall Standing
                        </h3>
                        <div className="space-y-4">
                            {sortedCandidates.map(cand => {
                                const count = votes[cand.id] || 0;
                                const pct = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                                return (
                                    <div key={cand.id} className="grid grid-cols-12 gap-4 items-center group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                        <div className="col-span-3 md:col-span-2 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                                                <Image src={`/nominees/${cand.id}.jpg`} fill alt={cand.name} className="object-cover" />
                                            </div>
                                            <div className="text-sm font-bold text-gray-800 truncate">{cand.name}</div>
                                        </div>
                                        <div className="col-span-7 md:col-span-9">
                                            <div className="h-8 bg-gray-100 rounded-r-lg overflow-hidden relative flex items-center">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-[#1a237e] opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                                <span className="absolute left-2 text-xs font-bold text-white z-10 mix-blend-difference">{count} votes</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1 text-right font-mono text-sm font-bold text-gray-500">
                                            {pct.toFixed(1)}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 2. Class-wise Breakdown (Detailed Heatmap/Table) */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <PieChart size={20} /> Class Desegregation
                        </h3>
                        <div className="overflow-x-auto bg-gray-50 rounded-xl border border-gray-200">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-200">
                                        <th className="p-4 font-bold text-gray-600">Candidate</th>
                                        <th className="p-4 font-bold text-gray-600 text-center border-l w-24">TOTAL</th>
                                        {sortedClasses.map(cls => (
                                            <th key={cls} className="p-4 font-bold text-gray-500 text-center w-16">{cls}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCandidates.map(cand => {
                                        const candBreakdown = breakdowns[cand.id] || {};
                                        // Find max vote in a class to scale color intensity
                                        const maxInClass = Math.max(...Object.values(candBreakdown), 1);

                                        return (
                                            <tr key={cand.id} className="border-b border-gray-200 hover:bg-white transition-colors">
                                                <td className="p-4 font-medium text-gray-800 flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                                                        <Image src={`/nominees/${cand.id}.jpg`} fill alt={cand.name} className="object-cover" />
                                                    </div>
                                                    {cand.name}
                                                </td>
                                                <td className="p-4 font-bold text-[#1a237e] text-center border-l bg-blue-50/50">
                                                    {votes[cand.id] || 0}
                                                </td>
                                                {sortedClasses.map(cls => {
                                                    const val = candBreakdown[cls] || 0;
                                                    // Calculate opacity based on value relative to max (simple heatmap)
                                                    const intensity = val > 0 ? Math.min((val / 10) + 0.1, 1) : 0; // Cap at 10 votes for full color for now

                                                    return (
                                                        <td key={cls} className="p-4 text-center">
                                                            <div
                                                                className={`w-8 h-8 mx-auto rounded-md flex items-center justify-center text-xs font-semibold ${val > 0 ? "text-blue-900" : "text-gray-300"}`}
                                                                style={{ backgroundColor: val > 0 ? `rgba(26, 35, 126, ${intensity * 0.4})` : 'transparent' }}
                                                            >
                                                                {val || "-"}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">* Heatmap intensity indicates vote grouping per class.</p>
                    </section>

                </div>
            </motion.div>
        </motion.div>
    );
}
