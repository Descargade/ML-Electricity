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
          <stop offset="0%" stopColor="#00BFFF" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <filter id="bolt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background circle outline */}
      <circle cx="50" cy="50" r="45" stroke="#00BFFF" strokeWidth="2" strokeOpacity="0.2" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="#FFD700" strokeWidth="1" strokeOpacity="0.1" fill="none" strokeDasharray="4 4" />
      
      {/* Lightning Bolt */}
      <path
        d="M58 10 L25 55 L48 55 L42 90 L75 45 L52 45 Z"
        fill="url(#bolt-gradient)"
        filter="url(#bolt-glow)"
      />
    </svg>
  );
}
