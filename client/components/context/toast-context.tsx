import React from 'react';
import { Toast } from '../types/toast';
import { useToasts } from './toast-provider';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToasts();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg text-white ${getToastClass(toast.type)} fade-in-out`}
          role="alert"
        >
          {toast.message}
          <button onClick={() => removeToast(toast.id)} className="absolute top-2 right-2 text-white">
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

const getToastClass = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'info':
      return 'bg-blue-500';
    case 'order':
      return 'bg-yellow-500';
    case 'payment':
      return 'bg-teal-500';
    case 'transaction':
      return 'bg-purple-500';
    default:
      return '';
  }
};

export default ToastContainer;
