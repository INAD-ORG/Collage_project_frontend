// pages/SingleCourse.jsx
import { useParams, Link } from "react-router-dom";
import {
  FiCheck,
  FiArrowLeft,
  FiBookOpen,
  FiBriefcase,
  FiList,
  FiTarget,
  FiAward,
} from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useCourse } from "../../services/hook";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/Error/ErrorFallback";
import SEO from "../../components/SEO/SEO";
import useFullUrl from "../../utils/useFullUrl";
import Enquiry from "../../components/Sidebar/Sidebar";

const SingleCourse = () => {
  const fullUrl = useFullUrl();
  const { id } = useParams();

  // Using custom hook
  const {
    data: course,
    isLoading,
    isError,
    refetch,
  } = useCourse(id);

  // Show loader
  if (isLoading) return <Loader />;

  // Show error with retry
  if (isError) {
    return (
      <ErrorFallback
        message="Failed to load course details. Please try again."
        onRetry={refetch}
        fullScreen={true}
      />
    );
  }

  const {
    bannerImage,
    bannerTitle,
    courseDescription,
    courseListDesc,
    courseListTitle,
    courseLists,
    courseTitle,
    courseOfCoursesTitle,
    courseOfCoursesLists,
    topicTitle,
    topicLists,
    careerTitle,
    careerLists,
    overviewTitle,
    overviewDesc,
  } = course || {};

  const seoTitle = courseTitle
    ? `${courseTitle} | International Academy of Design`
    : "International Academy of Design | Premier Design & Professional Education in India";
  const seoDescription = courseDescription
    ? courseDescription.length > 150
      ? courseDescription.substring(0, 147) + "..."
      : courseDescription
    : "International Academy of Design offers premier courses in fashion, interior, architecture, graphic design, and more.";

  const keywordsSet = new Set();
  if (courseTitle) keywordsSet.add(courseTitle.toLowerCase());
  if (topicLists)
    topicLists.forEach((t) => t.item && keywordsSet.add(t.item.toLowerCase()));
  if (careerLists)
    careerLists.forEach((c) => c.item && keywordsSet.add(c.item.toLowerCase()));
  ["design courses india", "professional education", "IAD Sikar"].forEach(
    (kw) => keywordsSet.add(kw),
  );
  const seoKeywords = Array.from(keywordsSet).join(", ");

  const sections = [
    {
      title: courseTitle,
      content: courseDescription,
      icon: <FiBookOpen />,
      type: "desc",
    },
    {
      title: courseOfCoursesTitle,
      items: courseOfCoursesLists?.filter((i) => i.item?.trim()),
      icon: <FiList />,
      type: "list",
    },
    {
      title: topicTitle,
      items: topicLists?.filter((i) => i.item?.trim()),
      icon: <FiTarget />,
      type: "list",
    },
    {
      title: careerTitle,
      items: careerLists?.filter((i) => i.item?.trim()),
      icon: <FiBriefcase />,
      type: "list",
    },
    {
      title: courseListTitle,
      desc: courseListDesc,
      items: courseLists?.filter((i) => i.title?.trim()),
      icon: <FiAward />,
      type: "nested-list",
    },
    {
      title: overviewTitle,
      content: overviewDesc,
      icon: <FiBookOpen />,
      type: "desc",
    },
  ];

  return (
    <div className="single-course bg-black">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={fullUrl}
      />

      {/* Banner Section */}
      <div className="relative w-full h-[50vh] min-h-[500px] overflow-hidden">
        <div className="relative w-full h-full bg-black">
          <img
            src={
              bannerImage ||
              "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt={bannerTitle}
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6 animate-fadeIn">
                  <span className="px-4 py-1.5 bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 text-xs font-medium uppercase tracking-wider">
                    Course Details
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.2] animate-fadeInUp">
                  {bannerTitle || courseTitle}
                </h1>

                <div className="flex items-center gap-3 mb-8 animate-fadeIn">
                  <Link
                    to="/#programs"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors group"
                  >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-wider">
                      Back to Courses
                    </span>
                  </Link>
                  <span className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent hidden sm:block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
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
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Side - Course Content */}
            <div className="lg:col-span-2 space-y-8">
              {sections.map((section, idx) => {
                if (section.type === "desc" && section.content) {
                  return (
                    <div
                      key={idx}
                      className="border-l-2 border-yellow-400/30 pl-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 border border-yellow-400/30 flex items-center justify-center">
                          <span className="text-yellow-400 text-sm">
                            {section.icon}
                          </span>
                        </div>
                        <h2 className="text-white text-xl sm:text-2xl font-light">
                          {section.title}
                        </h2>
                      </div>
                      <p className="text-white/50 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  );
                }

                if (section.type === "list" && section.items?.length) {
                  return (
                    <div
                      key={idx}
                      className="border-l-2 border-yellow-400/30 pl-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 border border-yellow-400/30 flex items-center justify-center">
                          <span className="text-yellow-400 text-sm">
                            {section.icon}
                          </span>
                        </div>
                        <h2 className="text-white text-xl sm:text-2xl font-light">
                          {section.title}
                        </h2>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <FiCheck className="text-yellow-400 text-sm mt-0.5 flex-shrink-0" />
                            <span className="text-white/60 text-sm">
                              {item.item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (section.type === "nested-list" && section.items?.length) {
                  return (
                    <div
                      key={idx}
                      className="border-l-2 border-yellow-400/30 pl-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 border border-yellow-400/30 flex items-center justify-center">
                          <span className="text-yellow-400 text-sm">
                            {section.icon}
                          </span>
                        </div>
                        <h2 className="text-white text-xl sm:text-2xl font-light">
                          {section.title}
                        </h2>
                      </div>
                      {section.desc && (
                        <p className="text-white/50 text-sm mb-4">
                          {section.desc}
                        </p>
                      )}
                      <div className="space-y-4">
                        {section.items.map((item, i) => (
                          <div
                            key={i}
                            className="border-b border-white/10 pb-3"
                          >
                            <h3 className="text-white font-semibold mb-1">
                              {item.title}
                            </h3>
                            <p className="text-white/40 text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Right Side - Enquiry Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Enquiry />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative bg-black py-16 sm:py-20 overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase">
              Start Your Journey
            </span>
            <span className="w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Ready to Enroll in{" "}
            <span className="text-yellow-400 font-medium">
              {courseTitle || "This Course"}?
            </span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8">
            Take the first step towards a successful career in design. Fill out
            the enquiry form and our counselors will get in touch with you.
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

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slow-zoom { animation: slowZoom 8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default SingleCourse;