// api.js
import axiosInstance from "../utils/axios";

// Course APIs
export const getCourses = async () => {
  const { data } = await axiosInstance.get("/course/all-course");
  return data.courses;
};

export const getCourseById = async (id) => {
  const { data } = await axiosInstance.get(`/course/${id}`);
  return data.course;
};

// Affiliate APIs
export const getAffiliates = async () => {
  const { data } = await axiosInstance.get("/affiliate/all-affiliates");
  return data.affiliated;
};

// Founder APIs
export const getFounders = async () => {
  const { data } = await axiosInstance.get("/founder/all-founders");
  return data.founders;
};

// Staff APIs
export const getStaffs = async () => {
  const { data } = await axiosInstance.get("/staff/all-staffs");
  return data.staff;
};

// About APIs
export const getAboutContent = async () => {
  const { data } = await axiosInstance.get("/about/about-content");
  return data.about.content;
};

// Gallery APIs
export const getGalleryFolders = async () => {
  const { data } = await axiosInstance.get(
    "/gallery-folder/all-gallery-folders",
  );
  return data.folders;
};

export const getGalleryFolderById = async (id) => {
  const { data } = await axiosInstance.get(`/gallery-folder/${id}`);
  return data.folder;
};

// Alumni APIs
export const getAlumnies = async () => {
  const { data } = await axiosInstance.get("/alumni/all-alumnies");
  return data.alumni;
};

// Banner APIs
export const getContactBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/contact-banner/67e772d0768539d1e12454a7",
  );
  return data.image;
};

export const getAdmissionBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/admission-banner/67e77282768539d1e12454a1",
  );
  return data.image;
};

export const getAlumniBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/alumni-banner/67e7726c768539d1e124549e",
  );
  return data.image;
};

export const getGalleryBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/gallery-banner/67e772a7768539d1e12454a4",
  );
  return data.image;
};

export const getAboutBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/about-banner/67e7720bf86def3cbf7ba215",
  );
  return data.image;
};

export const getStaffBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/staff-banner/67e7723fc95a30104036fdc1",
  );
  return data.image;
};

export const getMentorBanner = async () => {
  const { data } = await axiosInstance.get(
    "/banner/mentor-banner/67e7722bc95a30104036fdbe",
  );
  return data.image;
};

// Contact Details API
export const getContactDetails = async () => {
  const { data } = await axiosInstance.get("/contact-details/only");
  return data;
};

// Default export with all APIs
export default {
  getCourses,
  getCourseById,
  getAffiliates,
  getFounders,
  getStaffs,
  getAboutContent,
  getGalleryFolders,
  getGalleryFolderById,
  getAlumnies,
  getContactBanner,
  getAdmissionBanner,
  getAlumniBanner,
  getGalleryBanner,
  getAboutBanner,
  getStaffBanner,
  getMentorBanner,
  getContactDetails,
};
