import { useAffiliates } from "../../services/hook";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/Error/ErrorFallback";

const ScrollImage = () => {
  const {
    data: affiliates = [],
    isLoading,
    isError,
    refetch,
  } = useAffiliates();

  // Show loader
  if (isLoading) return <Loader />;

  // Show error with retry
  if (isError) {
    return (
      <ErrorFallback
        message="Failed to load affiliates. Please try again."
        onRetry={refetch}
        fullScreen={false}
      />
    );
  }

  return (
    <div className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 border border-black/5 rotate-45 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 border-2 border-dashed border-yellow-400/10 -rotate-12 -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs text-black/40 tracking-[0.3em] uppercase">
                Partners
              </span>
              <span className="h-px w-6 sm:w-8 bg-yellow-400/50"></span>
              <span className="text-[10px] sm:text-xs text-black/20">
                {affiliates?.length || 0} Colleges
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black tracking-tight leading-tight">
              Affiliated{" "}
              <span className="relative">
                <span className="text-yellow-400 font-medium">Colleges</span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-400/30"></span>
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/40 max-w-xs lg:text-right">
            Building strong partnerships with leading institutions across the
            globe
          </p>
        </div>

        {/* Pinterest-style Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-3 md:gap-4">
          {affiliates?.map((item, index) => {
            // Random height variations for masonry effect
            const heights = [
              "h-28",
              "h-36",
              "h-44",
              "h-32",
              "h-40",
              "h-48",
              "h-24",
            ];
            const randomHeight = heights[index % heights.length];

            return (
              <div
                key={index}
                className="group break-inside-avoid mb-2 sm:mb-3 md:mb-4"
              >
                <div
                  className={`relative ${randomHeight} sm:h-auto sm:min-h-[100px] md:min-h-[120px] border border-black/10 hover:border-yellow-400/40 transition-all duration-500 overflow-hidden bg-white`}
                >
                  {/* Diagonal line accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] sm:border-t-[20px] border-r-[16px] sm:border-r-[20px] border-t-transparent border-r-yellow-400/0 group-hover:border-r-yellow-400/20 transition-all duration-500 z-10" />

                  {/* Image Container */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-5">
                    <img
                      src={item.image}
                      alt={`Affiliate ${index + 1}`}
                      className="max-w-[80%] sm:max-w-[85%] max-h-[70%] sm:max-h-[75%] object-contain transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Hover Overlay - Desktop only */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-all duration-500 hidden sm:block" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Row - Remaining partners count */}
        {affiliates?.length > 20 && (
          <div className="text-center mt-8 sm:mt-10">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 border border-black/10 text-xs sm:text-sm text-black/40">
              <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>+
              {affiliates.length - 20} more partners
            </div>
          </div>
        )}

        {/* Decorative Bottom */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-16">
          <span className="w-8 sm:w-12 h-[1px] bg-black/10"></span>
          <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
          <span className="w-1 h-1 bg-black/20 rounded-full"></span>
          <span className="w-1 h-1 bg-black/10 rounded-full"></span>
          <span className="w-8 sm:w-12 h-[1px] bg-black/10"></span>
        </div>
      </div>
    </div>
  );
};

export default ScrollImage;
