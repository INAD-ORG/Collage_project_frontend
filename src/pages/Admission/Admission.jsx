import { formCourse, states } from "../../assets/data";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import {
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiMapPin,
} from "react-icons/fi";

const fetchBanner = async () => {
  if (!navigator.onLine) throw new Error("NETWORK_ERROR");
  const { data } = await axios.get(
    `${baseUrl}/banner/admission-banner/67e77282768539d1e12454a1`,
  );
  return data;
};

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profile: "",
    selectCourse: "",
    selectState: "",
    district: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    } = formData;

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !profile ||
      !selectCourse ||
      !selectState ||
      !district ||
      !city
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${baseUrl}/admission/new-admission`,
        formData,
      );
      if (data.result === 1) {
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          profile: "",
          selectCourse: "",
          selectState: "",
          district: "",
          city: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admission-banner"],
    queryFn: fetchBanner,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isLoading) return <Loader />;

  // Demo banner image if API fails
  const bannerImage = isError
    ? "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
    : data?.image;

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={bannerImage}
          alt="Admission Banner"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Abstract shapes on banner */}
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-yellow-400/20 rotate-45" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 -rotate-12" />

        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg">
              <span className="inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 text-xs font-medium uppercase tracking-wider mb-4">
                Admissions Open 2024-25
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Start Your{" "}
                <span className="text-yellow-400">Creative Journey</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* College Name Bar */}
      <div className="bg-black py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-light text-white tracking-wider">
            International Academy of Design
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-6 h-px bg-yellow-400/50"></span>
            <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase">
              Sikar, Rajasthan
            </span>
            <span className="w-6 h-px bg-yellow-400/50"></span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 border border-black/[0.03] rotate-45 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border-2 border-dashed border-yellow-400/10 -rotate-12 -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-yellow-400/20 rounded-full" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-black/40 tracking-[0.3em] uppercase">
                Get Started
              </span>
              <span className="w-6 h-px bg-yellow-400/40"></span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-black">
              Admission{" "}
              <span className="text-yellow-400 font-medium">Form</span>
            </h3>
            <p className="text-sm text-black/40 mt-2">
              Fill in your details and we'll get back to you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                <FiUser size={16} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black placeholder:text-black/30 transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                <FiMail size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black placeholder:text-black/30 transition-all duration-300"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                <FiPhone size={16} />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black placeholder:text-black/30 transition-all duration-300"
              />
            </div>

            {/* Profile */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                <FiUser size={16} />
              </div>
              <select
                name="profile"
                value={formData.profile}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="">Select Profile</option>
                <option value="10+2">10+2</option>
                <option value="Under Graduate">Under Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/30">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Course */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                <FiBookOpen size={16} />
              </div>
              <select
                name="selectCourse"
                value={formData.selectCourse}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="">Select Course</option>
                {formCourse.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/30">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* State */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                <FiMapPin size={16} />
              </div>
              <select
                name="selectState"
                value={formData.selectState}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="">Select State</option>
                {states
                  .sort((a, b) => a.localeCompare(b))
                  .map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/30">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* District & City - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                placeholder="District"
                className="px-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black placeholder:text-black/30 transition-all duration-300"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="px-4 py-3.5 bg-white border border-black/10 focus:border-yellow-400 outline-none text-sm text-black placeholder:text-black/30 transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-yellow-400 text-black font-semibold text-sm uppercase tracking-wider hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Submit Application
                  <FiSend className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;
