import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../main";
import Loader from "../../components/Loader/Loader";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { BsGrid, BsList } from "react-icons/bs";

const fetchCourses = async () => {
  const { data } = await axios.get(`${baseUrl}/course/all-course`);
  return data.courses || [];
};

const OurPrograms = () => {
  // Add this inside your component
  const location = useLocation();

  useEffect(() => {
    // Check if URL has #programs hash
    if (location.hash === "#programs") {
      const element = document.getElementById("programs");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small delay to ensure DOM is ready
      }
    }
  }, [location]);

  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-courses"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white/60">Failed to load programs</p>
        </div>
      </div>
    );
  }

  const mainCourses = courses.filter((c) => c.courseType === "Main Course");
  const ugCourses = courses.filter((c) => c.courseType === "UG Course");
  const pgCourses = courses.filter((c) => c.courseType === "PG Course");

  const filteredCourses =
    activeTab === "all"
      ? [...mainCourses, ...ugCourses, ...pgCourses]
      : activeTab === "main"
        ? mainCourses
        : activeTab === "ug"
          ? ugCourses
          : pgCourses;

  const categories = [
    { id: "all", label: "All Programs", count: courses.length },
    { id: "main", label: "Core", count: mainCourses.length },
    { id: "ug", label: "Undergraduate", count: ugCourses.length },
    { id: "pg", label: "Postgraduate", count: pgCourses.length },
  ];

  return (
    <div className="bg-black py-24 px-4 sm:px-6 lg:px-8" id="programs">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-yellow-400/60 tracking-[0.3em] uppercase">
              Academics
            </span>
            <span className="h-px w-12 bg-yellow-400/30"></span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                Explore Our <span className="text-yellow-400">Programs</span>
              </h2>
            </div>
            <div className="flex items-center gap-1 border border-white/20 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-yellow-400 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <BsGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-yellow-400 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <BsList size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-5 py-2.5 text-sm transition-all duration-300 border ${
                activeTab === cat.id
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "text-white/60 hover:text-yellow-400 border-white/20 hover:border-yellow-400/50"
              }`}
            >
              {cat.label}
              <span className="ml-2 text-xs opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Programs Display */}
        {viewMode === "grid" ? (
          /* Grid View - Clean 4 Column */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses.map((item, index) => (
              <Link
                key={index}
                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                className="group"
              >
                <div className="relative bg-black border border-white/10 hover:border-yellow-400/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={
                        item.smCourseImage ||
                        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
                      }
                      alt={item.bannerTitle}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500" />

                    {/* Course Type Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black text-yellow-400 text-xs border border-yellow-400/30">
                      {item.courseType}
                    </span>

                    {/* Number */}
                    <span className="absolute top-3 right-3 text-yellow-400/30 text-xs font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-white font-medium text-lg leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {item.bannerTitle}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-white/40 text-xs">Full Time</span>
                      <FiArrowUpRight className="text-white/20 group-hover:text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-2">
            {filteredCourses.map((item, index) => (
              <Link
                key={index}
                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                className="group flex flex-col sm:flex-row border border-white/10 hover:border-yellow-400/30 transition-all duration-300 bg-black"
              >
                {/* Image */}
                <div className="sm:w-56 h-48 sm:h-40 overflow-hidden flex-shrink-0 border-b sm:border-b-0 sm:border-r border-white/10">
                  <img
                    src={
                      item.smCourseImage ||
                      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt={item.bannerTitle}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-yellow-400/60 text-xs uppercase tracking-wider">
                        {item.courseType}
                      </span>
                      <span className="text-white/10">|</span>
                      <span className="text-white/40 text-xs">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-medium group-hover:text-yellow-400 transition-colors">
                      {item.bannerTitle}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white/40 text-xs">Full Time</span>
                    <div className="flex items-center gap-2 text-white/20 group-hover:text-yellow-400 transition-colors">
                      <span className="text-xs">View Details</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              No programs found in this category.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-white/10">
          <Link
            to="/all-courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black text-sm font-medium hover:bg-yellow-300 transition-colors group"
          >
            View Complete Catalog
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default OurPrograms;
