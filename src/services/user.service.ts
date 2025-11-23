import axiosInstance from "./main.service";

export const UserService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  },
};
