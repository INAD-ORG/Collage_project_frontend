import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const SocialFloat = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/internationalacademyofdesign",
      label: "Facebook",
      color: "hover:bg-[#1877F2]",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/inad.official/",
      label: "Instagram",
      color: "hover:bg-[#E4405F]",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@inadofficial",
      label: "YouTube",
      color: "hover:bg-[#FF0000]",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group w-10 h-10 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-yellow-400 hover:text-white transition-all duration-300 ${social.color}  hover:border-yellow-400`}
        >
          {social.icon}
          {/* Tooltip */}
          <span className="absolute left-12 whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialFloat;
