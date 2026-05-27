import "./Service.scss";

import service_banner from "../../assets/images/card.jpg";
import Sidebar from "../../components/Sidebar/Sidebar";
import { fashion } from "../../assets/serviceData";

import { baseUrl } from "../../main";
import { toast } from "sonner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

const fetchBanner = async () => {
  if (!navigator.onLine) {
    throw new Error("NETWORK_ERROR");
  }

  const { data } = await axios.get(
    `${baseUrl}/banner/fashion-design-banner/67e773a4768539d1e12454c8`,
  );
  return data;
};

const Service3 = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fashion-banner"],
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

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="error">
        <div className="error-desc">
          <h3>Failed to load data.</h3>
          <p>Try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="service">
      <div className="service-banner">
        <img src={data.image} alt="" />
      </div>

      <div className="service-content">
        <div className="service-content-left">
          <h2>{fashion.title}</h2>
          {fashion.desc.map((item, index) => (
            <p key={index}>{item}</p>
          ))}

          <h3>{fashion.courseLists.title}</h3>

          <ul>
            {fashion.courseLists.courses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>{fashion.keyTopics.title}</h3>

          <ul>
            {fashion.keyTopics.keyTopicsLists.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>{fashion.careerTopics.title}</h3>

          <ul>
            {fashion.careerTopics.careerOpportunities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>{fashion.list.title}</h3>
          <p>{fashion.list.desc}</p>

          <ul>
            {fashion.list.listPoints.map((item, index) => (
              <li key={index}>
                <span>{item.title}</span>
                <br />
                {item.desc}
              </li>
            ))}
          </ul>
        </div>
        <div className="service-content-right">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Service3;
