import axiosInstance from "./main.service";

export const PackageService = {
  create: async (payload: any) => {
    const response = await axiosInstance.post("/packages", payload);
    return response.data;
  },
  getListPackages: async () => {
    const response = await axiosInstance.get("/packages");
    return response.data;
  },
  getPackageUserBuy: async () => {
    const response = await axiosInstance.get("/packages/user-buy");
    return response.data;
  },
};
