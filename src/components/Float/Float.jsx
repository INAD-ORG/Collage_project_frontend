import React, { useState } from "react";
import { FiPhone, FiMessageCircle, FiX, FiArrowRight } from "react-icons/fi";
import { MdCall, MdChat, MdClose } from "react-icons/md";

const Float = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "+919928423956";

  return (
    <>
      {/* Floating Action Button - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50">
        
        {/* Expanded Menu */}
      {isOpen && (
  <div className="absolute bottom-16 right-0 mb-2 space-y-3 animate-fadeInUp">
    {/* Call Button */}
    <a
      href={`tel:${phoneNumber}`}
      className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300 group min-w-[260px]"
    >
      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
        <FiPhone className="text-black group-hover:text-yellow-400 text-base" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-black/50">Call Us</span>
        <span className="text-base font-semibold text-black">+91 99284 23956</span>
      </div>
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300 group min-w-[260px]"
    >
      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
        <FiMessageCircle className="text-black group-hover:text-yellow-400 text-base" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-black/50">WhatsApp</span>
        <span className="text-base font-semibold text-black">Chat with us</span>
      </div>
    </a>

    {/* Admission Button */}
    <a
      href="/admission"
      className="flex items-center gap-4 bg-yellow-400 text-black px-6 py-4 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 group min-w-[260px]"
    >
      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
        <FiArrowRight className="text-yellow-400 group-hover:text-black text-base" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-black/70">Apply Now</span>
        <span className="text-base font-semibold text-black">Admission Open</span>
      </div>
    </a>
  </div>
)}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-black border border-yellow-400 rotate-90"
              : "bg-yellow-400 hover:bg-yellow-300"
          }`}
        >
          {isOpen ? (
            <FiX className="text-yellow-400 text-2xl" />
          ) : (
            <MdCall className="text-black text-2xl animate-pulse" />
          )}
        </button>

        {/* Pulse Ring Effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400/50 -z-10" />
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Float;