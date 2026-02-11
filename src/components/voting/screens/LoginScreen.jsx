"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ELECTION_REF } from "@/data/votingData";
import { ref, get, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export default function LoginScreen({ onLoginSuccess }) {
    const [voterId, setVoterId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [config, setConfig] = useState(null); // This config is for the initial check, will be updated by the new logic

    useEffect(() => {
        const configRef = ref(db, `${ELECTION_REF}/config/voting`);
        const unsubscribe = onValue(configRef, (snapshot) => {
            setConfig(snapshot.val());
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // 1. Fetch Voter Details from Firebase (Dynamic)
            const voterRef = ref(db, `${ELECTION_REF}/voters_list/${voterId}`);
            const voterSnap = await get(voterRef);

            if (!voterSnap.exists()) {
                throw new Error("Invalid Voter ID");
            }

            const voter = voterSnap.val();

            // Password logic: First 4 letters of Name + DDMMYYYY
            // Remove non-alphabetic chars from name
            const nameClean = voter.name.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const namePart = nameClean.substring(0, 4);

            if (!voter.dob) {
                throw new Error("DOB record missing. Contact Admin.");
            }

            const dobPart = voter.dob.replace(/-/g, ""); // Remove dashes
            const expectedPassword = (namePart + dobPart).toUpperCase();

            if (password.toUpperCase() !== expectedPassword) {
                throw new Error("Incorrect Password");
            }

            // 2. Firebase Database Checks
            // 2a. Check if voter has already voted
            const voterDbRef = ref(db, `${ELECTION_REF}/voters/${voterId}`);
            const voterSnapshot = await get(voterDbRef);

            if (voterSnapshot.exists() && voterSnapshot.val().voted) {
                throw new Error("You have already voted.");
            }

            // 2b. Check Election Configuration (Enabled / Time)
            const configSnap = await get(ref(db, `${ELECTION_REF}/config/voting`));
            const currentConfig = configSnap.val();

            if (currentConfig) {
                if (currentConfig.enabled === false) {
                    throw new Error("Voting is currently disabled.");
                }
                const now = Date.now();
                if (currentConfig.startTime && now < currentConfig.startTime) {
                    throw new Error(`Voting starts at ${new Date(currentConfig.startTime).toLocaleString()}`);
                }
                if (currentConfig.endTime && now > currentConfig.endTime) {
                    throw new Error("Voting has ended.");
                }
            } else {
                throw new Error("Election configuration not found. Contact Admin.");
            }

            // Success
            onLoginSuccess({ ...voter, id: voterId });

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1a237e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a237e]">Voter Login</h2>
                    <p className="text-gray-500 text-sm mt-1">Enter your credentials to proceed</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                            Voter ID
                        </label>
                        <input
                            type="text"
                            value={voterId}
                            onChange={(e) => setVoterId(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-4 focus:ring-[#1a237e]/10 outline-none transition-all"
                            placeholder="e.g. 1050"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-4 focus:ring-[#1a237e]/10 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                        <p className="text-xs text-gray-400 mt-2 bg-gray-50 p-2 rounded-lg">
                            Format: First 4 letters of Name + DDMMYYYY
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#1a237e] to-[#283593] hover:shadow-xl hover:-translate-y-1 active:scale-95"
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Verifying...
                            </div>
                        ) : (
                            "Verify & Vote"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-400">
                        Facing issues? <span className="text-[#1a237e] font-semibold cursor-pointer hover:underline">Contact Admin</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
