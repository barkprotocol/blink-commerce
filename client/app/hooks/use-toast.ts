import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string; // Unique identifier for each toast
  type: 'success' | 'error';
  message: string;
}

interface ToastContextType {
  addToast: (type: 'success' | 'error', message: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = new Date().getTime().toString(); // Generate a unique id based on timestamp
    const newToast = { id, type, message };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      {/* Render toast notifications */}
      <div className="fixed bottom-0 right-0 m-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
