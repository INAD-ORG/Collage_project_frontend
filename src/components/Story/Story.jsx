import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { FiBriefcase, FiBookOpen } from "react-icons/fi";
import { useState } from "react";
import { stories } from "../../assets/homepageData";

const Story = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const maxLength = 120;

  const toggleReadMore = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Abstract Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal shape */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] border-[40px] border-black/[0.02] rotate-45" />

        {/* Medium rotated square */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 border-2 border-dashed border-yellow-400/10 rotate-12" />

        {/* Small circles */}
        <div className="absolute top-20 right-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-4 h-4 border-2 border-black/5 rounded-full" />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-black/10 rounded-full" />

        {/* Cross/Plus shapes */}
        <div className="absolute top-1/3 right-1/3 text-yellow-400/15 text-2xl font-light">
          +
        </div>
        <div className="absolute bottom-1/4 left-10 text-black/5 text-xl">
          +
        </div>

        {/* Diagonal lines */}
        <div className="absolute top-20 left-20 w-24 h-px bg-yellow-400/20 rotate-45" />
        <div className="absolute bottom-40 right-16 w-16 h-px bg-black/10 -rotate-45" />

        {/* Dotted rectangle */}
        <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-dotted border-black/5 rotate-6 hidden lg:block" />

        {/* Large faint circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/[0.03] rounded-full hidden lg:block" />

        {/* Small decorative squares */}
        <div className="absolute top-40 left-1/2 w-5 h-5 border border-yellow-400/10 rotate-45" />
        <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-black/[0.03] rotate-12" />

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-black/40 tracking-[0.3em] uppercase">
              Testimonials
            </span>
            <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black tracking-tight">
            Success <span className="text-yellow-400 font-medium">Stories</span>
          </h2>
        </div>

        {/* Main Story Card */}
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".story-nav-next",
              prevEl: ".story-nav-prev",
            }}
            loop={true}
            speed={600}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="story-main-swiper"
          >
            {stories.map((story) => {
              const isExpanded = expandedCards[story.id];
              const isLong = story.desc.length > maxLength;

              return (
                <SwiperSlide key={story.id}>
                  <div className="flex flex-col md:flex-row gap-0 shadow-2xl shadow-black/5">
                    {/* Image Side */}
                    <div className="md:w-2/5 relative overflow-hidden">
                      <div className="aspect-[4/5] md:aspect-[3/4] relative overflow-hidden">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/80" />

                        {/* Corner accent on image */}
                        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-yellow-400/60 z-10" />
                        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-yellow-400/60 z-10" />

                        {/* Mobile: Name on image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                          <h3 className="text-xl font-bold text-white">
                            {story.name}
                          </h3>
                          <p className="text-white/60 text-xs mt-1">
                            {story.course}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-3/5 bg-white text-black p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center border border-black/5 border-l-0">
                      {/* Name - Desktop */}
                      <div className="hidden md:block mb-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-black">
                          {story.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-6 h-px bg-yellow-400"></span>
                          <span className="text-sm text-black/50">
                            {story.course}
                          </span>
                        </div>
                      </div>

                      {/* Info Tags */}
                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/5 text-black/70 text-xs">
                          <FiBriefcase size={11} />
                          {story.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/10 text-black/60 text-xs">
                          <FiBookOpen size={11} />
                          Batch {story.year}
                        </span>
                      </div>

                      {/* Vision */}
                      <div className="mb-4 md:mb-6 p-3 sm:p-4 bg-yellow-400/5 border-l-2 border-yellow-400">
                        <p className="text-xs text-black/40 uppercase tracking-wider mb-1">
                          Vision
                        </p>
                        <p className="text-sm md:text-base text-black/70 italic">
                          "{story.vision}"
                        </p>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-sm md:text-base text-black/50 leading-relaxed">
                          {isLong && !isExpanded
                            ? `${story.desc.substring(0, maxLength)}...`
                            : story.desc}
                        </p>
                        {isLong && (
                          <button
                            onClick={() => toggleReadMore(story.id)}
                            className="mt-2 text-xs font-medium text-yellow-600 hover:text-yellow-700 transition-colors flex items-center gap-1"
                          >
                            {isExpanded ? "Show Less" : "Read Full Story"}
                            <span
                              className={`transition-transform text-[10px] ${isExpanded ? "rotate-180" : ""}`}
                            >
                              ▼
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between mt-3 sm:mt-4">
            {/* Progress Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const swiper =
                      document.querySelector(".story-main-swiper")?.swiper;
                    swiper?.slideToLoop(index);
                  }}
                  className={`transition-all duration-300 ${
                    index === activeIndex
                      ? "w-6 sm:w-8 h-[2px] bg-yellow-400"
                      : "w-3 sm:w-4 h-[2px] bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button className="story-nav-prev w-8 h-8 sm:w-10 sm:h-10 border border-black/10 hover:bg-black text-black hover:text-white transition-all duration-300 flex items-center justify-center group">
                <MdArrowBack className="text-sm sm:text-base group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button className="story-nav-next w-8 h-8 sm:w-10 sm:h-10 border border-black/10 hover:bg-yellow-400 text-black hover:border-yellow-400 transition-all duration-300 flex items-center justify-center group">
                <MdArrowForward className="text-sm sm:text-base group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .story-main-swiper .swiper-pagination,
        .story-main-swiper .swiper-button-next,
        .story-main-swiper .swiper-button-prev {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Story;
