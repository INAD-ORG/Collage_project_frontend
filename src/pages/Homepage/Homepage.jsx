import "./Homepage.scss";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import HomeContent from "../../components/HomeContent/HomeContent";
import OurPrograms from "../../components/OurPrograms/OurPrograms";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import useFullUrl from "../../utils/useFullUrl";
import SEO from "../../components/SEO/SEO";

import ScrollImage from "../../components/ScrollImage/ScrollImage";
import Story from "../../components/Story/Story";
import EnquiryBanner from "../../components/EnquiryBanner/EnquiryBanner";
import Mentors from "../../components/Mentors/Mentors";

const Homepage = () => {
  const fullUrl = useFullUrl();

  return (
    <div className="homepage">
      <SEO
        title="International Academy of Design | Premier Design & Professional Education in India"
        description="Welcome to the International Academy of Design — a leading institution offering professional courses in Fashion, Interior, Architecture, Graphic Design, and more. Empowering creative minds across India."
        keywords="design courses India, fashion design college, interior design institute, architecture design course, graphic design training, professional education, IAD Sikar, International Academy of Design"
        url={fullUrl}
      />

      <HomeBanner />
      <HomeContent />
      <OurPrograms />
      <ScrollImage />
      <EnquiryBanner />
      <Story />
      <Mentors />
      <ChooseUs />
    </div>
  );
};

export default Homepage;
