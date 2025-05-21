export const APP_CONFIG = {
  APP_NAME: 'JunaGo',
  VERSION: '1.0.0',
  API_TIMEOUT: 5000,
  DEFAULT_PAGINATION_LIMIT: 10,
  MAX_PAGINATION_LIMIT: 100,
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  DASHBOARD: '/dashboard',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const LANGUAGES = {
  EN: 'en',
  RU: 'ru',
  AZ: 'az',
} as const; 