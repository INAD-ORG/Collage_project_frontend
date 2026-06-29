// hooks/useApi.js
import { useQuery, useQueries } from "@tanstack/react-query";
import API from "./api";

// Centralized query options
const queryOptions = {
  retry: false,
  refetchOnWindowFocus: false,
//   staleTime: 5 * 60 * 1000, // 5 minutes
//   gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
};

// SINGLE QUERY HOOKS

// Course Hooks
export const useCourses = (options = {}) => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: API.getCourses,
    ...queryOptions,
    ...options,
  });
};

export const useCourse = (id, options = {}) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => API.getCourseById(id),
    enabled: !!id,
    ...queryOptions,
    ...options,
  });
};

// Affiliate Hooks
export const useAffiliates = (options = {}) => {
  return useQuery({
    queryKey: ["affiliates"],
    queryFn: API.getAffiliates,
    ...queryOptions,
    ...options,
  });
};

// Founder Hooks
export const useFounders = (options = {}) => {
  return useQuery({
    queryKey: ["founders"],
    queryFn: API.getFounders,
    ...queryOptions,
    ...options,
  });
};

// Staff Hooks
export const useStaffs = (options = {}) => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: API.getStaffs,
    ...queryOptions,
    ...options,
  });
};

// About Hooks
export const useAboutContent = (options = {}) => {
  return useQuery({
    queryKey: ["about"],
    queryFn: API.getAboutContent,
    ...queryOptions,
    ...options,
  });
};

// Gallery Hooks
export const useGalleryFolders = (options = {}) => {
  return useQuery({
    queryKey: ["gallery-folders"],
    queryFn: API.getGalleryFolders,
    ...queryOptions,
    ...options,
  });
};

export const useGalleryFolder = (id, options = {}) => {
  return useQuery({
    queryKey: ["gallery-folder", id],
    queryFn: () => API.getGalleryFolderById(id),
    enabled: !!id,
    ...queryOptions,
    ...options,
  });
};

// Alumni Hooks
export const useAlumnies = (options = {}) => {
  return useQuery({
    queryKey: ["alumnies"],
    queryFn: API.getAlumnies,
    ...queryOptions,
    ...options,
  });
};

// Banner Hooks
export const useContactBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "contact"],
    queryFn: API.getContactBanner,
    ...queryOptions,
    ...options,
  });
};

export const useAdmissionBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "admission"],
    queryFn: API.getAdmissionBanner,
    ...queryOptions,
    ...options,
  });
};

export const useAlumniBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "alumni"],
    queryFn: API.getAlumniBanner,
    ...queryOptions,
    ...options,
  });
};

export const useGalleryBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "gallery"],
    queryFn: API.getGalleryBanner,
    ...queryOptions,
    ...options,
  });
};

export const useAboutBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "about"],
    queryFn: API.getAboutBanner,
    ...queryOptions,
    ...options,
  });
};

export const useStaffBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "staff"],
    queryFn: API.getStaffBanner,
    ...queryOptions,
    ...options,
  });
};

export const useMentorBanner = (options = {}) => {
  return useQuery({
    queryKey: ["banner", "mentor"],
    queryFn: API.getMentorBanner,
    ...queryOptions,
    ...options,
  });
};

// Contact Details Hook
export const useContactDetails = (options = {}) => {
  return useQuery({
    queryKey: ["contact-details"],
    queryFn: API.getContactDetails,
    ...queryOptions,
    ...options,
  });
};

// ==================== MULTIPLE QUERY HOOKS ====================

// Fetch multiple queries at once
export const useMultipleQueries = (queries) => {
  return useQueries({
    queries: queries.map((query) => ({
      ...queryOptions,
      ...query,
    })),
  });
};

// ==================== DEFAULT EXPORT ====================
export default {
  useCourses,
  useCourse,
  useAffiliates,
  useFounders,
  useStaffs,
  useAboutContent,
  useGalleryFolders,
  useGalleryFolder,
  useAlumnies,
  useContactBanner,
  useAdmissionBanner,
  useAlumniBanner,
  useGalleryBanner,
  useAboutBanner,
  useStaffBanner,
  useMentorBanner,
  useContactDetails,
  useMultipleQueries,
};
