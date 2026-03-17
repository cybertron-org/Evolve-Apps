import axios from 'axios';
import { useAuthStore } from '../store/authStore';

//************* */ Base API configuration ***************//
export const api = axios.create({
  baseURL: 'https://evolve-api.findmycabby.com/api/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//************* */ Request Interceptor: Attach Token *********///
api.interceptors.request.use(
  async (config) => {
    const state = useAuthStore.getState();
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Current Auth Store State:', {
      hasToken: !!state.token,
      user: state.user?.email,
    });
    
    if (state.token) {
      console.log('Attaching Auth Token to request');
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${state.token}`;
    } else {
      console.log('No token found in store state!');
    }
    return config;
  },
  (error) => {
    console.log('[Request Error]', error);
    return Promise.reject(error);
  }
);

// **************** Response Interceptor: Global Error Handling ***********///
api.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[Response Error] ${error.response?.status || 'Network Error'} from ${error.config?.url}`);
    if (error.response?.data) {
      console.log('Error Response Data:', JSON.stringify(error.response.data, null, 2));
    }
    
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/logout');
      
      if (!isAuthEndpoint) {
        console.log('Session expired (401), logging out...');
        useAuthStore.getState().logout();
      } else {
        console.log(`401 received on ${error.config?.url}, ignoring global logout logic.`);
      }
    }
    return Promise.reject(error);
  }
);
