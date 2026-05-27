import { useState } from "react";
import { baseUrl } from "../../main";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { Link, useParams } from "react-router-dom";
import useFullUrl from "../../utils/useFullUrl";
import SEO from "../../components/SEO/SEO";
import { toast } from "sonner";
import { FiArrowLeft, FiX, FiImage, FiGrid, FiZoomIn } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";

const fetchGallery = async (id) => {
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR");
  }
  const { data } = await axios.get(`${baseUrl}/gallery-folder/${id}`);
  return data.folder;
};

const fetchBanner = async () => {
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR");
  }
  const { data } = await axios.get(
    `${baseUrl}/banner/gallery-banner/67e772a7768539d1e12454a4`,
  );
  return data?.image;
};

const SingleGallery = () => {
  const fullUrl = useFullUrl();
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gallery", id],
    queryFn: () => fetchGallery(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const {
    data: bannerImg,
    isLoading: isBannerLoading,
    isError: isBannerError,
  } = useQuery({
    queryKey: ["folderBanner"],
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
      } else {
        console.error("❗ Server Error:", error.response?.status);
      }
    }
  }

  if (isLoading || isBannerLoading) return <Loader />;

  if (isError || isBannerError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h3 className="text-white text-xl mb-2">Failed to load gallery</h3>
          <p className="text-white/40">
            Try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );
  }

  const seoTitle = data?.folderTitle
    ? `${data.folderTitle} | Gallery | International Academy of Design`
    : "Gallery | International Academy of Design – Campus, Events & Student Life";

  const seoDescription = data?.folderTitle
    ? `Explore the vibrant "${data.folderTitle}" gallery at International Academy of Design. See photos of campus, student life, events, and creative projects.`
    : "Explore the vibrant life at International Academy of Design through our gallery. See photos from our campus, classrooms, creative events, student projects, and cultural celebrations.";

  const seoKeywords = data?.folderTitle
    ? `${data.folderTitle.toLowerCase()}, international academy of design, gallery, campus life, student events, design projects`
    : "international academy of design gallery, student events, campus photos, design institute gallery, creative work, classroom snapshots, design projects";

  const openModal = (imageUrl, index) => {
    setSelectedImg(imageUrl);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };

  const nextImage = () => {
    if (data?.galleryImages && currentIndex < data.galleryImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImg(data.galleryImages[currentIndex + 1].imageUrl);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImg(data.galleryImages[currentIndex - 1].imageUrl);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeModal();
  };

  // Stats data
  const statsData = [
    {
      icon: <FiImage />,
      label: "Total Photos",
      value: data?.galleryImages?.length || "0",
    },
    { icon: <FiGrid />, label: "Album", value: data?.folderTitle || "Gallery" },
  ];

  return (
    <div className="singleGallery bg-black">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={fullUrl}
      />

      {/* Banner Section - Consistent with other pages */}
      <div className="relative w-full h-[50vh] min-h-[500px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={
              bannerImg ||
              "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt={data?.folderTitle || "Gallery Banner"}
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
                {/* Back Button */}
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors mb-6 animate-fadeIn group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm uppercase tracking-wider">
                    Back to Gallery
                  </span>
                </Link>

                {/* Badge */}
                <div className="flex items-center gap-3 mb-6 animate-fadeIn">
                  <span className="px-4 py-1.5 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 text-xs font-medium uppercase tracking-wider">
                    Album
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.2] animate-fadeInUp">
                  {data?.folderTitle || "Gallery"}
                </h1>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-6 animate-fadeInUp animation-delay-400">
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

      {/* Gallery Grid Section - Pinterest Style Masonry */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
              <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
                Photo Gallery
              </span>
              <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Explore{" "}
              <span className="text-yellow-400 font-medium">Moments</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Browse through our collection of memorable moments captured at
              INAD
            </p>
          </div>

          {/* Pinterest Style Masonry Grid */}
          {data?.galleryImages && data.galleryImages.length > 0 ? (
            <>
              {/* Desktop: Multi-column Masonry */}
              <div className="hidden md:block columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {data.galleryImages.map((item, index) => {
                  // Random height classes for Pinterest style effect
                  const heightClasses = [
                    "mb-4 break-inside-avoid",
                    "mb-4 break-inside-avoid",
                    "mb-4 break-inside-avoid",
                  ];
                  const randomHeight =
                    heightClasses[
                      Math.floor(Math.random() * heightClasses.length)
                    ];

                  return (
                    <div
                      key={index}
                      className={`group relative overflow-hidden cursor-pointer ${randomHeight}`}
                      onClick={() => openModal(item.imageUrl, index)}
                    >
                      <div className="relative overflow-hidden bg-black/20">
                        <img
                          src={item.imageUrl}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-auto object-contain transition-all duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-10 h-10 border border-yellow-400/50 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                              <FiZoomIn className="text-yellow-400 text-xl" />
                            </div>
                            <span className="text-white/80 text-xs uppercase tracking-wider">
                              View
                            </span>
                          </div>
                        </div>

                        {/* Corner Elements */}
                        <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-yellow-400/60" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-yellow-400/60" />
                        </div>

                        {/* Image Number */}
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-white/70 text-[10px]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: Regular Grid with object-contain */}
              <div className="block md:hidden">
                <div className="grid grid-cols-2 gap-3">
                  {data.galleryImages.map((item, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden cursor-pointer"
                      onClick={() => openModal(item.imageUrl, index)}
                    >
                      <div className="relative overflow-hidden aspect-square bg-black/20">
                        <img
                          src={item.imageUrl}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 border border-yellow-400/50 flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">
                              <FiZoomIn className="text-yellow-400 text-sm" />
                            </div>
                            <span className="text-white/80 text-[10px] uppercase tracking-wider">
                              View
                            </span>
                          </div>
                        </div>

                        {/* Image Number */}
                        <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-white/70 text-[8px]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-6 border border-white/10">
                <FiImage className="text-yellow-400 text-4xl mx-auto mb-4" />
                <p className="text-white/40 text-lg">
                  No images found in this album.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/10 hover:bg-yellow-400 text-white hover:text-black transition-all duration-300 flex items-center justify-center z-10"
          >
            <FiX size={20} />
          </button>

          {/* Navigation Buttons */}
          {data?.galleryImages && data.galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 sm:left-6 w-10 h-10 bg-white/10 hover:bg-yellow-400 text-white hover:text-black transition-all duration-300 flex items-center justify-center z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 sm:right-6 w-10 h-10 bg-white/10 hover:bg-yellow-400 text-white hover:text-black transition-all duration-300 flex items-center justify-center z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-4 py-2 z-10">
            <span className="text-white/70 text-xs">
              {currentIndex + 1} / {data?.galleryImages?.length || 0}
            </span>
          </div>

          {/* Modal Image */}
          <img
            src={selectedImg}
            alt="Fullscreen Preview"
            className="max-w-full max-h-[90vh] object-contain animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
          />
        </div>
      )}

      {/* Bottom CTA Section */}
      <div className="relative bg-black py-16 sm:py-20 overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
              Join INAD
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Ready to Create Your Own{" "}
            <span className="text-yellow-400 font-medium">Memories?</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Start your journey at INAD and become part of our vibrant community.
            Limited seats available for the upcoming batch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admission"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300 group"
            >
              Apply for Admission
              <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              Contact Us
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
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default SingleGallery;
