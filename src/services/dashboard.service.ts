import axiosInstance from "./main.service";

export const DashboardService = {
  getDashboard: async () => {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  },
};
