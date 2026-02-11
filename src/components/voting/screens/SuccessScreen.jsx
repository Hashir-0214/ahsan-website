
"use client";

import { useEffect, useState } from "react";
import "./success.css"; // We'll create this CSS file

export default function SuccessScreen({ onRestart }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence:
        // 0: Initial
        // 1: Open Lid (0.5s)
        // 2: Drop Paper (1.5s)
        // 3: Shake Box (2.2s)
        // 4: Close Lid (2.8s)
        // 5: Show Thanks (3.8s)
        // 6: Redirect (5.0s)

        const timer1 = setTimeout(() => setStep(1), 500);
        const timer2 = setTimeout(() => setStep(2), 1500);
        const timer3 = setTimeout(() => setStep(3), 2200);
        const timer4 = setTimeout(() => setStep(4), 2800);
        const timer5 = setTimeout(() => setStep(5), 3800);

        const timer6 = setTimeout(() => {
            if (onRestart) onRestart();
        }, 6000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
        };
    }, [onRestart]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#e3f2fd] overflow-hidden relative perspective-1200">

            {/* Thanks Message */}
            <h1
                className={`absolute top-[20%] w-full text-center text-5xl font-extrabold text-[#1a237e] z-30 transition-all duration-800 ${step >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                style={{ textShadow: "0 2px 0 rgba(255,255,255,0.5)" }}
            >
                THANK YOU!
            </h1>

            {/* Ballot Box Container */}
            <div className="relative w-[220px] h-[260px] z-10 preserve-3d">

                {/* Paper Vote */}
                <div
                    className={`
                absolute top-1/2 left-1/2 w-[100px] h-[140px] bg-white border border-gray-300
                flex items-center justify-center font-bold text-[#c62828] text-xl rounded shadow-md z-10
                transition-all duration-100
                ${step === 1 ? "paper-prepare" : ""}
                ${step >= 2 ? "paper-drop" : "opacity-0"} 
                ${step === 0 ? "opacity-0" : ""}
            `}
                    style={{ transformOrigin: "center" }}
                >
                    VOTE
                </div>

                {/* Box Lid */}
                <div
                    className={`
                absolute -top-[45px] -left-[5%] w-[110%] h-[60px] bg-[#455a64] border-4 border-[#263238] border-b-0
                rounded-t-lg z-20 origin-bottom transition-transform duration-600 ease-in-out shadow-lg
                ${(step >= 1 && step < 4) ? "rotate-x-70" : "rotate-x-0"}
            `}
                >
                    {/* Slot */}
                    <div className="absolute top-[5px] left-[15%] w-[70%] h-[8px] bg-black rounded shadow-inner-dark" />
                </div>

                {/* Box Body */}
                <div
                    className={`
                absolute bottom-0 w-full h-[210px] bg-[#37474f] border-4 border-[#263238] rounded-lg
                flex items-center justify-center shadow-2xl
                ${step === 3 ? "box-shake" : ""}
            `}
                >
                    <div className="w-16 h-16 border-4 border-[#263238]/20 rounded-full" />
                </div>

            </div>

            {/* Table Surface */}
            <div className="absolute bottom-0 w-full h-[180px] bg-[#a1887f] border-t-[10px] border-[#795548] shadow-surface z-0" />

        </div>
    );
}
