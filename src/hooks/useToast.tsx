// src/hooks/useToast.tsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
  title:     string;
  message?:  string;
  type?:     ToastType;
  duration?: number; // default 3000ms
}

interface ToastContextValue {
  toast:     ToastData | null;
  showToast: (data: ToastData) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast:     null,
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((data: ToastData) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(data);
    timerRef.current = setTimeout(() => setToast(null), (data.duration ?? 3000) + 400);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);