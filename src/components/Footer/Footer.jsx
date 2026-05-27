import logo from "../../assets/images/titlelogo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const [footerOption1, setFooterOption1] = useState(false);
  const [footerOption2, setFooterOption2] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setFooterOption1(false);
    setFooterOption2(false);
  }, [location]);

  const [mainCourses, setMainCourses] = useState([]);
  const [ugCourses, setUgCourses] = useState([]);
  const [pgCourses, setPgCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/course/all-course`);
        const allCourses = data?.courses || [];
        setMainCourses(
          allCourses.filter((course) => course.courseType === "Main Course"),
        );
        setUgCourses(
          allCourses.filter((course) => course.courseType === "UG Course"),
        );
        setPgCourses(
          allCourses.filter((course) => course.courseType === "PG Course"),
        );
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const destinationLat = 27.6116717;
          const destinationLng = 75.1470817;
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
          window.open(mapsUrl, "_blank");
        },
        () => {
          toast.error("Please allow location access to get directions.");
        },
      );
    } else {
      toast.error("Geolocation not supported on this browser.");
    }
  };

  const [contactDetailData, setContactDetailData] = useState({});

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/contact-details/only`);
        if (data && data?.success) {
          setContactDetailData(data.contact);
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };
    fetchContactDetails();
  }, []);

  return (
    <footer className="relative bg-black pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large geometric shapes */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] border-[25px] border-white/[0.02] rotate-45" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-2 border-dashed border-yellow-400/5 -rotate-12 -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-32 h-32 border border-white/[0.03] rotate-[30deg] hidden lg:block" />

        {/* Vertical lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/3 to-transparent hidden sm:block" />
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent hidden sm:block" />

        {/* Small accents */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400/20 rounded-full" />
        <div className="absolute bottom-32 right-1/4 w-3 h-3 border border-white/5 rotate-45" />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-white/10 rounded-full" />

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/5">
          {/* Left - Logo & Contact */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center p-1">
                  <img
                    src={logo}
                    alt="INAD"
                    className="w-full h-full object-contain "
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    International Academy
                  </h3>
                  <p className="text-yellow-400 text-[10px] tracking-[0.2em] uppercase">
                    Of Design
                  </p>
                </div>
              </div>
            </Link>

            {/* Contact Items */}
            <div className="space-y-3">
              <a
                href={`tel:${contactDetailData.phoneNumber}`}
                className="flex items-center gap-3 text-white/50 hover:text-yellow-400 transition-colors group"
              >
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover:border-yellow-400/50 transition-colors">
                  <IoCallSharp className="text-sm" />
                </span>
                <span className="text-sm">
                  {contactDetailData.phoneNumber || "+91 70118 90082"}
                </span>
              </a>

              <div className="flex items-center gap-3 text-white/50">
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center">
                  <MdEmail className="text-sm" />
                </span>
                <span className="text-sm">
                  {contactDetailData.email || "info@inad.edu"}
                </span>
              </div>

              <div className="flex items-start gap-3 text-white/50">
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaLocationDot className="text-sm" />
                </span>
                <span className="text-sm leading-relaxed">
                  {contactDetailData.address || "Sikar, Rajasthan"}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={contactDetailData.facebookLink}
                target="_blank"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
              >
                <FaFacebook className="text-sm" />
              </a>
              <a
                href={contactDetailData.instagramLink}
                target="_blank"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
              >
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>

          {/* Center - Map */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-400" />
              Location
            </h3>
            <div className="relative border border-white/10 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.4146521451316!2d75.1470817!3d27.6116717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca55de1463785%3A0xfb9c65d2f6a4f15!2sNational%20Academy%20of%20Design!5e0!3m2!1sen!2sin!4v1743591625124!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <button
                onClick={handleGetDirections}
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-yellow-400 text-black text-xs font-medium hover:bg-yellow-300 transition-colors flex items-center gap-1"
              >
                Get Directions
                <FiArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Right - Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            {/* Courses Column */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400" />
                Courses
              </h3>
              <ul className="space-y-2">
                {mainCourses?.slice(0, 4).map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                      className="text-white/40 hover:text-yellow-400 text-xs transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-yellow-400/50 transition-all duration-300"></span>
                      {item.bannerTitle}
                    </Link>
                  </li>
                ))}
                {/* UG Dropdown */}
                <li>
                  <button
                    onClick={() => setFooterOption1(!footerOption1)}
                    className="text-white/40 hover:text-yellow-400 text-xs transition-colors flex items-center gap-1 w-full text-left"
                  >
                    <MdOutlineKeyboardArrowRight
                      className={`transition-transform ${footerOption1 ? "rotate-90" : ""}`}
                    />
                    UG Programs
                  </button>
                  {footerOption1 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {ugCourses?.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                            className="text-white/30 hover:text-yellow-400 text-xs transition-colors"
                          >
                            {item.bannerTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                {/* PG Dropdown */}
                <li>
                  <button
                    onClick={() => setFooterOption2(!footerOption2)}
                    className="text-white/40 hover:text-yellow-400 text-xs transition-colors flex items-center gap-1 w-full text-left"
                  >
                    <MdOutlineKeyboardArrowRight
                      className={`transition-transform ${footerOption2 ? "rotate-90" : ""}`}
                    />
                    PG Programs
                  </button>
                  {footerOption2 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {pgCourses?.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                            className="text-white/30 hover:text-yellow-400 text-xs transition-colors"
                          >
                            {item.bannerTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { to: "/", label: "Home" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/alumni", label: "Alumni" },
                  { to: "/enquiry", label: "Enquiry" },
                  { to: "/contact-us", label: "Contact Us" },
                  { to: "/student-corner", label: "Student Login" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/40 hover:text-yellow-400 text-xs transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-yellow-400/50 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            Copyright © {new Date().getFullYear()} International Academy of
            Design.
          </p>
          <p className="text-white/20 text-xs text-center sm:text-right">
            Designed & Developed by{" "}
            <a
              href="https://www.wingstarmarketing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
            >
              Star Marketing
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
