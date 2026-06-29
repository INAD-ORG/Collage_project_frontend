// components/Loader/Loader.jsx
import React from "react";

const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${fullScreen ? "min-h-screen" : "min-h-[60vh]"} bg-black overflow-hidden`}
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal shapes */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border-[30px] border-white/[0.02] rotate-45" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] border-[20px] border-yellow-400/[0.02] -rotate-12" />

        {/* Dashed squares */}
        <div className="absolute top-1/4 -left-16 w-48 h-48 border-2 border-dashed border-yellow-400/10 rotate-12" />
        <div className="absolute bottom-1/4 -right-16 w-32 h-32 border-2 border-dashed border-white/5 -rotate-6" />

        {/* Dotted circles */}
        <div className="absolute top-1/3 right-20 w-36 h-36 border-2 border-dotted border-white/5 -rotate-6 hidden lg:block" />
        <div className="absolute bottom-1/3 left-20 w-24 h-24 border-2 border-dotted border-yellow-400/10 rotate-12 hidden lg:block" />

        {/* Small circles */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-4 h-4 border-2 border-white/5 rotate-45" />
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/10 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-yellow-400/15 rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-white/5 rounded-full" />

        {/* Plus signs */}
        <div className="absolute top-1/4 right-1/3 text-yellow-400/15 text-2xl font-light">
          +
        </div>
        <div className="absolute bottom-1/4 left-10 text-white/5 text-xl">
          +
        </div>
        <div className="absolute top-2/3 right-20 text-yellow-400/10 text-lg">
          +
        </div>
        <div className="absolute top-10 left-1/3 text-white/5 text-xl">+</div>

        {/* Diagonal lines */}
        <div className="absolute top-20 right-20 w-24 h-px bg-yellow-400/20 rotate-45" />
        <div className="absolute bottom-40 left-10 w-16 h-px bg-white/10 -rotate-45" />
        <div className="absolute top-1/2 right-1/4 w-20 h-px bg-yellow-400/10 rotate-12" />
        <div className="absolute bottom-1/3 left-1/3 w-12 h-px bg-white/5 -rotate-30" />

        {/* Small square accents */}
        <div className="absolute top-40 left-20 w-5 h-5 border border-yellow-400/10 rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white/[0.03] -rotate-6" />
        <div className="absolute top-2/3 left-1/4 w-4 h-4 border border-white/5 rotate-45" />

        {/* Large faint circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full hidden lg:block" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-yellow-400/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl" />

        {/* Hexagon grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15v22L30 52 0 37V15z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 52px",
            }}
          />
        </div>

        {/* Gradient lines - top and bottom */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Book/Education themed loader */}
        <div className="relative">
          {/* Outer square frame with glow */}
          <div className="w-16 h-16 border-2 border-yellow-400/20 rounded-sm animate-pulse relative">
            <div className="absolute inset-0 bg-yellow-400/5 blur-xl"></div>
          </div>

          {/* Center graduation cap icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-yellow-400 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-400/40 animate-pulse"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-400/40 animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-400/40 animate-pulse"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-400/40 animate-pulse"></div>
        </div>

        {/* Loading Text with glow */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400/60 text-sm tracking-[0.3em] uppercase font-light relative">
            Loading
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></span>
          </span>
          <span className="flex gap-1 ml-1">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></span>
          </span>
        </div>

        {/* Decorative elements with animation */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-yellow-400/30 animate-pulse"></span>
          <span className="w-1.5 h-1.5 bg-yellow-400/40 rounded-full animate-ping"></span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-yellow-400/30 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
