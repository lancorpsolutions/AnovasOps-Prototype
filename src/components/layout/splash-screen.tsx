"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("anovasos-splash-shown")) return;
    setVisible(true);
    sessionStorage.setItem("anovasos-splash-shown", "1");
    const fadeTimer = setTimeout(() => setFadingOut(true), 1300);
    const hideTimer = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-opacity duration-400 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3 animate-[splashIn_0.6s_ease-out]">
        <div className="h-16 w-16 flex items-center justify-center animate-[splashPulse_1.6s_ease-in-out_infinite]">
          <Image src="/branding/anovas-phoenix-icon.png" alt="" width={64} height={64} priority />
        </div>
        <p className="text-2xl font-bold tracking-tight text-white">
          Anovas<span className="text-orange-light">OS</span>
        </p>
        <p className="text-xs text-white/50">The operating system for home service businesses</p>
      </div>
      <style jsx>{`
        @keyframes splashIn {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes splashPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
