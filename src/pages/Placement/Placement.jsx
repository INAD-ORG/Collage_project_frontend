
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaUserTie,
  FaBriefcase,
  FaTrophy,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiStar, FiAward } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useAlumnies, useAlumniBanner } from "../../services/hook";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/Error/ErrorFallback";
import SEO from "../../components/SEO/SEO";
import useFullUrl from "../../utils/useFullUrl";

const Placement = () => {
  const fullUrl = useFullUrl();
  const [expandedCard, setExpandedCard] = useState(null);

  // Using custom hooks
  const {
    data: alumni = [],
    isLoading: alumniLoading,
    isError: alumniError,
    refetch: refetchAlumni,
  } = useAlumnies();

  const {
    data: bannerData,
    isLoading: bannerLoading,
    isError: bannerError,
    refetch: refetchBanner,
  } = useAlumniBanner();

  // Show loader
  if (alumniLoading || bannerLoading) return <Loader />;

  // Show error with retry
  if (alumniError || bannerError) {
    const refetch = alumniError ? refetchAlumni : refetchBanner;
    return (
      <ErrorFallback
        message="Failed to load alumni data. Please try again."
        onRetry={refetch}
        fullScreen={true}
      />
    );
  }

  const bannerImg = bannerData?.image || bannerData;

  // Stats data
  const statsData = [
    {
      icon: <FaUsers />,
      label: "Alumni Network",
      value: alumni?.length || "5000+",
    },
    { icon: <FaTrophy />, label: "Placement Rate", value: "100%" },
    { icon: <FaBriefcase />, label: "Partner Companies", value: "200+" },
    { icon: <FiStar />, label: "Success Stories", value: "1000+" },
  ];

  return (
    <div className="placement bg-black">
      <SEO
        title="Alumni | International Academy of Design – Success Stories & Network"
        description="Discover the inspiring journeys of International Academy of Design alumni. Explore their career achievements, creative projects, and how our global network supports lifelong connections in the design industry."
        keywords="International Academy of Design alumni, design institute success stories, alumni network, design careers, creative professionals, alumni achievements, design industry connections"
        url={fullUrl}
      />

      {/* Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={
              bannerImg ||
              "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt="Alumni Banner"
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Banner Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-6 animate-fadeIn">
                  <span className="px-4 py-1.5 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 text-xs font-medium uppercase tracking-wider">
                    Our Pride
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fadeInUp">
                  Our <span className="text-yellow-400">Alumni</span>
                </h1>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-8 animate-fadeInUp animation-delay-400">
                  <div className="flex flex-wrap gap-6 max-[480px]:grid max-[480px]:grid-cols-2">
                    {statsData.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-yellow-400 text-xl">
                          {stat.icon}
                        </span>
                        <div>
                          <div className="text-white font-bold text-lg">
                            {stat.value}
                          </div>
                          <div className="text-white/40 text-xs">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Grid Section */}
      <div className="relative bg-black py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border-[30px] border-white/[0.02] rotate-45" />
          <div className="absolute top-1/3 -left-16 w-48 h-48 border-2 border-dashed border-yellow-400/10 rotate-12" />
          <div className="absolute bottom-20 right-10 w-36 h-36 border-2 border-dotted border-white/5 -rotate-6 hidden lg:block" />
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
          <div className="absolute bottom-32 right-1/3 w-4 h-4 border-2 border-white/5 rotate-45" />
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/10 rounded-full" />
          <div className="absolute top-1/4 right-1/4 text-yellow-400/15 text-2xl font-light">
            +
          </div>
          <div className="absolute bottom-1/4 left-1/3 text-white/5 text-xl">
            +
          </div>
          <div className="absolute top-10 right-20 w-20 h-px bg-yellow-400/20 rotate-45" />
          <div className="absolute bottom-40 left-10 w-16 h-px bg-white/10 -rotate-45" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Grid pattern overlay */}
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
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Success Stories
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Meet Our{" "}
              <span className="text-yellow-400 font-medium">Achievers</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Our alumni are placed at top companies worldwide, making their
              mark in the design industry
            </p>
          </div>

          {/* Alumni Grid */}
          {alumni && alumni.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {alumni.map((item, index) => (
                <div
                  key={item._id || index}
                  className="group relative bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden rounded-none"
                  onMouseEnter={() => setExpandedCard(item._id || index)}
                  onMouseLeave={() => setExpandedCard(null)}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-2 border border-white/0 group-hover:border-yellow-400/30 transition-all duration-500 z-10 pointer-events-none" />

                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-out"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      <div className="absolute top-0 left-0 w-12 h-12">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400/0 group-hover:border-yellow-400/60 transition-all duration-500" />
                        <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400/0 group-hover:bg-yellow-400/40 rounded-full transition-all duration-500" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400/0 group-hover:border-yellow-400/60 transition-all duration-500" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400/0 group-hover:bg-yellow-400/40 rounded-full transition-all duration-500" />
                      </div>

                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-yellow-400/50 to-transparent rotate-45 origin-top-right translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                      </div>

                      {/* Card Number Badge */}
                      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0">
                        <div className="bg-black/60 backdrop-blur-sm px-2 py-1">
                          <span className="text-yellow-400 text-[10px] font-mono font-bold">
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 relative">
                    <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-px bg-yellow-400/60 group-hover:w-6 transition-all duration-300" />
                      <span className="text-yellow-400/70 text-[10px] font-medium uppercase tracking-[0.2em] group-hover:text-yellow-400 transition-colors">
                        Alumni
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/20 to-transparent" />
                    </div>

                    <h3 className="text-white font-bold text-xl leading-tight mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {item.name}
                    </h3>

                    <div className="flex items-start gap-2 mb-2">
                      <FaUserTie className="text-yellow-400/60 text-xs mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                        {item.designation || "Design Professional"}
                      </p>
                    </div>

                    <div className="flex items-start gap-2 mb-2">
                      <FaBuilding className="text-yellow-400/60 text-xs mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                        {item.company || "Leading Company"}
                      </p>
                    </div>

                    <div className="flex items-start gap-2 mb-3">
                      <FaMapMarkerAlt className="text-yellow-400/60 text-xs mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                        {item.location || "Global"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                      <div className="w-1 h-1 bg-yellow-400/40 rounded-full" />
                      <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-white/20 text-[8px] uppercase tracking-wider">
                        Success Story
                      </span>
                      <div className="flex items-center gap-1">
                        <FiAward className="text-yellow-400/40 text-[10px]" />
                        <span className="text-yellow-400/40 text-[8px]">
                          Placed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-6 border border-white/10">
                <FaUsers className="text-yellow-400 text-4xl mx-auto mb-4" />
                <p className="text-white/40 text-lg">No alumni data found.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Why Our Alumni Section */}
      <div className="relative bg-black py-16 sm:py-20 border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Why Choose INAD
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
              What Makes Our{" "}
              <span className="text-yellow-400 font-medium">
                Alumni Successful
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FaBriefcase className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                100% Placement Support
              </h3>
              <p className="text-white/40 text-sm">
                Guaranteed placement assistance for all students
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FaTrophy className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Top Recruiters
              </h3>
              <p className="text-white/40 text-sm">
                Partnerships with 200+ leading companies
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FaUsers className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Global Network
              </h3>
              <p className="text-white/40 text-sm">
                Alumni working across 15+ countries worldwide
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiStar className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Industry Ready
              </h3>
              <p className="text-white/40 text-sm">
                Practical training with real-world projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative bg-black py-16 sm:py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
              Join INAD
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Become Our Next{" "}
            <span className="text-yellow-400 font-medium">Success Story</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Start your journey at INAD and join our growing family of successful
            alumni. Limited seats available for the upcoming batch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admission"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300 group"
            >
              Apply for Admission
              <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              Contact Us
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slow-zoom { animation: slowZoom 8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default Placement;