
"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function AdminLoginScreen({ onLoginSuccess, onBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const superAdminUsername = process.env.NEXT_PUBLIC_SUPER_ADMIN_USERNAME;
    const superAdminPassword = process.env.NEXT_PUBLIC_SUPER_ADMIN_PASSWORD;

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "naseefugr" && password === "ugr1022") {
            onLoginSuccess("admin");
        } else if (username === superAdminUsername && password === superAdminPassword) {
            onLoginSuccess("super_admin");
        } else {
            setError("Invalid Username or Password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#263238] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center"
            >
                <h2 className="text-2xl font-bold text-[#1a237e] mb-6">Admin Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a237e] outline-none"
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a237e] outline-none"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#1a237e] to-[#283593] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Login
                    </button>
                </form>

                <button
                    onClick={onBack}
                    className="w-full mt-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                    Back
                </button>
            </motion.div>
        </div>
    );
}
