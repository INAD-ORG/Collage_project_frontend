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
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#programs") {
      const element = document.getElementById("programs");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
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
    <div
      className="relative bg-black py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="programs"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large diagonal shape */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border-[30px] border-white/[0.02] rotate-45" />

        {/* Dashed square */}
        <div className="absolute top-1/3 -left-16 w-48 h-48 border-2 border-dashed border-yellow-400/10 rotate-12" />

        {/* Dotted circle */}
        <div className="absolute bottom-20 right-10 w-36 h-36 border-2 border-dotted border-white/5 -rotate-6 hidden lg:block" />

        {/* Small circles */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-4 h-4 border-2 border-white/5 rotate-45" />
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/10 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-yellow-400/15 rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-white/5 rounded-full" />

        {/* Plus signs */}
        <div className="absolute top-1/4 right-1/3 text-yellow-400/15 text-2xl font-light">
          +
        </div>
        <div className="absolute bottom-1/4 left-10 text-white/5 text-xl">
          +
        </div>
        <div className="absolute top-2/3 right-20 text-yellow-400/10 text-lg">
          +
        </div>
        <div className="absolute top-10 left-1/3 text-white/5 text-xl">+</div>

        {/* Diagonal lines */}
        <div className="absolute top-20 right-20 w-24 h-px bg-yellow-400/20 rotate-45" />
        <div className="absolute bottom-40 left-10 w-16 h-px bg-white/10 -rotate-45" />
        <div className="absolute top-1/2 right-1/4 w-20 h-px bg-yellow-400/10 rotate-12" />
        <div className="absolute bottom-1/3 left-1/3 w-12 h-px bg-white/5 -rotate-30" />

        {/* Small square accents */}
        <div className="absolute top-40 left-20 w-5 h-5 border border-yellow-400/10 rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white/[0.03] -rotate-6" />
        <div className="absolute top-2/3 left-1/4 w-4 h-4 border border-white/5 rotate-45" />

        {/* Large faint circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full hidden lg:block" />

        {/* Hexagon grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 15v22L30 52 0 37V15z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 52px",
            }}
          />
        </div>

        {/* Top and bottom gradient lines */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Additional abstract shapes */}
        <div className="absolute top-1/4 -right-10 w-32 h-32 border border-white/[0.01] rounded-full blur-xl" />
        <div className="absolute bottom-1/3 -left-20 w-40 h-40 bg-yellow-400/[0.01] rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
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
              <p className="text-white/40 mt-4 max-w-xl">
                Discover our wide range of design programs designed to shape
                your creative future
              </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses.map((item, index) => (
              <Link
                key={index}
                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                className="group"
              >
                <div className="relative bg-gradient-to-b from-black to-black/95 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={
                        item.smCourseImage ||
                        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
                      }
                      alt={item.bannerTitle}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Course Type Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-sm text-yellow-400 text-xs border border-yellow-400/30 z-10">
                      {item.courseType}
                    </span>

                    {/* Number */}
                    <span className="absolute top-3 right-3 text-yellow-400/30 text-xs font-mono z-10">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-yellow-400/60" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-yellow-400/60" />
                    </div>
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
          <div className="space-y-2">
            {filteredCourses.map((item, index) => (
              <Link
                key={index}
                to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                className="group flex flex-col sm:flex-row border border-white/10 hover:border-yellow-400/30 transition-all duration-300 bg-gradient-to-r from-black to-black/95"
              >
                {/* Image */}
                <div className="sm:w-56 h-48 sm:h-40 overflow-hidden flex-shrink-0 border-b sm:border-b-0 sm:border-r border-white/10">
                  <img
                    src={
                      item.smCourseImage ||
                      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt={item.bannerTitle}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
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
