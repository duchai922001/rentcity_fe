import { Transaction, Card, RevenueStats, Post } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const dashboardApi = {
  getWeeklyStats: async () => {
    return fetch(`${API_BASE_URL}/dashboard/weekly-stats`);
  },

  getMonthlyStats: async () => {
    return fetch(`${API_BASE_URL}/dashboard/monthly-stats`);
  },

  getYearlyStats: async () => {
    return fetch(`${API_BASE_URL}/dashboard/yearly-stats`);
  },

  getUserCount: async () => {
    return fetch(`${API_BASE_URL}/dashboard/user-count`);
  },

  getRecentActivities: async () => {
    return fetch(`${API_BASE_URL}/dashboard/activities`);
  }
};

export const transactionApi = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    return response.json();
  },

  getById: async (id: string): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    return response.json();
  },

  create: async (data: Partial<Transaction>) => {
    return fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};

export const cardApi = {
  getAll: async (): Promise<Card[]> => {
    const response = await fetch(`${API_BASE_URL}/cards`);
    return response.json();
  },

  getById: async (id: string): Promise<Card> => {
    const response = await fetch(`${API_BASE_URL}/cards/${id}`);
    return response.json();
  },

  create: async (data: Partial<Card>) => {
    return fetch(`${API_BASE_URL}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};

export const revenueApi = {
  getStats: async (): Promise<RevenueStats> => {
    const response = await fetch(`${API_BASE_URL}/revenue/stats`);
    return response.json();
  },

  getMonthlyRevenue: async () => {
    return fetch(`${API_BASE_URL}/revenue/monthly`);
  },

  getYearlyRevenue: async () => {
    return fetch(`${API_BASE_URL}/revenue/yearly`);
  }
};

export const postApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return response.json();
  },

  getById: async (id: string): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    return response.json();
  },

  create: async (data: Partial<Post>) => {
    return fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  update: async (id: string, data: Partial<Post>) => {
    return fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  delete: async (id: string) => {
    return fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE'
    });
  }
};
