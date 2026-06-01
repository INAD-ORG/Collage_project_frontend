import { Link } from "react-router-dom";
import { MdArrowForward, MdHome, MdSearch } from "react-icons/md";
import { FiAlertTriangle, FiArrowRight, FiHome } from "react-icons/fi";
import SEO from "../../components/SEO/SEO";
import useFullUrl from "../../utils/useFullUrl";

const NotFound = () => {
  const fullUrl = useFullUrl();

  return (
    <div className="not-found bg-black min-h-screen flex items-center justify-center pt-20 sm:pt-24">
      <SEO
        title="404 - Page Not Found | International Academy of Design"
        description="Oops! The page you're looking for doesn't exist. Explore our courses, gallery, or contact us to start your creative journey at International Academy of Design."
        keywords="404 page not found, IAD error page, page missing, design institute, international academy of design"
        url={fullUrl}
      />

      {/* Abstract Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
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

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-6 sm:mb-8 animate-fadeInUp">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] font-bold text-white leading-none tracking-tighter">
            4
            <span className="text-yellow-400 relative inline-block animate-float">
              0
              <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
            </span>
            4
          </h1>

          {/* Decorative elements around 404 */}
          <div className="absolute -top-8 left-1/4 w-10 h-10 border border-yellow-400/20 rotate-45 hidden lg:block" />
          <div className="absolute -bottom-8 right-1/4 w-6 h-6 border-2 border-yellow-400/20 rotate-12 hidden lg:block" />
        </div>

        {/* Badge */}
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 animate-fadeIn">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
            Page Not Found
          </span>
          <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 animate-fadeInUp animation-delay-200">
          Oops!{" "}
          <span className="text-yellow-400 font-medium">Lost Your Way?</span>
        </h2>

        {/* Description */}
        <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-lg mx-auto mb-6 sm:mb-8 px-2 animate-fadeInUp animation-delay-400">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track to explore your creative journey with us.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 animate-fadeInUp animation-delay-600">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300"
          >
            <MdHome className="text-lg" />
            Back to Home
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/#programs"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-semibold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Explore Programs
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 mt-2 sm:mt-4">
          <h3 className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6">
            You might be looking for
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { to: "/admission", label: "Admission" },
              { to: "/gallery", label: "Gallery" },
              { to: "/alumni", label: "Alumni" },
              { to: "/contact-us", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/60 border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-6 sm:mt-8 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 text-white/30 text-[10px] sm:text-xs">
            <MdSearch className="text-sm" />
            <span>Need help? </span>
            <Link
              to="/contact-us"
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Contact Support
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default NotFound;
