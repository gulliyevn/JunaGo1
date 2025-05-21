import { apiService } from './api.service';
import { AuthResponse, User } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', { email, password });
  },

  async register(userData: Partial<User> & { password: string }): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', userData);
  },

  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
  },
}; 