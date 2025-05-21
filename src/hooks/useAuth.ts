import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { AuthResponse, User } from '../types';
import { ROUTES, STORAGE_KEYS } from '../constants';
import { handleApiError } from '../utils';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, logout: storeLogout } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      setUser(response.user);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setUser]);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(userData);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      setUser(response.user);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setUser]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch {}
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    storeLogout();
    navigate(ROUTES.LOGIN);
    setIsLoading(false);
  }, [navigate, storeLogout]);

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
}; 