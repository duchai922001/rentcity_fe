import axiosInstance from "./main.service";

export const PostService = {
  getAllPost: async () => {
    const res = await axiosInstance.get("/posts");
    return res.data;
  },
  updateStatus: async (id: number, status: string) => {
    const res = await axiosInstance.patch(`/posts/${id}/status`, { status });
    return res.data;
  },
};
