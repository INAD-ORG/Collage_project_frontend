import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "./MobileMenu.scss";
import { RiHome2Line } from "react-icons/ri";
import { aboutOption, courses } from "../../assets/data";
import axios from "axios";
import { baseUrl } from "../../main";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState(false);

  const menuRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    setDropdown(false);
    setServiceDropdown(false);
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const [mainCourses, setMainCourses] = useState([]);
  const [ugCourses, setUgCourses] = useState([]);
  const [pgCourses, setPgCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/course/all-course`);
        const allCourses = data?.courses || [];

        setMainCourses(
          allCourses.filter((course) => course.courseType === "Main Course"),
        );
        setUgCourses(
          allCourses.filter((course) => course.courseType === "UG Course"),
        );
        setPgCourses(
          allCourses.filter((course) => course.courseType === "PG Course"),
        );
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Combine and order all course types
  const allCoursesOrdered = [...mainCourses, ...ugCourses, ...pgCourses];

  return (
    <div className="mobileMenu" ref={menuRef}>
      {/* Hamburger Menu */}
      <label className="hamburger">
        <input
          type="checkbox"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <svg viewBox="0 0 32 32" className="hamburger__icon">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>

      {/* Mobile Menu */}
      <div className={`mobileMenu-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="home-tab"
            >
              <RiHome2Line />
              Home
            </Link>
          </li>

          {/* About Us Dropdown */}
          <li className="dropdown-links">
            <div
              onClick={() => setDropdown(!dropdown)}
              className="dropdown-title"
            >
              About Us <MdOutlineKeyboardArrowDown className="nav-icon" />
            </div>
            {dropdown && (
              <div className="nav-dropdown">
                {aboutOption.map((item, index) => (
                  <Link
                    to={`/${item.link}`}
                    onClick={() => setMenuOpen(false)}
                    key={index}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {/* Our Courses Dropdown */}
          <li className="dropdown-links">
            <div
              onClick={() => setServiceDropdown(!serviceDropdown)}
              className="dropdown-title"
            >
              Courses <MdOutlineKeyboardArrowDown className="nav-icon" />
            </div>
            {serviceDropdown && (
              <div className="nav-dropdown">
                {allCoursesOrdered?.map((item, index) => (
                  <Link
                    to={`/course/${item.courseType}/${item._id}/${item.bannerTitle}`}
                    onClick={() => setMenuOpen(false)}
                    key={index}
                  >
                    {item.bannerTitle}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link to="/gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </Link>
          </li>

          <li>
            <Link to="/alumni" onClick={() => setMenuOpen(false)}>
              Alumni
            </Link>
          </li>
          {/* <li>
            <Link to="/admission" onClick={() => setMenuOpen(false)}>
              Admission
            </Link>
          </li> */}

          <li>
            <Link to="/enquiry" onClick={() => setMenuOpen(false)}>
              Enquiry
            </Link>
          </li>
          <li>
            <Link to="/student-corner" onClick={() => setMenuOpen(false)}>
              Student Login
            </Link>
          </li>
          <li>
            <Link to="/contact-us" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
