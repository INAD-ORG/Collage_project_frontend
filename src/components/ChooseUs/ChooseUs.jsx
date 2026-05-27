import { FiUsers, FiMonitor, FiAward, FiHeart } from "react-icons/fi";

import chooseUsImage1 from "../../assets/images/mainImg/choose1.webp";
import chooseUsImage2 from "../../assets/images/mainImg/choose2.webp";

const chooseUs = [
  {
    icon: <FiUsers className="text-2xl" />,
    title: "Expert Faculty",
    desc: "Learn from industry professionals with years of experience.",
    no: "01",
  },
  {
    icon: <FiMonitor className="text-2xl" />,
    title: "Hands-on Training",
    desc: "Practical learning to prepare students for real-world challenges.",
    no: "02",
  },
  {
    icon: <FiAward className="text-2xl" />,
    title: "Placement Assistance",
    desc: "Helping graduates secure top positions in leading companies.",
    no: "03",
  },
  {
    icon: <FiHeart className="text-2xl" />,
    title: "Creative Environment",
    desc: "State-of-the-art facilities that inspire innovation.",
    no: "04",
  },
];

const ChooseUs = () => {
  return (
    <div className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large rotated square */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border-[30px] border-black/[0.02] rotate-45" />

        {/* Dashed shapes */}
        <div className="absolute top-1/3 -left-16 w-48 h-48 border-2 border-dashed border-yellow-400/10 rotate-12" />
        <div className="absolute bottom-20 right-10 w-36 h-36 border-2 border-dotted border-black/5 -rotate-6 hidden lg:block" />

        {/* Small accents */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400/20 rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-4 h-4 border-2 border-black/5 rotate-45" />
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-black/10 rounded-full" />

        {/* Plus signs */}
        <div className="absolute top-1/4 right-1/4 text-yellow-400/15 text-2xl font-light">
          +
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-black/5 text-xl">
          +
        </div>

        {/* Lines */}
        <div className="absolute top-10 right-20 w-20 h-px bg-yellow-400/20 rotate-45" />
        <div className="absolute bottom-40 left-10 w-16 h-px bg-black/10 -rotate-45" />

        {/* Top & Bottom gradients */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
            <span className="text-[10px] sm:text-xs text-black/40 tracking-[0.3em] uppercase">
              Why INAD
            </span>
            <span className="w-6 sm:w-8 h-px bg-yellow-400/40"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black tracking-tight">
            Why <span className="text-yellow-400 font-medium">Choose Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Images Collage */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-lg mx-auto lg:mx-0">
              {/* Background Shape */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-dashed border-yellow-400/20 rotate-3" />
              <div className="absolute top-4 right-4 w-full h-full border border-black/5 -rotate-2" />

              {/* Main Images Container */}
              <div className="relative grid grid-cols-2 gap-2">
                {/* Fashion Girl Image */}
                <div className="relative aspect-[3/4] overflow-hidden border-2 border-black col-span-1">
                  <img
                    src={chooseUsImage1}
                    alt="Fashion Design Student"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Yellow overlay strip */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400" />
                </div>

                {/* Computer Guy Image */}
                <div className="relative aspect-[3/4] overflow-hidden border-2 border-black col-span-1 mt-8">
                  <img
                    src={chooseUsImage2}
                    alt="Design Student with Computer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Yellow overlay strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-black text-white p-4 sm:p-5 shadow-xl z-20">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">100%</div>
                  <div className="text-[10px] sm:text-xs text-white/60 mt-1">
                    Placement Rate
                  </div>
                </div>
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400" />
              </div>

              {/* Small decorative elements */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 border-2 border-yellow-400/30 rotate-45 hidden lg:block" />
              <div className="absolute bottom-10 -right-2 w-4 h-4 bg-black/5 rotate-12 hidden lg:block" />
            </div>
          </div>

          {/* Right Side - Why Choose Us Cards */}
          <div className="max-w-xl order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-5">
              {chooseUs.map((item, index) => (
                <div
                  key={item.no}
                  className="group flex gap-4 sm:gap-5 p-4 sm:p-5 border border-black/10 hover:border-yellow-400/40 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/[0.02] transition-all duration-500" />

                  {/* Number */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border border-black/10 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/5 flex items-center justify-center transition-all duration-300">
                      <span className="text-black/30 group-hover:text-yellow-600 font-bold text-sm sm:text-base transition-colors">
                        {item.no}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-1">
                      <span
                        className="text-black/70
                       group-hover:text-yellow-600 transition-colors"
                      >
                        {item.icon}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-black group-hover:text-black/80 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-black/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-5 h-5 border border-yellow-400/50 flex items-center justify-center">
                      <span className="text-yellow-400 text-xs">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
