import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { states } from "../../assets/state";
import useFullUrl from "../../utils/useFullUrl";
import SEO from "../../components/SEO/SEO";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiBookOpen,
  FiMapPin,
  FiMessageSquare,
  FiSend,
  FiChevronDown,
  FiArrowRight,
  FiUsers,
  FiAward,
  FiStar,
} from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const fetchBanner = async () => {
  if (!navigator.onLine) throw new Error("NETWORK_ERROR");
  const { data } = await axios.get(
    `${baseUrl}/banner/enquiry-banner/67e7724fc95a30104036fdc4`,
  );
  return data;
};

const Enquiry = () => {
  const fullUrl = useFullUrl();
  const wordLimit = 100;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profile: "",
    selectCourse: "",
    selectState: "",
    district: "",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") {
      const words = value.split(/\s+/).filter((word) => word !== "");
      if (words.length > wordLimit) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phoneNumber,
      profile,
      selectCourse,
      selectState,
      district,
      city,
      message,
    } = formData;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !profile ||
      !selectCourse ||
      !selectState ||
      !district ||
      !city ||
      !message
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${baseUrl}/enquiry/new-enquiry`,
        formData,
      );
      if (data.result === 1) {
        toast.success("Enquiry submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          profile: "",
          selectCourse: "",
          selectState: "",
          district: "",
          city: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Admission submission error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["enquiry-banner"],
    queryFn: fetchBanner,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isError) {
    if (error.name === "AxiosError") {
      const isNetworkError =
        !error.response || error.message.includes("ECONNRESET");
      if (isNetworkError) {
        setTimeout(
          () => toast.error("🚫 Network error. Please check your connection."),
          100,
        );
      }
    }
  }

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h3 className="text-white text-xl mb-2">Failed to load page</h3>
          <p className="text-white/40">
            Try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );
  }

  const courses = [
    "B.Sc. Fashion Design",
    "B.Sc. Interior Design",
    "B.Arch",
    "B.Sc. Animation",
    "MBA Design Management",
    "M.Sc. Fashion Design",
    "M.Sc. Interior Design",
    "Diploma in Fashion Design",
    "Diploma in Interior Design",
    "Certificate in Graphic Design",
  ];

  const profiles = ["10+2", "Under Graduate", "Post Graduate", "Others"];

  const statsData = [
    { icon: <FiUsers />, label: "Students Enrolled", value: "5000+" },
    { icon: <FiAward />, label: "Expert Faculty", value: "50+" },
    { icon: <FiStar />, label: "Student Rating", value: "4.9" },
  ];

  return (
    <div className="admission bg-black">
      <SEO
        title="Admission | International Academy of Design – Apply Now for Design Courses"
        description="Apply for admission to International Academy of Design. Choose from our wide range of design courses including fashion, interior, architecture, and more. Start your creative journey today."
        keywords="admission International Academy of Design, design course admission, fashion design admission, interior design admission, architecture admission, apply for design courses"
        url={fullUrl}
      />

      {/* Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[550px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={
              data?.image ||
              "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt="Admission Banner"
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
                    Apply Now
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fadeInUp">
                  Admission <span className="text-yellow-400">Open</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-white/50 max-w-xl animate-fadeInUp animation-delay-200">
                  Start your creative journey with us. Limited seats available
                  for the upcoming batch. Apply now and shape your future in
                  design.
                </p>

                {/* Stats with Yellow Icons */}
                <div className="flex flex-wrap gap-8 mt-8 animate-fadeInUp animation-delay-400">
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

      {/* Admission Form Section */}
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Application Form
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Apply for{" "}
              <span className="text-yellow-400 font-medium">Admission</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Fill out the form below and our counselors will get in touch with
              you shortly
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden">
            <div className="relative bg-gradient-to-r from-yellow-400/10 via-transparent to-transparent p-5 border-b border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-yellow-400/60" />
                <span className="text-yellow-400/70 text-[10px] font-medium uppercase tracking-[0.2em]">
                  Fill Details
                </span>
              </div>
              <h3 className="text-white text-xl font-bold">
                Admission Enquiry
              </h3>
              <p className="text-white/40 text-xs mt-1">
                All fields are required
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiUser size={10} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiMail size={10} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiPhone size={10} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>

                {/* Qualification */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiBriefcase size={10} /> Qualification
                  </label>
                  <div className="relative">
                    <select
                      name="profile"
                      value={formData.profile}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">
                        Select Qualification
                      </option>
                      {profiles.map((item, index) => (
                        <option key={index} value={item} className="bg-black">
                          {item}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  </div>
                </div>

                {/* Course */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiBookOpen size={10} /> Select Course
                  </label>
                  <div className="relative">
                    <select
                      name="selectCourse"
                      value={formData.selectCourse}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">
                        Select Course
                      </option>
                      {courses.map((item, index) => (
                        <option key={index} value={item} className="bg-black">
                          {item}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  </div>
                </div>

                {/* State */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiMapPin size={10} /> State
                  </label>
                  <div className="relative">
                    <select
                      name="selectState"
                      value={formData.selectState}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">
                        Select State
                      </option>
                      {states
                        .sort((a, b) => a.state.localeCompare(b.state))
                        .map((item, index) => (
                          <option
                            key={index}
                            value={item.state}
                            className="bg-black"
                          >
                            {item.state}
                          </option>
                        ))}
                    </select>
                    <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  </div>
                </div>

                {/* District */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiMapPin size={10} /> District
                  </label>
                  <div className="relative">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      disabled={!formData.selectState}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="" className="bg-black">
                        Select District
                      </option>
                      {states
                        .find((item) => item.state === formData.selectState)
                        ?.districts.map((district, idx) => (
                          <option
                            key={idx}
                            value={district}
                            className="bg-black"
                          >
                            {district}
                          </option>
                        ))}
                    </select>
                    <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  </div>
                </div>

                {/* City */}
                <div className="group">
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FiMapPin size={10} /> City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors"
                    placeholder="Your City"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <FiMessageSquare size={10} /> Message (Max {wordLimit} words)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full bg-transparent border border-white/20 p-3 text-white text-sm focus:border-yellow-400 outline-none transition-colors resize-none"
                  placeholder="Tell us about your interest, questions, or any specific course you'd like to know more about..."
                />
              </div>

              {/* Word Count */}
              {formData.message && (
                <div className="text-right">
                  <span className="text-white/30 text-[10px]">
                    {
                      formData.message.split(/\s+/).filter((w) => w !== "")
                        .length
                    }{" "}
                    / {wordLimit} words
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 bg-yellow-400 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend size={14} /> Submit Admission Enquiry{" "}
                      <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700" />
              </button>
            </form>

            {/* Footer Note */}
            <div className="p-4 border-t border-white/10 text-center">
              <p className="text-white/20 text-[9px] uppercase tracking-wider">
                Our counselors will contact you within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative bg-black py-16 sm:py-20 overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
              Need Help?
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Have Questions?{" "}
            <span className="text-yellow-400 font-medium">Contact Us</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Call us directly or visit our campus for a personal tour. We're here
            to help you make the right decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300 group"
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
      `}</style>
    </div>
  );
};

export default Enquiry;
