import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";

const fetchMentors = async () => {
  if (!navigator.onLine) throw new Error("NETWORK_ERROR");
  const { data } = await axios.get(`${baseUrl}/founder/all-founders`);
  return data.founders || [];
};

const fetchStaffs = async () => {
  if (!navigator.onLine) throw new Error("NETWORK_ERROR");
  const { data } = await axios.get(`${baseUrl}/staff/all-staffs`);
  return data.staff || [];
};

const Mentors = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { data: mentors, isLoading: mLoad, isError: mErr } = useQuery({
    queryKey: ["mentors"],
    queryFn: fetchMentors,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const { data: staffs, isLoading: sLoad, isError: sErr } = useQuery({
    queryKey: ["staffs"],
    queryFn: fetchStaffs,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (mErr || sErr) {
    const error = mErr || sErr;
    if (error?.name === "AxiosError") {
      const isNetworkError = !error.response || error.message.includes("ECONNRESET");
      if (isNetworkError) {
        setTimeout(() => toast.error("Network error. Please check your connection."), 100);
      }
    }
  }

  if (mLoad || sLoad) return <Loader />;

  const dMentors = (mentors || []).map(m => ({ ...m, type: "mentor" }));
  const dStaffs = (staffs || []).map(s => ({ ...s, type: "staff" }));
  
  const allMembers = [...dMentors, ...dStaffs];
  const filteredMembers = activeTab === "all" 
    ? allMembers 
    : activeTab === "mentor" 
      ? dMentors 
      : dStaffs;

  const tabs = [
    { id: "all", label: "All", count: allMembers.length },
    { id: "mentor", label: "Mentors", count: dMentors.length },
    { id: "staff", label: "Staff", count: dStaffs.length },
  ];

  const getBadgeColor = (type) => {
    if (type === "mentor") return "bg-yellow-400 text-black";
    return "bg-white/10 text-white/80 border border-white/20";
  };

  if (!allMembers.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-black">
        <p className="text-white/40">No team members found</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black py-16 sm:py-20 lg:py-24 overflow-hidden">
      
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden sm:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent hidden sm:block" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden sm:block" />
        
        <div className="absolute top-20 right-10 w-64 h-64 border border-white/[0.03] rotate-45" />
        <div className="absolute bottom-20 left-10 w-48 h-48 border-2 border-dashed border-yellow-400/10 -rotate-12" />
        
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">Our Team</span>
            <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/20 to-transparent hidden sm:block"></span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Mentors <span className="text-white/20 font-light">&</span>{" "}
              <span className="text-yellow-400 font-medium">Staff</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/30 max-w-xs">
              Meet the experts and team behind our success
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-xs sm:text-sm transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "text-white/50 hover:text-white border-white/10 hover:border-white/30"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 opacity-50">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Members Swiper */}
        <div className="relative mentors-container">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={4}
            slidesPerView={2}
            loop={filteredMembers.length > 3}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={5000}
            allowTouchMove={true}
            navigation={{
              nextEl: ".mentors-nav-next",
              prevEl: ".mentors-nav-prev",
            }}
            breakpoints={{
              480: { slidesPerView: 2.5, spaceBetween: 6 },
              640: { slidesPerView: 3, spaceBetween: 8 },
              768: { slidesPerView: 4, spaceBetween: 10 },
              1024: { slidesPerView: 5, spaceBetween: 12 },
            }}
            className="mentors-swiper"
          >
            {(filteredMembers.length > 3 ? [...filteredMembers, ...filteredMembers] : filteredMembers).map((member, index) => (
              <SwiperSlide key={`${member._id || member.id || index}-${index}`}>
                <div className="group relative cursor-pointer">
                  
                  <div className="relative overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${getBadgeColor(member.type)}`}>
                          {member.type}
                        </span>
                      </div>
                      
                      {/* Corner Triangle */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-r-[25px] border-t-yellow-400/0 group-hover:border-t-yellow-400/80 border-r-yellow-400/0 group-hover:border-r-yellow-400/80 transition-all duration-500 z-10" />
                    </div>
                    
                    {/* Content - Name always visible, Position on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                      <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">
                        {member.name}
                      </h3>
                      
                      {/* Position - Appears on hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-10 transition-all duration-500">
                        <div className="w-6  bg-yellow-400 mt-2 mb-1"></div>
                        <p className="text-yellow-400 text-[10px] sm:text-xs uppercase tracking-wider">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .mentors-swiper .swiper-pagination,
        .mentors-swiper .swiper-button-next,
        .mentors-swiper .swiper-button-prev {
          display: none !important;
        }
        
        .mentors-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
};

export default Mentors;