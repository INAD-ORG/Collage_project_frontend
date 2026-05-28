import { toast } from "sonner";
import { baseUrl } from "../../main";
import axios from "axios";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { student_banners } from "../../assets/data";
import {
  FiDownload,
  FiAward,
  FiUsers,
  FiStar,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import useFullUrl from "../../utils/useFullUrl";
import SEO from "../../components/SEO/SEO";

const Student = () => {
  const fullUrl = useFullUrl();
  const [enrollmentId, setEnrollmentId] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const getCertificate = async (e) => {
    e.preventDefault();

    if (!enrollmentId.trim()) {
      toast.error("Please enter a valid Enrollment ID");
      return;
    }

    setLoading(true);
    setCertificateUrl("");

    try {
      const { data } = await axios.get(
        `${baseUrl}/certificate/${enrollmentId}`,
        { responseType: "blob" },
      );

      const imageUrl = URL.createObjectURL(data);
      setCertificateUrl(imageUrl);
      toast.success("Certificate loaded successfully!");
    } catch (error) {
      console.error("Failed to get certificate:", error);

      try {
        const blob = error.response?.data;
        if (blob instanceof Blob && blob.type === "application/json") {
          const text = await blob.text();
          const json = JSON.parse(text);
          toast.error(json.message || "Something went wrong.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closePreview = () => {
    setCertificateUrl("");
  };

  const statsData = [
    { icon: <FiUsers />, label: "Students Certified", value: "5000+" },
    { icon: <FiAward />, label: "Certificates Issued", value: "10000+" },
    { icon: <FiStar />, label: "Success Rate", value: "99%" },
  ];

  return (
    <div className="student-corner bg-black">
      <SEO
        title="Student Corner | International Academy of Design – Certificates & Resources"
        description="Access your certificates and student resources at International Academy of Design. Download your achievement certificates and explore student support materials."
        keywords="student corner IAD, download certificate, student resources, IAD certificate, enrollment ID, student support"
        url={fullUrl}
      />

      {/* Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop={true}
          speed={1200}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {student_banners.map((item, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div className="relative w-full h-full bg-black">
                <img
                  src={item.img}
                  alt="Student Corner Banner"
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
                          Student Corner
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                      </div>

                      {/* Title */}
                      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fadeInUp">
                        Student <span className="text-yellow-400">Corner</span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Certificate Form Section */}
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
                Download Certificate
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Get Your{" "}
              <span className="text-yellow-400 font-medium">Certificate</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Enter your Enrollment ID to download your achievement certificate
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden">
            <div className="relative bg-gradient-to-r from-yellow-400/10 via-transparent to-transparent p-5 border-b border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-yellow-400/60" />
                <span className="text-yellow-400/70 text-[10px] font-medium uppercase tracking-[0.2em]">
                  Certificate Access
                </span>
              </div>
              <h3 className="text-white text-xl font-bold">
                Download Certificate
              </h3>
              <p className="text-white/40 text-xs mt-1">
                Enter your Enrollment ID to proceed
              </p>
            </div>

            <form onSubmit={getCertificate} className="p-6 space-y-6">
              <div className="group">
                <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">
                  Enrollment ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your Enrollment ID"
                  value={enrollmentId}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-yellow-400 outline-none transition-colors placeholder:text-white/20"
                />
                <p className="text-white/20 text-[9px] mt-1">
                  Example: IAD2024001
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 bg-yellow-400 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />{" "}
                      Loading...
                    </>
                  ) : (
                    <>
                      <FiDownload size={14} /> Get Certificate{" "}
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
                Enter the Enrollment ID provided at the time of admission
              </p>
            </div>
          </div>

          {/* Certificate Preview Modal */}
          {certificateUrl && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 mt-0 top-0 left-0 right-0 bottom-0">
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/10 hover:bg-yellow-400 text-white hover:text-black transition-all duration-300 flex items-center justify-center z-10 rounded-full"
              >
                <FiX size={20} />
              </button>

              <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto animate-fadeInUp">
                <img
                  src={certificateUrl}
                  alt="Certificate"
                  className="w-full h-auto border border-white/20 shadow-2xl"
                  loading="lazy"
                />
                <div className="flex justify-center mt-4">
                  <a
                    href={certificateUrl}
                    download="certificate.jpg"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300"
                  >
                    <FiDownload size={14} /> Download Certificate
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="relative bg-black py-16 sm:py-20 border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Need Help?
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
              Having Trouble{" "}
              <span className="text-yellow-400 font-medium">
                Accessing Your Certificate?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiCheckCircle className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Valid Enrollment ID
              </h3>
              <p className="text-white/40 text-sm">
                Make sure you're entering the correct Enrollment ID provided
                during admission
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiAward className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Certificate Validity
              </h3>
              <p className="text-white/40 text-sm">
                All certificates are digitally verified and can be downloaded
                anytime
              </p>
            </div>
            <div className="p-6 border border-white/10 hover:border-yellow-400/40 transition-all duration-500 group text-center sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 mx-auto border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:bg-yellow-400/10 transition-colors">
                <FiUsers className="text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Need Assistance?
              </h3>
              <p className="text-white/40 text-sm">
                Contact our support team for help with certificate access
              </p>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 mt-3 text-yellow-400 text-sm hover:text-yellow-300 transition-colors"
              >
                Contact Support <MdArrowForward size={14} />
              </Link>
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
              Not a Student Yet?
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Start Your{" "}
            <span className="text-yellow-400 font-medium">Journey With Us</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Join INAD and become part of our success story. Limited seats
            available for the upcoming batch.
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
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slow-zoom { animation: slowZoom 8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default Student;
