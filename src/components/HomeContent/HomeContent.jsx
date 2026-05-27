import { FiUsers, FiAward, FiMapPin, FiStar } from "react-icons/fi";

import aboutImage from "../../assets/images/mainImg/about1.webp";

const HomeContent = () => {
  return (
    <div className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Side - Multi-layer Abstract Design */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] max-w-md sm:max-w-lg mx-auto lg:mx-0">
              {/* Abstract Shape 1 - Large Circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-yellow-400/20 hidden sm:block" />

              {/* Abstract Shape 2 - Small Circle */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow-400/5 border border-yellow-400/20 hidden sm:block" />

              {/* Abstract Shape 3 - Diagonal Lines */}
              <div className="absolute top-1/2 -right-4 w-16 h-px bg-yellow-400/30 rotate-45 hidden sm:block" />
              <div className="absolute top-[55%] -right-6 w-12 h-px bg-yellow-400/20 rotate-45 hidden sm:block" />

              {/* Layer 2 - Offset Square with Pattern */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-[95%] h-[95%] border-2 border-black/10 hidden sm:block">
                {/* Inner cross pattern */}
                <div className="absolute top-0 left-1/2 w-px h-full bg-black/5 -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 w-full h-px bg-black/5 -translate-y-1/2" />
              </div>

              {/* Layer 3 - Dotted Border with corner accents */}
              <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-[90%] h-[90%] border-2 border-dashed border-yellow-400/30 hidden md:block">
                {/* Corner dots */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-yellow-400 rounded-full" />
              </div>

              {/* Main Image Container */}
              <div className="relative w-full h-full border-2 border-black overflow-hidden group">
                <img
                  src={aboutImage}
                  alt="Design Student"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Image Overlay Pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inner Accent Lines - Top Left */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <div className="relative w-12 sm:w-16 h-12 sm:h-16">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-yellow-400" />
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-yellow-400" />
                    {/* Dot at corner */}
                    <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  </div>
                </div>

                {/* Inner Accent Lines - Bottom Right */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                  <div className="relative w-12 sm:w-16 h-12 sm:h-16">
                    <div className="absolute bottom-0 right-0 w-full h-[2px] bg-yellow-400" />
                    <div className="absolute bottom-0 right-0 h-full w-[2px] bg-yellow-400" />
                    {/* Dot at corner */}
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-black text-white p-3 sm:p-4 md:p-6 shadow-xl z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border border-yellow-400/30 flex items-center justify-center">
                      <FiStar className="text-yellow-400 text-sm sm:text-base" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                      18+
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/60 whitespace-nowrap">
                      Years of Excellence
                    </div>
                  </div>
                </div>

                {/* Card corner accent */}
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-yellow-400" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-yellow-400" />
              </div>

              {/* Small Decorative Elements */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6 bg-yellow-400" />

              {/* Abstract Shape 4 - Plus signs */}
              <div className="absolute top-1/4 -left-3 text-yellow-400/30 text-lg hidden sm:block">
                +
              </div>
              <div className="absolute bottom-1/4 -right-2 text-yellow-400/20 text-sm hidden sm:block">
                +
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="max-w-xl order-1 lg:order-2">
            {/* Section Label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs text-black/40 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                About INAD
              </span>
              <span className="h-px w-8 sm:w-12 bg-yellow-400/30"></span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-black tracking-tight leading-tight mb-6 sm:mb-8">
              What gives <span className="font-bold">INAD</span>{" "}
              <span className="text-yellow-400">Rajasthan, India</span>
            </h2>

            {/* Feature List */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10">
              {/* Feature 1 */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 border border-black/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                  <FiAward className="text-sm sm:text-base text-black group-hover:text-black transition-colors" />
                </div>
                <div className="flex-1 border-b border-black/5 pb-3 sm:pb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                    Legacy of Over 18 Years of Excellence
                  </h3>
                  <p className="text-xs sm:text-sm text-black/50">
                    INAD has been shaping creative minds since 2006
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 border border-black/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                  <FiStar className="text-sm sm:text-base text-black group-hover:text-black transition-colors" />
                </div>
                <div className="flex-1 border-b border-black/5 pb-3 sm:pb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                    21+ Runway Shows & Pageants Showcased
                  </h3>
                  <p className="text-xs sm:text-sm text-black/50">
                    Providing real-world platform for our students
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 border border-black/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                  <FiMapPin className="text-sm sm:text-base text-black group-hover:text-black transition-colors" />
                </div>
                <div className="flex-1 border-b border-black/5 pb-3 sm:pb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                    Internationally Recognized Certification
                  </h3>
                  <p className="text-xs sm:text-sm text-black/50">
                    Global accreditation for your creative career
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 border border-black/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                  <FiUsers className="text-sm sm:text-base text-black group-hover:text-black transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                    10,000+ Successful Alumni Network
                  </h3>
                  <p className="text-xs sm:text-sm text-black/50">
                    Join a thriving community of creative professionals
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 border-t border-black/10">
              <div className="flex-1 min-w-[80px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                  17
                </div>
                <div className="text-[10px] sm:text-xs text-black/40 mt-1">
                  Years Legacy
                </div>
              </div>
              <div className="hidden sm:block w-px bg-black/10" />
              <div className="flex-1 min-w-[80px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                  10000+
                </div>
                <div className="text-[10px] sm:text-xs text-black/40 mt-1">
                  Students Alumni
                </div>
              </div>
              <div className="hidden sm:block w-px bg-black/10" />
              <div className="flex-1 min-w-[80px]">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs text-black/40 mt-1">
                  Placements
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
