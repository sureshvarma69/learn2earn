import axios from "axios";
import Cookies from "js-cookie";
import { getTokenFromCookie, getAppUserId } from "./cookie";

export type User = {
  email?: String;
  password?: String;
  firstName?: String;
  lastName?: String;
};

const baseUrl: string = "http://localhost:1221";
// const baseUrl: string = "https://learn2earn-api-v1.onrender.com";
const path = () => {
  return {
    signUp: "/api/v1/signup",
    login: "/api/v1/login",
    users: "/api/v1/users",
    auth: "/api/v1/auth",
    updateRole: "/api/v1/update/role",
    updateUserProfile: "/api/v1/add/profile",
    getUserProfile: "/api/v1/get/profile",
    getAllCompanies: "/api/v1/get/companies",
    storeFileToS3: "/api/v1/upload/s3",
    createJob: "/api/v1/create/job",
    getJobsCreatedByMe: "/api/v1/get/jobsPostedBy",
    getJobById: "/api/v1/get/jobById",
    getApplicantsById: "/api/v1/get/applicants",
    getAllActiveJobs: "/api/v1/get/allJobs",
    applyJob: "/api/v1/job/apply",
    changeApplicationStatus: "api/v1/job/application/status",
    removeApply: "/api/v1/job/revert",
    addToFavJob: "/api/v1/job/fav",
    removeFav: "/api/v1/job/unfav",
    getMyApplications: "/api/v1/job/myApplications",
    addEvent: "/api/v1/events/add",
    getAllEvents: "/api/v1/events",
  };
};

const api = axios.create({
  baseURL: baseUrl, // Replace with your API endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const userLogin = async (body: User) => {
  return await axios.post(baseUrl + path().login, body).then((res: any) => {
    return res.data;
  });
};

export const createUser = async (body: User) => {
  return await axios
    .post(baseUrl + path().signUp, body)
    .then((res: any) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserAuth = async (headers: any) => {
  return await axios
    .get(baseUrl + path().auth, { headers })
    .then((res: any) => {
      return res?.data;
    });
};

export const getUsersList = async () => {
  const userId = getAppUserId();
  return api.get(path().users + "/" + userId).then((res) => res.data);
};

export const updateUserRole = async (role: string) => {
  const userId = getAppUserId();
  return api
    .post(path().updateRole + "/" + userId, { role })
    .then((res) => res.data);
};

//user profile
export const createOrUpdateProfile = async (body: any) => {
  return api.post(path().updateUserProfile + "/", body).then((res) => res.data);
};

export const getProfile = async (id: String) => {
  return api.get(path().getUserProfile + "/" + id).then((res) => res.data);
};

// events
export const createOrUpdateEvent = async (body: any) => {
  return api.post(path().addEvent + "/", body).then((res) => res.data);
};

export const getEvents = async (id: String) => {
  return api.get(path().getAllEvents + "/" + id).then((res) => res.data);
};

// jobs
export const createJobOrUpdate = async (body: any) => {
  body["createdBy"] = getAppUserId();
  return api.post(path().createJob, body).then((res: any) => res?.data);
};

export const getJobsCreatedByMe = async () => {
  return api
    .get(path().getJobsCreatedByMe + "/" + getAppUserId())
    .then((res: any) => res?.data);
};

export const getAllActiveJobs = async () => {
  return api.get(path().getAllActiveJobs).then((res: any) => res?.data);
};

export const getJobById = async (id: any) => {
  return api.get(path().getJobById + "/" + id).then((res: any) => res?.data);
};

export const getApplicantsById = async (id: any) => {
  return api
    .get(path().getApplicantsById + "/" + id)
    .then((res: any) => res?.data);
};

export const applyJobApp = async (body: any) => {
  return api.post(path().applyJob, body).then((res: any) => res?.data);
};

export const updateApplicationStatus = async (body: any) => {
  let payload: any = body;
  payload["appUserId"] = getAppUserId();
  return api
    .post(path().changeApplicationStatus, payload)
    .then((res: any) => res?.data);
};

export const myApplications = async () => {
  return api
    .get(path().getMyApplications + "/" + getAppUserId())
    .then((res: any) => res?.data);
};

export const removeJobApp = async (body: any) => {
  return api.post(path().removeApply, body).then((res: any) => res?.data);
};
export const addJobToFav = async (body: any) => {
  return api.post(path().addToFavJob, body).then((res: any) => res?.data);
};
export const removeFromJob = async (body: any) => {
  return api.post(path().removeFav, body).then((res: any) => res?.data);
};
// companies

export const getAllCompanies = async () => {
  return api.get(path().getAllCompanies).then((res) => res.data);
};

//aws s3 gives url in return

export const getImageUrl = async (file: FormData) => {
  return axios
    .post(baseUrl + path().storeFileToS3, file)
    .then((res) => res.data);
};
