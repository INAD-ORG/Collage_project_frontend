import { Link } from "react-router-dom";
import {
  FiAward,
  FiUsers,
  FiStar,
  FiMapPin,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useAboutBanner, useAboutContent } from "../../services/hook";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/Error/ErrorFallback";
import SEO from "../../components/SEO/SEO";
import useFullUrl from "../../utils/useFullUrl";
import founder_img from "../../assets/images/founder.png";

const About = () => {
  const fullUrl = useFullUrl();

  // Using custom hooks
  const {
    data: bannerData,
    isLoading: bannerLoading,
    isError: bannerError,
    refetch: refetchBanner,
  } = useAboutBanner();

  const {
    data: aboutData = [],
    isLoading: aboutLoading,
    isError: aboutError,
    refetch: refetchAbout,
  } = useAboutContent();

  // Show loader
  if (bannerLoading || aboutLoading) return <Loader />;

  // Show error with retry
  if (bannerError || aboutError) {
    const refetch = bannerError ? refetchBanner : refetchAbout;
    return (
      <ErrorFallback
        message="Failed to load about data. Please try again."
        onRetry={refetch}
        fullScreen={true}
      />
    );
  }

  // Stats data
  const statsData = [
    { icon: <FiUsers />, label: "Students", value: "10000+" },
    { icon: <FiAward />, label: "Awards", value: "50+" },
    { icon: <FiStar />, label: "Rating", value: "4.9" },
  ];

  return (
    <div className="about bg-black">
      <SEO
        title="About Us | International Academy of Design – Empowering Creatives through Education"
        description="Discover the story and mission behind the International Academy of Design. Learn how we empower future designers through expert-led education in fashion, interior, architecture, and more."
        keywords="about international academy of design, design education India, fashion design institute, interior design college, architecture design school, creative learning, about IAD Sikar"
        url={fullUrl}
      />

      {/* Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={
              bannerData?.image ||
              "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt="about banner"
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
                    About INAD
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block"></span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fadeInUp">
                  About <span className="text-yellow-400">Us</span>
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

                {/* Stats */}
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

      {/* About Content Section */}
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
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
            {/* Left Side - Content Text */}
            <div className="order-2 lg:order-1">
              {/* Section Label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                  Our Story
                </span>
                <span className="h-px w-8 sm:w-12 bg-yellow-400/30"></span>
              </div>

              {/* Description paragraphs */}
              <div className="space-y-4">
                {aboutData?.slice(0, 2)?.map((item, index) => (
                  <p
                    key={index}
                    className="text-white/50 text-base leading-relaxed"
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* Mission/Vision Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="p-5 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group">
                  <div className="w-10 h-10 border border-yellow-400/30 flex items-center justify-center mb-3 group-hover:bg-yellow-400/10 transition-colors">
                    <FiStar className="text-yellow-400 text-lg" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Our Mission
                  </h3>
                  <p className="text-white/40 text-sm">
                    To empower creative minds with world-class design education
                    and industry exposure.
                  </p>
                </div>
                <div className="p-5 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group">
                  <div className="w-10 h-10 border border-yellow-400/30 flex items-center justify-center mb-3 group-hover:bg-yellow-400/10 transition-colors">
                    <FiAward className="text-yellow-400 text-lg" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Our Vision
                  </h3>
                  <p className="text-white/40 text-sm">
                    To become India's leading institution for creative and
                    design education.
                  </p>
                </div>
              </div>

              {/* Additional paragraphs */}
              {aboutData?.slice(2)?.map((item, index) => (
                <p
                  key={index + 2}
                  className="text-white/50 text-base leading-relaxed mt-4"
                >
                  {item}
                </p>
              ))}
            </div>

            {/* Right Side - Founder Card */}
            <div className="order-1 lg:order-2">
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Abstract shapes */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-dashed border-yellow-400/20 rotate-3" />
                <div className="absolute top-4 right-4 w-full h-full border border-white/5 -rotate-2" />

                {/* Main Founder Card */}
                <div className="relative bg-black border border-white/10 overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={founder_img}
                      alt="Founder"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-yellow-400/60 z-10" />
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-yellow-400/60 z-10" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-px bg-yellow-400"></span>
                      <span className="text-yellow-400 text-xs uppercase tracking-wider">
                        Founder
                      </span>
                    </div>
                    <h3 className="text-white text-2xl font-bold">
                      Sumit Kumar
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      Founder & Principal Director
                    </p>

                    {/* Social/Contact indicators */}
                    <div className="flex items-center gap-4 mt-4">
                      <Link
                        to="/contact-us"
                        className="flex items-center gap-2 text-xs text-white/40 hover:text-yellow-400 transition-colors"
                      >
                        Get in Touch <FiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black p-4 shadow-xl z-20">
                  <div className="text-center">
                    <div className="text-xl font-bold">18+</div>
                    <div className="text-[10px] text-black/60">
                      Years of Excellence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="relative bg-black py-16 sm:py-20 border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group">
              <div className="w-12 h-12 mx-auto border border-yellow-400/30 flex items-center justify-center mb-3 group-hover:bg-yellow-400/10 transition-colors">
                <FiUsers className="text-yellow-400 text-xl" />
              </div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                10000+
              </div>
              <div className="text-white/40 text-xs mt-1">Students</div>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group">
              <div className="w-12 h-12 mx-auto border border-yellow-400/30 flex items-center justify-center mb-3 group-hover:bg-yellow-400/10 transition-colors">
                <FiAward className="text-yellow-400 text-xl" />
              </div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                50+
              </div>
              <div className="text-white/40 text-xs mt-1">Awards</div>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group">
              <div className="w-12 h-12 mx-auto border border-yellow-400/30 flex items-center justify-center mb-3 group-hover:bg-yellow-400/10 transition-colors">
                <FiMapPin className="text-yellow-400 text-xl" />
              </div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                10000+
              </div>
              <div className="text-white/40 text-xs mt-1">Alumni Network</div>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group">
              <div className="w-12 h-12 mx-auto border border-yellow-400/30 flex items-center justify-center mb-3 group-hover:bg-yellow-400/10 transition-colors">
                <FiBriefcase className="text-yellow-400 text-xl" />
              </div>
              <div className="text-white text-2xl sm:text-3xl font-bold">
                100%
              </div>
              <div className="text-white/40 text-xs mt-1">
                Placement Assistance
              </div>
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
              Start Your Journey
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Ready to Begin Your{" "}
            <span className="text-yellow-400 font-medium">
              Creative Journey?
            </span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Join the International Academy of Design and transform your passion
            into a profession. Limited seats available for the upcoming batch.
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
      `}</style>
    </div>
  );
};

export default About;
