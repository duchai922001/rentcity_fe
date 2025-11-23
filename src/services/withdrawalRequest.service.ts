// src/services/withdrawalRequest.service.ts
import axiosInstance from "./main.service";

export const WithdrawalRequestService = {
  // Tạo yêu cầu: POST /withdraw-request/:userId
  createRequest: async (userId: number, payload: any) => {
    const response = await axiosInstance.post(
      `/withdraw-request/${userId}`,
      payload
    );
    return response.data;
  },

  // Lấy danh sách: GET /withdraw-request?status=...
  getAllRequests: async (status?: string) => {
    const url = status
      ? `/withdraw-request?status=${status}`
      : `/withdraw-request`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  // Duyệt: PATCH /withdraw-request/:id/approve
  approveRequest: async (id: number) => {
    const response = await axiosInstance.patch(
      `/withdraw-request/${id}/approve`
    );
    return response.data;
  },

  // Từ chối: PATCH /withdraw-request/:id/reject  body: { adminNote }
  rejectRequest: async (id: number, payload: { adminNote?: string }) => {
    const response = await axiosInstance.patch(
      `/withdraw-request/${id}/reject`,
      payload
    );
    return response.data;
  },

  // Hoàn tất: PATCH /withdraw-request/:id/complete
  completeRequest: async (id: number) => {
    const response = await axiosInstance.patch(
      `/withdraw-request/${id}/complete`
    );
    return response.data;
  },
};
