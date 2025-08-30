// App routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
} as const

// App configuration
export const APP_CONFIG = {
  NAME: "Bukshare",
  DESCRIPTION: "Share Your Books",
  VERSION: "1.0.0",
} as const

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const
