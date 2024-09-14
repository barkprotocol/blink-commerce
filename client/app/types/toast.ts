export type ToastType = 'success' | 'error' | 'info' | 'order' | 'payment' | 'transaction';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // Optional duration in milliseconds
  creationTime?: number; // Optional timestamp when the toast was created
}
