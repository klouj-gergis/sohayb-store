import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      checkAuth: async () => {
        try {
          set({ loading: true });
          await api.get("/sanctum/csrf-cookie"); // refresh CSRF
          const res = await api.get("/api/user");
          set({ user: res.data, loading: false, isAuthenticated: true });
          return true;
        } catch (err) {
          set({ user: null, loading: false, isAuthenticated: false });
          return false;
        }
      },

      login: async (credentials, navigate) => {
        try {
          set({ loading: true });
          await api.get("/sanctum/csrf-cookie");
          const res = await api.post("/api/login", credentials);

          set({
            user: res.data,
            loading: false,
            error: null,
            isAuthenticated: true,
          });
          navigate("/", { state: { showToast: "Login Successful" } });
          return true;
        } catch (err) {
          set({
            error:
              err.response?.data?.message ||
              err.message ||
              err.data?.message,
            loading: false,
            isAuthenticated: false,
          });
          toast.error(
            err.response?.data?.message ||
              err.message ||
              err.data?.message
          );
          return false;
        }
      },

      register: async (formData, navigate) => {
        try {
          set({ loading: true });
          await api.get("/sanctum/csrf-cookie");
          await api.post("/register", formData);
          const res = await api.get("/api/user");
          set({ user: res.data, loading: false, error: null });
          navigate("/login", {
            state: {
              toast: {
                message: "Registration Successful. Please log in.",
                type: "success",
              },
            },
          });
          return true;
        } catch (err) {
          set({
            error: err.response?.data?.message || err.message,
            loading: false,
          });
          toast.error(
            err.response?.data?.message || err.message || err.data?.message
          );
          return false;
        }
      },

      logout: async () => {
        try {
          await api.post("/logout");
        } catch (err) {
          // ignore if already logged out
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      getStorage: () => localStorage, // can also be sessionStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

     
    
