import { useLocation } from "react-router-dom";

const useFullUrl = () => {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://inad.in";
  return `${baseUrl}${location.pathname}`;
};

export default useFullUrl;
