
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auctionToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = 
      error.response?.data?.message || 
      error.message || 
      'Something went wrong';
    
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData: any) => {
    const response = await apiClient.post('/auth/register', userData);
    localStorage.setItem('auctionToken', response.data.data.token);
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('auctionToken', response.data.data.token);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('auctionToken');
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
};

// Auctions API calls
export const auctionsAPI = {
  getAll: async (params: any = {}) => {
    const response = await apiClient.get('/auctions', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/auctions/${id}`);
    return response.data;
  },
  
  create: async (auctionData: any) => {
    const response = await apiClient.post('/auctions', auctionData);
    return response.data;
  },
  
  update: async (id: string, updateData: any) => {
    const response = await apiClient.put(`/auctions/${id}`, updateData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/auctions/${id}`);
    return response.data;
  }
};

// Bids API calls
export const bidsAPI = {
  placeBid: async (auctionId: string, amount: number) => {
    const response = await apiClient.post('/bids', { auctionId, amount });
    return response.data;
  },
  
  getForAuction: async (auctionId: string) => {
    const response = await apiClient.get(`/bids/auction/${auctionId}`);
    return response.data;
  },
  
  getUserBids: async () => {
    const response = await apiClient.get('/bids/my-bids');
    return response.data;
  }
};

// User API calls
export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await apiClient.put('/users/profile', userData);
    return response.data;
  },
  
  getUserAuctions: async () => {
    const response = await apiClient.get('/users/my-auctions');
    return response.data;
  },
  
  addToWatchlist: async (auctionId: string) => {
    const response = await apiClient.post(`/users/watchlist/${auctionId}`);
    return response.data;
  },
  
  removeFromWatchlist: async (auctionId: string) => {
    const response = await apiClient.delete(`/users/watchlist/${auctionId}`);
    return response.data;
  },
  
  getWatchlist: async () => {
    const response = await apiClient.get('/users/watchlist');
    return response.data;
  }
};

export default {
  auth: authAPI,
  auctions: auctionsAPI,
  bids: bidsAPI,
  user: userAPI
};
