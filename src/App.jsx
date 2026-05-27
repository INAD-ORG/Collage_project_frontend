import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { toast, Toaster } from "sonner";

import Staff from "./pages/Staff/Staff";
import Service1 from "./pages/Services/Service1";
import Service2 from "./pages/Services/Service2";
import Service3 from "./pages/Services/Service3";
import Service4 from "./pages/Services/Service4";
import Service5 from "./pages/Services/Service5";
import Service6 from "./pages/Services/Service6";
import Ug1 from "./pages/Services/ug/Ug1";
import Ug2 from "./pages/Services/ug/Ug2";
import Ug3 from "./pages/Services/ug/Ug3";
import Ug4 from "./pages/Services/ug/Ug4";
import Pg1 from "./pages/Services/pg/Pg1";
import Pg2 from "./pages/Services/pg/Pg2";
import Pg3 from "./pages/Services/pg/Pg3";
import Pg4 from "./pages/Services/pg/Pg4";
import Placement from "./pages/Placement/Placement";
import Enquiry from "./pages/Enquiry/Enquiry";
import Admission from "./pages/Admission/Admission";
import { useEffect, useLayoutEffect } from "react";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import Service7 from "./pages/Services/Service7";
import Service8 from "./pages/Services/Service8";
import Ug5 from "./pages/Services/ug/Ug5";
import Pg5 from "./pages/Services/pg/Pg5";
import Student from "./pages/Student/Student";
import Mentor from "./pages/Mentor/Mentor";
import SingleGallery from "./pages/SingleGallery/SingleGallery";
import SingleCourse from "./pages/SingleCourse/SingleCourse";
import Float from "./components/Float/Float";
import SocialFloat from "./components/Float/SocialFloat";
function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, [pathname]);

    return null;
  };

  const queryClient = new QueryClient();

  const shown = new Set();
  const originalToastError = toast.error;

  toast.error = (message, opts = {}) => {
    const key = typeof message === "string" ? message : JSON.stringify(message);
    if (shown.has(key)) return;
    shown.add(key);
    originalToastError(message, opts);
    setTimeout(() => shown.delete(key), 2000);
  };

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Float />
        <SocialFloat />
        <BrowserRouter>
          <Toaster position="top-center" richColors />
          <ScrollToTop />

          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />

            <Route path="/our-staff" element={<Staff />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/alumni" element={<Placement />} />
            <Route path="/admission" element={<Enquiry />} />
            {/* <Route path="/admission" element={<Admission />} /> */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/student-corner" element={<Student />} />
            <Route path="/gallery/:id" element={<SingleGallery />} />

            {/* Courses */}
            <Route
              path="/course/:couseType/:id/:courseName"
              element={<SingleCourse />}
            />

            {/* Services */}
            <Route path="/interior-design" element={<Service1 />} />
            <Route path="/graphic-design" element={<Service2 />} />
            <Route path="/fashion-design" element={<Service3 />} />
            <Route path="/web-design-development" element={<Service4 />} />
            <Route path="/undergraduate-courses" element={<Service5 />} />
            <Route path="/postgraduate-courses" element={<Service6 />} />
            <Route path="/architecture-design" element={<Service7 />} />
            <Route path="/digital-marketing" element={<Service8 />} />

            {/* ug */}
            <Route path="/undergraduate-course/Ba" element={<Ug1 />} />
            <Route path="/undergraduate-course/bcom" element={<Ug2 />} />
            <Route path="/undergraduate-course/Bsc" element={<Ug3 />} />
            <Route path="/undergraduate-course/Bba" element={<Ug4 />} />
            <Route path="/undergraduate-course/Blib" element={<Ug5 />} />

            {/* pg */}
            <Route path="/postgraduate-course/Ma" element={<Pg1 />} />
            <Route path="/postgraduate-course/Mcom" element={<Pg2 />} />
            <Route path="/postgraduate-course/Msc" element={<Pg3 />} />
            <Route path="/postgraduate-course/Mba" element={<Pg4 />} />
            <Route path="/postgraduate-course/Mlib" element={<Pg5 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
