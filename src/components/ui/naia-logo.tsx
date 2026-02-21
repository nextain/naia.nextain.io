import { cn } from "@/lib/utils";

export function NanLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="naia-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" /> {/* Nextain Blue */}
            <stop offset="50%" stopColor="#06B6D4" /> {/* Flow Cyan */}
            <stop offset="100%" stopColor="#10B981" /> {/* Evolution Green */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Animated Glow */}
        <g filter="url(#glow)" className="opacity-50 animate-pulse">
          <path d="M12 4 L19 16 L5 16 Z" stroke="url(#naia-gradient)" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="12" cy="4" r="3" fill="url(#naia-gradient)" />
          <circle cx="19" cy="16" r="3" fill="url(#naia-gradient)" />
          <circle cx="5" cy="16" r="3" fill="url(#naia-gradient)" />
        </g>

        {/* Core Constellation */}
        <g className="drop-shadow-sm transition-transform duration-700 hover:rotate-180" style={{ transformOrigin: 'center' }}>
           <path d="M12 4 L19 16 L5 16 Z" stroke="url(#naia-gradient)" strokeWidth="1.5" strokeLinejoin="round" />
           <circle cx="12" cy="4" r="2.5" fill="#06B6D4" />
           <circle cx="19" cy="16" r="2.5" fill="#10B981" />
           <circle cx="5" cy="16" r="2.5" fill="#2563EB" />
        </g>
      </svg>
    </div>
  );
}
