import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { toast } from "sonner";
import { baseUrl } from "../../main";
import useFullUrl from "../../utils/useFullUrl";
import SEO from "../../components/SEO/SEO";
import {
  FiUsers,
  FiAward,
  FiStar,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

const fetchStaffs = async () => {
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR");
  }
  const { data } = await axios.get(`${baseUrl}/founder/all-founders`);
  return data.founders;
};

const fetchBanner = async () => {
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR");
  }
  const { data } = await axios.get(
    `${baseUrl}/banner/staff-banner/67e7723fc95a30104036fdc1`,
  );
  return data?.image;
};

const Mentor = () => {
  const fullUrl = useFullUrl();
  const [expandedCard, setExpandedCard] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaffs,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const {
    data: bannerImg,
    isLoading: isBannerLoading,
    isError: isBannerError,
  } = useQuery({
    queryKey: ["staffBanner"],
    queryFn: fetchBanner,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isError) {
    if (error.name === "AxiosError") {
      const isNetworkError =
        !error.response ||
        error.message.includes("ECONNRESET") ||
        error.response?.data?.message === "read ECONNRESET";

      if (isNetworkError) {
        setTimeout(() => {
          toast.error("🚫 Network error. Please check your connection.");
        }, 100);
      } else {
        console.error("❗ Server Error:", error.response?.status);
      }
    }
  }

  if (isLoading || isBannerLoading) return <Loader />;

  if (isError || isBannerError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h3 className="text-white text-xl mb-2">Failed to load data.</h3>
          <p className="text-white/40">
            Try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );
  }

  // Stats data
  const statsData = [
    {
      icon: <FiUsers />,
      label: "Expert Mentors",
      value: data?.length || "10+",
    },
    { icon: <FiAward />, label: "Years Combined Experience", value: "50+" },
    { icon: <FiStar />, label: "Student Satisfaction", value: "98%" },
  ];

  return (
    <div className="mentor bg-black">
      <SEO
        title="Meet Our Mentors | International Academy of Design – Learn from Industry Experts"
        description="Explore the mentors at International Academy of Design—seasoned professionals from fashion, interior, architecture, web development, and digital marketing guiding students with real-world expertise."
        keywords="design mentors, fashion design teachers, architecture faculty, interior design instructors, web development mentors, expert-led design education, IAD mentors"
        url={fullUrl}
      />

      {/* Banner Section - Consistent with HomeBanner */}
      <div className="relative w-full h-[60vh] min-h-[600px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={
              bannerImg ||
              "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt="Mentor Banner"
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
                    Our Mentors
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block"></span>
                </div>
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fadeInUp">
                  Meet Our <span className="text-yellow-400">Mentors</span>
                </h1>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 animate-fadeInUp animation-delay-400">
                  <Link
                    to="/admission"
                    className="group relative px-7 py-3.5 bg-yellow-400 text-black font-semibold text-sm flex items-center gap-2 hover:bg-yellow-300 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Admission Enquiry
                      <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"></span>
                  </Link>

                  <Link
                    to="/contact-us"
                    className="group relative px-7 py-3.5 border border-white/30 text-white font-medium text-sm flex items-center gap-2 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
                  >
                    Get in Touch
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Stats - Same as HomeBanner */}
                <div className="flex gap-8 mt-10 animate-fadeInUp animation-delay-600">
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

      {/* Mentors Grid Section */}
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
                Industry Experts
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Our{" "}
              <span className="text-yellow-400 font-medium">
                Expert Mentors
              </span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Meet the passionate educators and industry professionals who guide
              our students toward success
            </p>
          </div>

          {/* Mentors Grid - Clean Modern Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((item, index) => (
              <div
                key={item._id}
                className="group relative bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden rounded-none"
              >
                {/* Image Container with Unique Frame Effect */}
                <div className="relative overflow-hidden">
                  {/* Inner Border Frame */}
                  <div className="absolute inset-2 border border-white/0 group-hover:border-yellow-400/30 transition-all duration-500 z-10 pointer-events-none" />

                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Unique Diagonal Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                    {/* Bottom Gradient Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    {/* Unique Corner Elements - Abstract Design */}
                    <div className="absolute top-0 left-0 w-12 h-12">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400/0 group-hover:border-yellow-400/60 transition-all duration-500" />
                      <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400/0 group-hover:bg-yellow-400/40 rounded-full transition-all duration-500" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12">
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400/0 group-hover:border-yellow-400/60 transition-all duration-500" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400/0 group-hover:bg-yellow-400/40 rounded-full transition-all duration-500" />
                    </div>

                    {/* Unique Design Element - Diagonal Line */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-yellow-400/50 to-transparent rotate-45 origin-top-right translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

                {/* Content Area with Unique Typography */}
                <div className="p-5 relative">
                  {/* Animated Underline */}
                  <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Category Label with Unique Style */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-px bg-yellow-400/60 group-hover:w-6 transition-all duration-300" />
                    <span className="text-yellow-400/70 text-[10px] font-medium uppercase tracking-[0.2em] group-hover:text-yellow-400 transition-colors">
                      Mentor
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/20 to-transparent" />
                  </div>

                  {/* Name with Unique Hover Effect */}
                  <h3 className="text-white font-bold text-xl leading-tight mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Position with Decorative Element */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-[1px] bg-white/20 group-hover:bg-yellow-400/40 transition-colors duration-300" />
                    <p className="text-white/40 text-xs uppercase tracking-wider group-hover:text-white/60 transition-colors">
                      {item.position || "Industry Expert"}
                    </p>
                  </div>

                  {/* Unique Divider with Dot */}
                  <div className="flex items-center gap-2 mt-4 mb-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <div className="w-1 h-1 bg-yellow-400/40 rounded-full" />
                    <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {(!data || data.length === 0) && (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No mentors found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Why Our Mentors Section - Consistent with ChooseUs */}
      <div className="relative bg-black py-16 sm:py-20 border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Why Choose Us
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
              What Makes Our{" "}
              <span className="text-yellow-400 font-medium">
                Mentors Special
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiStar className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Industry Experts
              </h3>
              <p className="text-white/40 text-sm">
                10+ years of real-world experience in their fields
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiUsers className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Personal Mentorship
              </h3>
              <p className="text-white/40 text-sm">
                One-on-one guidance for every student
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiAward className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Global Recognition
              </h3>
              <p className="text-white/40 text-sm">
                Internationally acclaimed professionals
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiMapPin className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Industry Network
              </h3>
              <p className="text-white/40 text-sm">
                Strong connections with top design firms
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
            Learn from the{" "}
            <span className="text-yellow-400 font-medium">
              Best in Industry
            </span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Start your creative journey with expert mentors who are dedicated to
            your success. Limited seats available for the upcoming batch.
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
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Mentor;
