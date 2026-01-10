import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// =========================
// Attach JWT to requests
// =========================
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// Handle 401 globally
// =========================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-logout on login/register failures
    const isAuthEndpoint = error.config?.url?.includes('/auth/login') || 
                           error.config?.url?.includes('/auth/register');
    
    if (error.response?.status === 401 && !isAuthEndpoint) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);

// =========================
// Auth Service
// =========================
const authService = {
  // -------- Signup --------
  register: async (data) => {
    const response = await API.post("/auth/register", data);

    // backend returns TokenResponse
    if (response.data?.access_token) {
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // -------- Login --------
  login: async (credentials) => {
    const response = await API.post("/auth/login", credentials);

    if (response.data?.access_token) {
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // -------- Logout --------
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.replace("/login");
  },

  // -------- Current user --------
  getCurrentUser: async () => {
    const response = await API.get("/auth/me");
    return response.data;
  },

  // -------- Forgot password --------
  forgotPassword: async (email) => {
    const response = await API.post("/auth/forgot-password", { email });
    return response.data;
  },

  // -------- Reset password --------
  resetPassword: async (token, password) => {
    const response = await API.post(
      `/auth/reset-password/${token}`,
      { password }
    );
    return response.data;
  },

  // -------- Google OAuth (redirect) --------
  googleLoginRedirect: () => {
    window.location.href =
      "http://localhost:8000/api/auth/google/login";
  },

  // -------- Helpers --------
  isLoggedIn: () => {
    return !!localStorage.getItem("authToken");
  },

  getStoredUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
