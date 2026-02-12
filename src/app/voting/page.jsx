
"use client";

import { useState } from "react";
import IntroScreen from "@/components/voting/screens/IntroScreen";
import LoginScreen from "@/components/voting/screens/LoginScreen";
import InkingScreen from "@/components/voting/screens/InkingScreen";
import VotingBallot from "@/components/voting/screens/VotingBallot";
import SuccessScreen from "@/components/voting/screens/SuccessScreen";
import AdminLoginScreen from "@/components/voting/screens/AdminLoginScreen";
import AdminDashboardScreen from "@/components/voting/screens/AdminDashboardScreen";
import ResultsScreen from "@/components/voting/screens/ResultsScreen"; // Added ResultsScreen

import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { ELECTION_REF } from "@/data/votingData";
import { Trophy } from "lucide-react"; // Added Trophy import

export default function VotingPage() {
    const [screen, setScreen] = useState("INTRO"); // INTRO, LOGIN, INKING, BALLOT, SUCCESS, ADMIN_LOGIN, ADMIN_DASHBOARD
    const [currentVoter, setCurrentVoter] = useState(null);
    const [adminRole, setAdminRole] = useState("admin");
    const [maintenance, setMaintenance] = useState(false);
    const [showResults, setShowResults] = useState(false); // New state for results
    const [resultsDismissed, setResultsDismissed] = useState(false); // Allow dismissing results to access admin

    useEffect(() => {
        const maintenanceRef = ref(db, `${ELECTION_REF}/config/voting`); // Changed to entire config
        const unsubscribe = onValue(maintenanceRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMaintenance(data.maintenance || false);
                setShowResults(data.resultsPublished || false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleStart = () => setScreen("LOGIN");
    const handleAdminAuth = () => setScreen("ADMIN_LOGIN");

    const handleLoginSuccess = (voter) => {
        setCurrentVoter(voter);
        setScreen("INKING");
    };

    const handleAdminLoginSuccess = (role = "admin") => {
        setAdminRole(role);
        setScreen("ADMIN_DASHBOARD");
    };

    const handleInkingComplete = () => setScreen("BALLOT");

    const handleVotingFinished = () => setScreen("SUCCESS");

    const handleRestart = () => {
        setCurrentVoter(null);
        setScreen("INTRO");
    };

    // Maintenance Screen Content
    if (maintenance && screen !== "ADMIN_LOGIN" && screen !== "ADMIN_DASHBOARD") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-yellow-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    The election system is currently undergoing scheduled maintenance. Please check back shortly.
                </p>
                {/* Hidden Admin Trigger (Double Click on Logo/Icon or subtle button) */}
                <button
                    onClick={handleAdminAuth}
                    className="text-gray-800 hover:text-gray-700 transition-colors text-sm"
                >
                    Administrative Access
                </button>
            </div>
        );
    }

    return (
        <div className="pt-16">
            {/* Results Screen Override (Public) */}
            {showResults && !resultsDismissed && screen !== "ADMIN_LOGIN" && screen !== "ADMIN_DASHBOARD" ? (
                <ResultsScreen onClose={() => setResultsDismissed(true)} />
            ) : (
                <>
                    {screen === "INTRO" && <IntroScreen onStart={handleStart} onAdmin={handleAdminAuth} />}
                    {screen === "LOGIN" && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
                    {screen === "ADMIN_LOGIN" && (
                        <AdminLoginScreen onLoginSuccess={handleAdminLoginSuccess} onBack={() => setScreen("INTRO")} />
                    )}
                    {screen === "ADMIN_DASHBOARD" && <AdminDashboardScreen onLogout={() => setScreen("INTRO")} role={adminRole} />}
                    {screen === "INKING" && <InkingScreen onComplete={handleInkingComplete} />}
                    {screen === "BALLOT" && (
                        <VotingBallot voter={currentVoter} onFinished={handleVotingFinished} />
                    )}
                    {screen === "SUCCESS" && <SuccessScreen onRestart={handleRestart} />}
                </>
            )}

            {/* Re-open Results Button (Floating) */}
            {showResults && resultsDismissed && (
                <button
                    onClick={() => setResultsDismissed(false)}
                    className="fixed bottom-4 left-4 z-40 bg-white text-[#1a237e] px-4 py-3 rounded-xl shadow-lg border border-blue-100 font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                    <Trophy size={20} className="text-yellow-500" />
                    Show Results
                </button>
            )}
        </div>
    );
}
