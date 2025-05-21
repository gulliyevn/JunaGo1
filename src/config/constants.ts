// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 'https://api.junago.com/v1';

// Authentication
export const TOKEN_KEY = 'juna_token';
export const REFRESH_TOKEN_KEY = 'juna_refresh_token';
export const TOKEN_EXPIRY_KEY = 'juna_token_expiry';

// Theme
export const THEME_KEY = 'juna_theme';
export const DEFAULT_THEME = 'light';

// Sidebar
export const SIDEBAR_STATE_KEY = 'juna_sidebar_open';
export const DEFAULT_SIDEBAR_STATE = true;

// Storage
export const STORAGE_PREFIX = 'junago_';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

// Project Type Colors
export const PROJECT_TYPE_COLORS = {
  web: '#4f46e5', // Blue
  mobile: '#10b981', // Green
  api: '#8b5cf6', // Purple
  ai: '#ef4444', // Red
  other: '#6b7280', // Gray
}; 