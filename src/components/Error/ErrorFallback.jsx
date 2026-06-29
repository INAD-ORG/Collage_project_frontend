import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const ErrorFallback = ({
  message = "Failed to load content",
  onRetry,
  fullScreen = false,
  icon = true,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "min-h-[60vh]"} bg-black px-4`}
    >
      <div className="text-center max-w-md">
        {/* Error Icon */}
        {icon && (
          <div className="w-16 h-16 border-2 border-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-400/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        )}

        {/* Error Message */}
        <h3 className="text-yellow-400 text-lg font-medium mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-white/60 text-sm mb-6">{message}</p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="group inline-flex items-center gap-2 px-6 py-2.5 border border-yellow-400/30 hover:border-yellow-400 text-yellow-400/80 hover:text-yellow-400 transition-all duration-300"
          >
            <FiRefreshCw
              className="group-hover:rotate-180 transition-transform duration-500"
              size={16}
            />
            <span className="text-sm tracking-wide">Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
