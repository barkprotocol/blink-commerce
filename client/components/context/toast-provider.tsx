import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'order' | 'payment' | 'transaction';
  message: string;
  duration?: number; // Duration in milliseconds
  creationTime?: number; // Track when the toast was created
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: 'success' | 'error' | 'info' | 'order' | 'payment' | 'transaction', message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Function to handle auto-dismissal of toasts
    const autoDismissToasts = () => {
      setToasts((prevToasts) => prevToasts.filter((toast) => {
        if (toast.duration && toast.creationTime) {
          const elapsed = Date.now() - toast.creationTime;
          return elapsed < toast.duration;
        }
        return true;
      }));
    };

    // Initial call and setTimeout for subsequent calls
    autoDismissToasts();
    const timer = setTimeout(() => autoDismissToasts(), 1000); // Check every second

    return () => clearTimeout(timer);
  }, [toasts]);

  const addToast = (type: 'success' | 'error' | 'info' | 'order' | 'payment' | 'transaction', message: string, duration: number = 5000) => {
    const newToast: Toast = {
      id: uuidv4(),
      type,
      message,
      duration,
      creationTime: Date.now(),
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToasts = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToasts must be used within a ToastProvider');
  }
  return context;
};
