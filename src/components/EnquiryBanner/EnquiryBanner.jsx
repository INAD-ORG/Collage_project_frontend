import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { FiStar } from "react-icons/fi";

const EnquiryBanner = () => {
  return (
    <div className="relative bg-black py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Abstract Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal shape top-right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] border-[30px] border-white/[0.03] rotate-45" />

        {/* Medium dashed square */}
        <div className="absolute top-1/3 -left-16 w-56 h-56 border-2 border-dashed border-yellow-400/10 rotate-12" />

        {/* Dotted circle */}
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-dotted border-white/5 rounded-full hidden lg:block" />

        {/* Small decorative elements */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-4 h-4 border-2 border-white/5 rotate-45" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/10 rounded-full" />

        {/* Plus signs */}
        <div className="absolute top-1/4 right-1/3 text-yellow-400/10 text-2xl font-light">
          +
        </div>
        <div className="absolute bottom-1/4 left-10 text-white/5 text-xl">
          +
        </div>

        {/* Diagonal lines */}
        <div className="absolute top-10 right-20 w-20 h-px bg-yellow-400/15 rotate-45" />
        <div className="absolute bottom-40 right-1/3 w-16 h-px bg-white/10 -rotate-45" />

        {/* Small square accents */}
        <div className="absolute top-40 left-10 w-5 h-5 border border-yellow-400/10 rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white/[0.03] -rotate-6" />

        {/* Large faint circle center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.02] rounded-full hidden lg:block" />

        {/* Top accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image with layers */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Layer 1 - Offset border */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border-2 border-white/10 hidden sm:block" />

              {/* Layer 2 - Dashed offset */}
              <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-full h-full border-2 border-dashed border-yellow-400/15 hidden md:block" />

              {/* Main Image Container */}
              <div className="relative aspect-[3/4] border-2 border-white/20 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1852389/pexels-photo-1852389.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fashion Design Student"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-8 sm:w-10 h-8 sm:h-10 border-l-2 border-t-2 border-yellow-400 z-10" />
                <div className="absolute bottom-3 right-3 w-8 sm:w-10 h-8 sm:h-10 border-r-2 border-b-2 border-yellow-400 z-10" />

                {/* Decorative dot on image */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-yellow-400 z-10" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white text-black px-4 py-2 sm:px-5 sm:py-3 shadow-xl shadow-black/20 z-20">
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-500 text-sm sm:text-base" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    Top Design Academy
                  </span>
                </div>
              </div>

              {/* Small decorative dot top-left */}
              <div className="absolute -top-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 z-10" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="max-w-xl order-1 lg:order-2">
            {/* Small Label */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Start Your Journey
              </span>
              <span className="h-px w-8 sm:w-12 bg-yellow-400/40"></span>
            </div>

            {/* Main Title - Brush Style */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Turn Your{" "}
              <span className="relative inline-block">
                <span
                  className="text-yellow-400 italic"
                  style={{
                    fontFamily:
                      "'Brush Script MT', 'Great Vibes', 'Dancing Script', cursive",
                    fontSize: "1.2em",
                  }}
                >
                  Passion
                </span>
                {/* Brush underline stroke */}
                <svg
                  className="absolute bottom-2 left-0 w-full h-3 sm:h-4 text-yellow-400/50"
                  viewBox="0 0 120 15"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q30,14 60,10 Q90,6 120,12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Into Profession
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/50 mb-6 sm:mb-8 leading-relaxed">
              Start Your Creative Journey Today with International Academy of
              Design. Learn from industry experts and turn your creative dreams
              into reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/enquiry"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-yellow-400 text-black font-semibold text-sm sm:text-base hover:bg-yellow-300 transition-all duration-300 overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enquiry Now
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"></span>
              </Link>

              <Link
                to="/admission"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                Apply for Admission
                <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bottom decorative */}
            <div className="flex items-center gap-2 mt-8 sm:mt-10">
              <span className="w-8 h-[2px] bg-yellow-400/40"></span>
              <span className="w-1.5 h-1.5 border border-white/20 rounded-full"></span>
              <span className="w-1 h-1 bg-white/10 rounded-full"></span>
              <span className="text-[10px] text-white/30">
                Limited Seats Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryBanner;
