import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { demoUser } from '../services/demoData';

interface DemoContextType {
  demoMode: boolean;
  toggleDemoMode: () => void;
  isDemoUser: boolean;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Сохраняем статус демо-режима в localStorage
  const [demoMode, setDemoMode] = useState(() => {
    const savedMode = localStorage.getItem('demoMode');
    return savedMode === 'true';
  });

  // Эффект для сохранения состояния демо-режима
  useEffect(() => {
    localStorage.setItem('demoMode', String(demoMode));
  }, [demoMode]);

  // Переключатель демо-режима
  const toggleDemoMode = () => {
    setDemoMode(prev => !prev);
  };

  // Определяем, используется ли демо-пользователь
  const isDemoUser = demoMode;

  return (
    <DemoContext.Provider value={{ demoMode, toggleDemoMode, isDemoUser }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}; 