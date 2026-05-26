import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import { states } from "../../assets/state";
import { FiSend, FiUser, FiMail, FiPhone, FiBriefcase, FiBookOpen, FiMapPin, FiMessageSquare, FiChevronDown } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";

const Enquiry = () => {
  const wordLimit = 100;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phoneNumber: "", profile: "", selectCourse: "",
    selectState: "", district: "", city: "", message: "",
  });

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
    const { name, email, phoneNumber, profile, selectCourse, selectState, district, city, message } = formData;
    if (!name || !email || !phoneNumber || !profile || !selectCourse || !selectState || !district || !city || !message) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/enquiry/new-enquiry`, formData);
      if (data.result === 1) {
        toast.success(data.message);
        setFormData({ name: "", email: "", phoneNumber: "", profile: "", selectCourse: "", selectState: "", district: "", city: "", message: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const courses = [
    "B.Sc. Fashion Design", "B.Sc. Interior Design", "B.Arch", "B.Sc. Animation",
    "MBA Design Management", "M.Sc. Fashion Design", "M.Sc. Interior Design",
    "Diploma in Fashion Design", "Diploma in Interior Design", "Certificate in Graphic Design"
  ];

  const profiles = ["10+2", "Under Graduate", "Post Graduate", "Others"];

  return (
    <div className="bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-yellow-400/10 via-transparent to-transparent p-5 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-px bg-yellow-400/60" />
          <span className="text-yellow-400/70 text-[10px] font-medium uppercase tracking-[0.2em]">Apply Now</span>
        </div>
        <h3 className="text-white text-xl font-bold">Request Information</h3>
        <p className="text-white/40 text-xs mt-1">Fill the form to get course details</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
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

        {/* Profile / Qualification */}
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
              <option value="" className="bg-black">Select Qualification</option>
              {profiles.map((item, index) => (
                <option key={index} value={item} className="bg-black">{item}</option>
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
              <option value="" className="bg-black">Select Course</option>
              {courses.map((item, index) => (
                <option key={index} value={item} className="bg-black">{item}</option>
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
              <option value="" className="bg-black">Select State</option>
              {states.sort((a, b) => a.state.localeCompare(b.state)).map((item, index) => (
                <option key={index} value={item.state} className="bg-black">{item.state}</option>
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
              <option value="" className="bg-black">Select District</option>
              {states.find((item) => item.state === formData.selectState)?.districts.map((district, idx) => (
                <option key={idx} value={district} className="bg-black">{district}</option>
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

        {/* Message */}
        <div className="group">
          <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
            <FiMessageSquare size={10} /> Message (Max {wordLimit} words)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            required
            className="w-full bg-transparent border border-white/20 p-2 text-white text-sm focus:border-yellow-400 outline-none transition-colors resize-none"
            placeholder="Tell us about your interest..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full py-3 bg-yellow-400 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Sending...</>
            ) : (
              <><FiSend size={14} /> Submit Enquiry <MdArrowForward className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700" />
        </button>
      </form>

      {/* Footer Note */}
      <div className="p-4 border-t border-white/10 text-center">
        <p className="text-white/20 text-[9px] uppercase tracking-wider">We'll get back to you within 24 hours</p>
      </div>
    </div>
  );
};

export default Enquiry;