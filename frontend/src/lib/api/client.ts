import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

// ──────────────────────────────────────────────────────────────────────────────
//  Types
// ──────────────────────────────────────────────────────────────────────────────

export interface ApiErrorResponse {
  detail: string;
  code?: string;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    if (code !== undefined) this.code = code;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
//  Axios instance
// ──────────────────────────────────────────────────────────────────────────────

export const apiClient = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:8000/api/v1",
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request interceptor – attach auth token ───────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach Supabase JWT from session storage (set by the auth provider)
    if (typeof window !== "undefined") {
      const token = window.sessionStorage.getItem("rescue_access_token");
      if (token != null) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ── Response interceptor – normalise errors ──────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status  = error.response?.status  ?? 500;
    const detail  = error.response?.data?.detail ?? error.message ?? "Unexpected error";
    const code    = error.response?.data?.code;

    // Redirect to login on 401 (client-side only)
    if (status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return Promise.reject(new ApiError(detail, status, code));
  }
);
