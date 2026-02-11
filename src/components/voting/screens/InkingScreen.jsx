
"use client";

import { useEffect, useState } from "react";
import "./inking.css"; // We'll create this CSS file for specific keyframes

export default function InkingScreen({ onComplete }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // 1. Enter and Draw
        const timer1 = setTimeout(() => setStep(1), 100); // Start immediately

        // 2. Draw Up (0.8s later)
        const timer2 = setTimeout(() => setStep(2), 900);

        // 3. Exit (2.0s later)
        const timer3 = setTimeout(() => setStep(3), 2100);

        // 4. Show Text (2.2s later)
        const timer4 = setTimeout(() => setStep(4), 2300);

        // 5. Complete (3.0s later)
        const timer5 = setTimeout(() => onComplete(), 3100);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, [onComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#263238] overflow-hidden">
            <div className="relative w-[300px] h-[400px] flex justify-center items-center">
                {/* Finger SVG */}
                <svg
                    id="finger-svg"
                    viewBox="0 0 200 320"
                    className="w-[200px] h-[320px] z-10 drop-shadow-2xl"
                >
                    <defs>
                        <filter id="shadow-f" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="4" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.3" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        d="M50,40 Q50,220 60,240 L140,240 Q150,220 150,40 L130,15 L70,15 Z"
                        fill="#ffccbc"
                        filter="url(#shadow-f)"
                    />
                    <path
                        d="M85,20 L115,20 Q125,25 120,40 L80,40 Q75,25 85,20"
                        fill="#fff0e6"
                        stroke="#eebfae"
                        strokeWidth="1"
                    />
                    <path
                        d="M55,190 L145,190"
                        stroke="#e6b9a8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                    />
                    <path
                        d="M60,215 L140,215"
                        stroke="#e6b9a8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.6"
                    />
                    {/* Ink Line */}
                    <line
                        x1="100"
                        y1="230"
                        x2="100"
                        y2="30"
                        className={`ink-path ${step >= 2 ? "anim-ink-draw" : ""}`}
                        id="ink-path"
                    />
                </svg>

                {/* Brush SVG */}
                <svg
                    className={`brush-svg absolute z-20 w-[80px] h-[80px] left-[20px] top-[300px] opacity-0 drop-shadow-lg
            ${step >= 1 ? "anim-brush-enter" : ""}
            ${step >= 2 ? "anim-brush-draw" : ""}
            ${step >= 3 ? "anim-brush-exit" : ""}
          `}
                    viewBox="0 0 100 100"
                >
                    <rect x="35" y="10" width="30" height="90" rx="4" fill="#333" />
                    <rect x="30" y="15" width="40" height="20" fill="#aaa" />
                    <path d="M35,35 L65,35 L60,90 L40,90 Z" fill="#f5f5f5" stroke="#ddd" strokeWidth="1" />
                    <path d="M45,35 L55,35 L52,42 L48,42 Z" fill="#000" />
                </svg>
            </div>

            <p
                className={`text-white mt-10 text-2xl font-bold tracking-widest transition-opacity duration-700 ${step >= 4 ? "opacity-100" : "opacity-0"
                    }`}
            >
                Marking Voter...
            </p>
        </div>
    );
}
