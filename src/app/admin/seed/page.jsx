"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function SeedPage() {
    const [status, setStatus] = useState("Idle");
    const [error, setError] = useState("");

    const seedUser = async () => {
        setStatus("Loading...");
        setError("");
        try {
            // Attempt to create the default admin user
            await createUserWithEmailAndPassword(auth, "admin@ahsan.com", "admin123");
            setStatus("Success! User seeded: admin@ahsan.com / admin123");
        } catch (err) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                setStatus("User already exists! You can log in with admin@ahsan.com");
            } else {
                setError(err.message);
                setStatus("Failed");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Seed Admin User</h1>
                <p className="text-gray-600 mb-6">
                    Click the button below to create a default admin user.
                    <br/><br/>
                    <strong>Email:</strong> admin@ahsan.com<br/>
                    <strong>Password:</strong> admin123
                </p>

                <button
                    onClick={seedUser}
                    className="w-full bg-[#1a237e] text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-[#151c66] transition-colors mb-4"
                >
                    Create Admin User
                </button>

                {status !== "Idle" && (
                    <div className={`p-4 rounded-xl mb-4 font-semibold ${error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                        {error || status}
                    </div>
                )}

                <Link href="/admin/login" className="text-blue-600 hover:underline font-semibold mt-4 inline-block">
                    Go to Login
                </Link>
            </div>
        </div>
    );
}
