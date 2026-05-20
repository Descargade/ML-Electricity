import React from "react";

export function Logo({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={`w-10 h-10 ${className}`}
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="bolt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#00BFFF" />
          <stop offset="100%" stopColor="#0055FF" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Lightning Bolt */}
      <path
        d="M55 5 L20 60 L45 60 L40 95 L80 40 L50 40 Z"
        fill="url(#bolt-gradient)"
        filter="url(#glow)"
      />
      
      {/* ML Initials in negative space / overlaid */}
      <text
        x="65"
        y="80"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#FFFFFF"
        textAnchor="middle"
        style={{ textShadow: "0px 0px 8px rgba(0,191,255,0.8)" }}
      >
        ML
      </text>
    </svg>
  );
}
