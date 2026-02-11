"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { ELECTION_REF } from "@/data/votingData";
import Link from "next/link";
import { X, Vote } from "lucide-react";

export default function HomeVotingPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState("loading"); // loading, coming_soon, live, ended
    const [config, setConfig] = useState(null);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const configRef = ref(db, `${ELECTION_REF}/config/voting`);
        const unsubscribe = onValue(configRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setConfig(data);
                checkStatus(data);
            } else {
                setStatus("ended");
            }
        });

        return () => unsubscribe();
    }, []);

    const checkStatus = (cfg) => {
        if (!cfg.enabled) {
            setStatus("ended");
            setIsVisible(false);
            return;
        }

        const now = Date.now();
        const start = cfg.startTime || 0;
        const end = cfg.endTime || Infinity;

        if (now > end) {
            setStatus("ended");
            setIsVisible(false);
        } else if (now < start) {
            setStatus("coming_soon");
            setIsVisible(true);
        } else {
            setStatus("live");
            setIsVisible(true);
        }
    };

    // Re-check status every minute in case time passes
    useEffect(() => {
        if (!config) return;
        const interval = setInterval(() => checkStatus(config), 60000);
        return () => clearInterval(interval);
    }, [config]);

    if (!isVisible || status === "ended" || status === "loading") return null;

    return (
        <AnimatePresence>
            {!isMinimized ? (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 right-4 z-50 w-full max-w-sm"
                >
                    <div className="bg-white/90 backdrop-blur-md border-2 border-[#1a237e] rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#1a237e] text-white p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    {status === 'live' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${status === 'live' ? 'bg-red-500' : 'bg-yellow-400'}`}></span>
                                </span>
                                <span className="font-bold tracking-wide text-sm">
                                    {status === 'live' ? 'ELECTION LIVE' : 'ELECTION COMING SOON'}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsMinimized(true)}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-5 text-center">
                            <h3 className="text-[#1a237e] font-extrabold text-xl mb-1">
                                Ahsan Committee 26-27
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {status === 'live'
                                    ? "Voting lines are open! Cast your vote now."
                                    : "Get ready! Voting triggers soon."}
                            </p>

                            <Link href="/voting">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-[#1a237e] to-[#0d47a1] text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 group"
                                >
                                    <Vote size={20} className="group-hover:rotate-12 transition-transform" />
                                    {status === 'live' ? "VOTE NOW" : "VISIT ELECTION PAGE"}
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(false)}
                    className="fixed bottom-4 right-4 z-50 bg-[#1a237e] text-white p-4 rounded-full shadow-xl border-2 border-white"
                >
                    <Vote size={24} />
                    {status === 'live' && (
                        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border border-white"></span>
                    )}
                </motion.button>
            )}
        </AnimatePresence>
    );
}
