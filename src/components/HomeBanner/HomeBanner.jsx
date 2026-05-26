import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { FiStar, FiAward, FiUsers } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchBanner = async () => {
  if (!navigator.onLine) throw new Error("NETWORK_ERROR");
  const { data } = await axios.get(`${baseUrl}/banner/home-banner/67e771c7f86def3cbf7ba1fd`);
  return data;
};

const fallbackBanners = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "International Academy of Design",
    subtitle: "Where creativity meets excellence in design education",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "World-Class Creative Education",
    subtitle: "Empowering the next generation of innovative designers",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Inspire Through Design",
    subtitle: "Building future-ready designers and creative leaders",
  },
];

const HomeBanner = () => {
  const [imgError, setImgError] = useState({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["home-banner"],
    queryFn: fetchBanner,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isError) {
    console.log("Error:", error);
    if (error.name === "AxiosError") {
      const isNetworkError = !error.response || error.message.includes("ECONNRESET");
      if (isNetworkError) {
        setTimeout(() => toast.error("Network error. Please check your connection."), 100);
      }
    }
  }

  if (isLoading) return <Loader />;

  const handleImageError = (bannerId) => {
    setImgError((prev) => ({ ...prev, [bannerId]: true }));
  };

  const placeholderImage = "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920";

  const statsData = [
    { icon: <FiUsers />, label: "Students", value: "5000+" },
    { icon: <FiAward />, label: "Awards", value: "50+" },
    { icon: <FiStar />, label: "Rating", value: "4.9" },
  ];

  const renderSlide = (banner, bannerId) => (
    <SwiperSlide key={bannerId}>
      <div className="relative w-full h-full bg-black">
        <img
          src={imgError[bannerId] ? placeholderImage : (banner.image || placeholderImage)}
          alt={banner.title || "Banner"}
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          onError={() => handleImageError(bannerId)}
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="max-w-xl">
                {/* Badge - Yellow accent */}
                <div className="flex items-center gap-3 mb-6 animate-fadeIn">
                  <span className="px-4 py-1.5 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 text-xs font-medium uppercase tracking-wider">
                    Admissions Open {new Date().getFullYear()}-{String(new Date().getFullYear() + 1).slice(-2)}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block"></span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] animate-fadeInUp">
                  {banner.title || "International Academy of Design"}
                </h1>

             

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-10 animate-fadeInUp animation-delay-400">
                  <Link
                    to="/admission"
                    className="group relative px-7 py-3.5 bg-white text-black font-semibold text-sm flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Apply Now
                      <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"></span>
                  </Link>

                  <Link
                    to="/all-courses"
                    className="group relative px-7 py-3.5 border border-white/30 text-white font-medium text-sm flex items-center gap-2 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
                  >
                    All Programs
                    <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Stats - Yellow icons */}
                <div className="flex gap-8 animate-fadeInUp animation-delay-600">
                  {statsData.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-yellow-400 text-xl">{stat.icon}</span>
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
    </SwiperSlide>
  );

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".custom-swiper-button-next", prevEl: ".custom-swiper-button-prev" }}
        loop={true}
        speed={1200}
        className="w-full h-full"
      >
        {isError || !data?.banners?.length
          ? fallbackBanners.map((banner) => renderSlide(banner, banner.id))
          : data?.banners?.map((banner, index) => renderSlide(banner, banner._id || index))
        }
      </Swiper>

      {/* Navigation Buttons - Yellow on hover */}
      <button className="custom-swiper-button-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 flex items-center justify-center group">
        <MdArrowBack className="text-xl group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button className="custom-swiper-button-next absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 flex items-center justify-center group">
        <MdArrowForward className="text-xl group-hover:translate-x-0.5 transition-transform" />
      </button>

      <style>{`
        .swiper-pagination {
          bottom: 40px !important;
          left: 40px !important;
          width: auto !important;
        }
        .swiper-pagination-bullet {
          width: 24px !important;
          height: 2px !important;
          border-radius: 1px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          width: 40px !important;
          background: #FACC15 !important;
        }
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slow-zoom { animation: slowZoom 8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spinSlow 20s linear infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default HomeBanner;