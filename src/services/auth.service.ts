import axiosInstance from "./main.service";

export const AuthService = {
  login: async (payload: any) => {
    const response = await axiosInstance.post("/auth/admin-login", payload);
    return response.data;
  },
  register: async (payload: any) => {
    const response = await axiosInstance.post("/auth/register", payload);
    return response.data;
  },
};
