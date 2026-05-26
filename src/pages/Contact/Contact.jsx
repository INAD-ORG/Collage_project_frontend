import { MdOutlineLocationOn, MdOutlineEmail, MdPhone, MdArrowForward } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FiMapPin, FiMail, FiPhone, FiSend, FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { baseUrl } from "../../main";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import useFullUrl from "../../utils/useFullUrl";
import SEO from "../../components/SEO/SEO";
import { Link } from "react-router-dom";

const fetchBanner = async () => {
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR");
  }
  const { data } = await axios.get(
    `${baseUrl}/banner/contact-banner/67e772d0768539d1e12454a7`
  );
  return data;
};

const Contact = () => {
  const fullUrl = useFullUrl();
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
        toast.error(error.response?.data?.message || "Failed to load contact details");
      }
    };
    fetchContactDetails();
  }, []);

  const wordLimit = 150;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      const words = value.split(/\s+/).filter((word) => word !== "");
      if (words.length > wordLimit) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phoneNumber, message } = formData;

    if (!name || !email || !phoneNumber || !message) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/contact/new-contact`, formData);
      if (data.result === 1) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("contact error:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contact-banner"],
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
      }
    }
  }

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h3 className="text-white text-xl mb-2">Failed to load contact banner</h3>
          <p className="text-white/40">Try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }

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
        }
      );
    } else {
      toast.error("Geolocation not supported on this browser.");
    }
  };

  // Stats data
  const statsData = [
    { label: "Happy Students", value: "5000+" },
    { label: "Years Experience", value: "18+" },
    { label: "Expert Faculty", value: "50+" },
  ];

  return (
    <div className="contact bg-black">
      <SEO
        title="Contact Us | International Academy of Design – Reach Out for Admissions & Support"
        description="Contact International Academy of Design for admissions inquiries, course information, campus visits, and student support. We're here to help you shape your creative future."
        keywords="International Academy of Design contact, admissions support, design institute contact info, campus visit, student help, design course inquiries"
        url={fullUrl}
      />

      {/* Banner Section - Consistent with other pages */}
      <div className="relative w-full h-[50vh] min-h-[500px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={data?.image || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"}
            alt="Contact Banner"
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
                    Get in Touch
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fadeInUp">
                  Contact <span className="text-yellow-400">Us</span>
                </h1>

               

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-8 animate-fadeInUp animation-delay-400">
                  {statsData.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div>
                        <div className="text-white font-bold text-lg">{stat.value}</div>
                        <div className="text-white/40 text-xs">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Content Section */}
      <div className="relative bg-black py-16 sm:py-20 lg:py-28 overflow-hidden">
        
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border-[30px] border-white/[0.02] rotate-45" />
          <div className="absolute top-1/3 -left-16 w-48 h-48 border-2 border-dashed border-yellow-400/10 rotate-12" />
          <div className="absolute bottom-20 right-10 w-36 h-36 border-2 border-dotted border-white/5 -rotate-6 hidden lg:block" />
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
          <div className="absolute bottom-32 right-1/3 w-4 h-4 border-2 border-white/5 rotate-45" />
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/10 rounded-full" />
          <div className="absolute top-1/4 right-1/4 text-yellow-400/15 text-2xl font-light">+</div>
          <div className="absolute bottom-1/4 left-1/3 text-white/5 text-xl">+</div>
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
                Let's Connect
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Get In <span className="text-yellow-400 font-medium">Touch</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Grid - 2 Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Side - Contact Information */}
            <div className="space-y-6">
              {/* Contact Info Cards */}
              <div className="border border-white/10 p-6 hover:border-yellow-400/40 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 border border-yellow-400/30 flex items-center justify-center group-hover:bg-yellow-400/10 transition-colors">
                    <MdOutlineEmail className="text-yellow-400 text-xl" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">Email Us</h3>
                </div>
                <a href={`mailto:${contactDetailData.email}`} className="text-white/50 text-sm hover:text-yellow-400 transition-colors block">
                  {contactDetailData.email || "info@inad.ac.in"}
                </a>
              </div>

              <div className="border border-white/10 p-6 hover:border-yellow-400/40 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 border border-yellow-400/30 flex items-center justify-center group-hover:bg-yellow-400/10 transition-colors">
                    <LuPhoneCall className="text-yellow-400 text-xl" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">Call Us</h3>
                </div>
                <a href={`tel:${contactDetailData.phoneNumber}`} className="text-white/50 text-sm hover:text-yellow-400 transition-colors block">
                  {contactDetailData.phoneNumber || "+91-XXXXXXXXXX"}
                </a>
              </div>

              <div className="border border-white/10 p-6 hover:border-yellow-400/40 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 border border-yellow-400/30 flex items-center justify-center group-hover:bg-yellow-400/10 transition-colors">
                    <MdOutlineLocationOn className="text-yellow-400 text-xl" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">Visit Us</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {contactDetailData.address || "International Academy of Design, Sikar, Rajasthan"}
                </p>
              </div>

              {/* Social Links */}
              <div className="border border-white/10 p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href={contactDetailData.facebookLink} target="_blank" rel="noopener noreferrer" 
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 group">
                    <FaFacebookSquare className="text-white/60 group-hover:text-yellow-400 text-lg" />
                  </a>
                  <a href={contactDetailData.instagramLink} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 group">
                    <RiInstagramFill className="text-white/60 group-hover:text-yellow-400 text-lg" />
                  </a>
                  <a href={contactDetailData.twitterLink} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 group">
                    <FaTwitter className="text-white/60 group-hover:text-yellow-400 text-lg" />
                  </a>
                  <a href={contactDetailData.linkedinLink} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 group">
                    <FaLinkedin className="text-white/60 group-hover:text-yellow-400 text-lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-yellow-400/40" />
                <span className="text-yellow-400/70 text-[10px] font-medium uppercase tracking-[0.2em]">
                  Send Message
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/20 to-transparent" />
              </div>

              <h3 className="text-white text-2xl font-light mb-6">
                Let's Start a <span className="text-yellow-400 font-medium">Conversation</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-yellow-400 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-yellow-400 outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-yellow-400 outline-none transition-colors"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                    Message (Max {wordLimit} words)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-yellow-400 outline-none transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-4 bg-yellow-400 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative bg-black py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Find Us
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white">
              Our <span className="text-yellow-400 font-medium">Location</span>
            </h2>
          </div>

          {/* Map Container */}
          <div className="relative border border-white/10 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.4146521451316!2d75.1470817!3d27.6116717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca55de1463785%3A0xfb9c65d2f6a4f15!2sNational%20Academy%20of%20Design!5e0!3m2!1sen!2sin!4v1743591625124!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="INAD Location Map"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

          {/* Get Directions Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleGetDirections}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white/30 text-white font-semibold text-sm hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 group"
            >
              Get Directions
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative bg-black py-16 sm:py-20 overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
              Ready to Start?
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Begin Your{" "}
            <span className="text-yellow-400 font-medium">Creative Journey</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Take the first step towards a successful career in design. Limited seats available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admission"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300 group"
            >
              Apply for Admission
              <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slow-zoom { animation: slowZoom 8s ease-out forwards; }
        .animate-spin { animation: spin 1s linear infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default Contact;