import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowDown, MdClose, MdMenu } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { RiHome2Line } from "react-icons/ri";
import { aboutOption } from "../../assets/data";
import logo from "../../assets/images/titlelogo.png";
import { useCourses } from "../../services/hook";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Using custom hook
  const { data: courses = [] } = useCourses();

  // Filter courses
  const mainCourses = courses.filter((course) => course.courseType === "Main Course");
  const ugCourses = courses.filter((course) => course.courseType === "UG Course");
  const pgCourses = courses.filter((course) => course.courseType === "PG Course");

  // Refs for dropdowns to detect clicks outside
  const aboutDropdownRef = useRef(null);
  const programsDropdownRef = useRef(null);

  const location = useLocation();

  // Handle scroll for navbar visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }

      setScrolling(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close all dropdowns and mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdown(false);
    setServiceDropdown(false);

    const openDetails = document.querySelectorAll(
      ".mobile-menu-container details[open]",
    );
    openDetails.forEach((details) => {
      details.removeAttribute("open");
    });
  }, [location]);

  // Reset details elements when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      const openDetails = document.querySelectorAll(
        ".mobile-menu-container details[open]",
      );
      openDetails.forEach((details) => {
        details.removeAttribute("open");
      });
    }
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
      if (
        programsDropdownRef.current &&
        !programsDropdownRef.current.contains(event.target)
      ) {
        setServiceDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          navbarVisible ? "translate-y-0" : "-translate-y-full"
        } ${scrolling ? "py-2" : "py-1"}`}
      >
        {/* Floating Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              scrolling
                ? "h-16 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-4"
                : "h-20 bg-transparent px-2"
            }`}
          >
            {/* Logo Area */}
            <Link
              to="/"
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div
                className={`relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 border overflow-hidden group-hover:scale-105 transition-all duration-300 ${
                  scrolling
                    ? "border-gray-200 bg-gray-50"
                    : "border-white/30 bg-white/10"
                }`}
              >
                <img
                  src={logo}
                  alt="IAD"
                  className={`w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-500`}
                  loading="lazy"
                />
              </div>
              <div className="hidden sm:flex flex-col justify-center">
                <h1
                  className={`font-semibold text-[15px] lg:text-[17px] tracking-tight leading-none transition-colors duration-500 ${
                    scrolling ? "text-gray-900" : "text-white"
                  }`}
                >
                  International Academy
                </h1>
                <p
                  className={`text-[9px] lg:text-[10px] font-medium tracking-[0.25em] uppercase mt-1 transition-colors duration-500 ${
                    scrolling ? "text-gray-500" : "text-gray-300"
                  }`}
                >
                  Of Design
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                to="/"
                className={`flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium transition-all duration-500 ${
                  scrolling
                    ? isActive("/")
                      ? "text-black bg-gray-100"
                      : "text-gray-700 hover:text-black hover:bg-gray-50"
                    : isActive("/")
                      ? "text-yellow-400 bg-white/10"
                      : "text-white hover:text-white/80 hover:bg-white/10"
                }`}
              >
                <RiHome2Line className="text-[16px] mb-[2px]" /> Home
              </Link>

              {/* About Dropdown */}
              <div
                ref={aboutDropdownRef}
                className="relative"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <div className="py-2 cursor-pointer">
                  <span
                    className={`flex items-center gap-1 px-4 py-2 text-[14px] font-medium transition-all duration-500 ${
                      scrolling
                        ? dropdown || isActive("/about")
                          ? "text-black bg-gray-100"
                          : "text-gray-700 hover:text-black hover:bg-gray-50"
                        : dropdown || isActive("/about")
                          ? "text-yellow-400 bg-white/10"
                          : "text-white hover:text-white/80 hover:bg-white/10"
                    }`}
                  >
                    About{" "}
                    <MdOutlineKeyboardArrowDown
                      className={`text-lg transition-transform duration-300 ${dropdown ? "rotate-180" : ""} ${
                        scrolling ? "text-gray-400" : "text-white/70"
                      }`}
                    />
                  </span>
                </div>

                {dropdown && (
                  <div className="absolute top-[100%] left-0 w-60 pt-2 animate-pop-in">
                    <div className="bg-white backdrop-blur-2xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-2">
                      {aboutOption.map((item, index) => (
                        <Link
                          key={index}
                          to={`/${item.link}`}
                          onClick={() => setDropdown(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all duration-200 group ${
                            isActive(`/${item.link}`)
                              ? "bg-gray-100 text-black"
                              : "text-gray-700 hover:bg-gray-50 hover:text-black"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 transition-colors ${
                              isActive(`/${item.link}`)
                                ? "bg-yellow-400"
                                : "bg-gray-300 group-hover:bg-yellow-400"
                            }`}
                          ></div>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Programs Mega Menu */}
              <div
                ref={programsDropdownRef}
                className="relative"
                onMouseEnter={() => setServiceDropdown(true)}
                onMouseLeave={() => setServiceDropdown(false)}
              >
                <div className="py-2 cursor-pointer">
                  <span
                    className={`flex items-center gap-1 px-4 py-2 text-[14px] font-medium transition-all duration-500 ${
                      scrolling
                        ? serviceDropdown
                          ? "text-black bg-gray-100"
                          : "text-gray-700 hover:text-black hover:bg-gray-50"
                        : serviceDropdown
                          ? "text-yellow-400 bg-white/10"
                          : "text-white hover:text-white/80 hover:bg-white/10"
                    }`}
                  >
                    Programs{" "}
                    <MdOutlineKeyboardArrowDown
                      className={`text-lg transition-transform duration-300 ${serviceDropdown ? "rotate-180" : ""} ${
                        scrolling ? "text-gray-400" : "text-white/70"
                      }`}
                    />
                  </span>
                </div>

                {serviceDropdown && (
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[850px] pt-2 animate-pop-in">
                    <div className="bg-white backdrop-blur-3xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-2">
                      <div className="grid grid-cols-3 gap-2 p-2">
                        {/* Core Programs */}
                        <div className="bg-gray-50 p-5 border border-gray-100">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-yellow-400/10 flex items-center justify-center text-yellow-600">
                              ✧
                            </div>
                            <h3 className="text-black font-semibold text-[13px]">
                              Core Programs
                            </h3>
                          </div>
                          <div className="space-y-1">
                            {mainCourses?.map((item, index) => (
                              <Link
                                key={index}
                                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                                onClick={() => setServiceDropdown(false)}
                                className="block px-3 py-2 text-[13px] text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200"
                              >
                                {item.bannerTitle}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Under Graduate */}
                        <div className="bg-gray-50 p-5 border border-gray-100">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-yellow-400/10 flex items-center justify-center text-yellow-600">
                              ✦
                            </div>
                            <h3 className="text-black font-semibold text-[13px]">
                              Undergraduate
                            </h3>
                          </div>
                          <div className="space-y-1">
                            {ugCourses?.map((item, index) => (
                              <Link
                                key={index}
                                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                                onClick={() => setServiceDropdown(false)}
                                className="block px-3 py-2 text-[13px] text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200"
                              >
                                {item.bannerTitle}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Post Graduate */}
                        <div className="bg-gray-50 p-5 border border-gray-100">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-yellow-400/10 flex items-center justify-center text-yellow-600">
                              ⟡
                            </div>
                            <h3 className="text-black font-semibold text-[13px]">
                              Postgraduate
                            </h3>
                          </div>
                          <div className="space-y-1">
                            {pgCourses?.map((item, index) => (
                              <Link
                                key={index}
                                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                                onClick={() => setServiceDropdown(false)}
                                className="block px-3 py-2 text-[13px] text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200"
                              >
                                {item.bannerTitle}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-1 p-2">
                        <Link
                          to="/#programs"
                          onClick={() => setServiceDropdown(false)}
                          className="flex items-center justify-center gap-2 w-full py-3 text-[13px] font-medium text-black bg-gray-100 hover:bg-yellow-400/10 hover:text-yellow-600 transition-colors"
                        >
                          Explore All Programs{" "}
                          <span className="text-lg leading-none">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links */}
              {[
                { to: "/gallery", label: "Gallery" },
                { to: "/alumni", label: "Alumni" },
                { to: "/contact-us", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-[14px] font-medium transition-all duration-500 ${
                    scrolling
                      ? isActive(link.to)
                        ? "text-black bg-gray-100"
                        : "text-gray-700 hover:text-black hover:bg-gray-50"
                      : isActive(link.to)
                        ? "text-yellow-400 bg-white/10"
                        : "text-white hover:text-white/80 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side - Apply Button (Desktop) */}
            <div className="hidden lg:block ml-2">
              <Link
                to="/admission"
                className={`px-6 py-2.5 text-[14px] font-semibold transition-all duration-500 hover:scale-105 block ${
                  scrolling
                    ? "text-white bg-black hover:bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                    : "text-black bg-yellow-400 hover:bg-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                }`}
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Right Side - Apply Now + Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/admission"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 text-[12px] font-semibold transition-all duration-500 whitespace-nowrap ${
                  scrolling
                    ? "text-white bg-black hover:bg-gray-900"
                    : "text-black bg-yellow-400 hover:bg-yellow-300"
                }`}
              >
                Apply Now
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 border transition-colors ${
                  scrolling
                    ? "text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200"
                    : "text-white bg-white/10 border-white/30 hover:bg-white/20"
                }`}
              >
                {mobileMenuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden absolute w-full px-4 mt-2 mobile-menu-container ${
            mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white backdrop-blur-3xl border border-gray-200 p-3 shadow-2xl flex flex-col gap-1 overflow-y-auto max-h-[75vh]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium text-black hover:bg-gray-100 transition-colors"
            >
              <RiHome2Line className="text-xl text-gray-500" /> Home
            </Link>

            {/* Mobile About */}
            <details className="group px-1">
              <summary className="flex items-center justify-between px-3 py-3.5 text-[15px] font-medium text-black hover:bg-gray-100 cursor-pointer list-none transition-colors">
                About{" "}
                <MdOutlineKeyboardArrowDown className="text-xl text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="flex flex-col gap-1 pl-4 pr-2 pb-2 mt-1">
                {aboutOption.map((item, index) => (
                  <Link
                    key={index}
                    to={`/${item.link}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-[14px] text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>

            {/* Mobile Programs */}
            <details className="group px-1">
              <summary className="flex items-center justify-between px-3 py-3.5 text-[15px] font-medium text-black hover:bg-gray-100 cursor-pointer list-none transition-colors">
                Programs{" "}
                <MdOutlineKeyboardArrowDown className="text-xl text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="flex flex-col gap-3 pl-4 pr-2 pb-3 mt-2">
                <div>
                  <h4 className="text-[11px] font-bold text-yellow-600 uppercase tracking-widest px-4 mb-1">
                    Core
                  </h4>
                  {mainCourses?.map((item, index) => (
                    <Link
                      key={index}
                      to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-[14px] text-gray-700 hover:text-black hover:bg-gray-50"
                    >
                      {item.bannerTitle}
                    </Link>
                  ))}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-yellow-600 uppercase tracking-widest px-4 mb-1">
                    Undergrad
                  </h4>
                  {ugCourses?.map((item, index) => (
                    <Link
                      key={index}
                      to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-[14px] text-gray-700 hover:text-black hover:bg-gray-50"
                    >
                      {item.bannerTitle}
                    </Link>
                  ))}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-yellow-600 uppercase tracking-widest px-4 mb-1">
                    Postgrad
                  </h4>
                  {pgCourses?.map((item, index) => (
                    <Link
                      key={index}
                      to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-[14px] text-gray-700 hover:text-black hover:bg-gray-50"
                    >
                      {item.bannerTitle}
                    </Link>
                  ))}
                </div>
              </div>
            </details>

            {["Gallery", "Alumni", "Contact"].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase() === "contact" ? "contact-us" : label.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3.5 text-[15px] font-medium text-black hover:bg-gray-100 transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="pt-2 pb-1 px-2 mt-2 border-t border-gray-200">
              <Link
                to="/admission"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-6 py-3.5 text-[15px] font-semibold text-black bg-yellow-400 hover:bg-yellow-300 transition-all shadow-lg"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .animate-pop-in {
          animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top center;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default Navbar;