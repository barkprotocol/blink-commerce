"use client";

import React, { useState } from 'react';
import { useToast } from '../hooks/use-toasts';
import { processPayment } from '../actions/payment';

const PaymentForm: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!orderId.trim()) {
      addToast('error', 'Order ID is required.');
      return;
    }

    setLoading(true);
    try {
      const response = await processPayment(orderId);
      if (response.success) {
        addToast('success', response.message || 'Payment processed successfully.');
      } else {
        addToast('error', response.message || 'Failed to process payment.');
      }
    } catch (error) {
      addToast('error', `Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Process Payment</h2>
      <div className="mb-4">
        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
          Order ID
        </label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
          aria-required="true"
          aria-describedby="orderIdHelp"
        />
        <p id="orderIdHelp" className="text-sm text-gray-500">
          Enter the order ID to process the payment.
        </p>
      </div>
      <button 
        type="submit" 
        className={`px-4 py-2 rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white'}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Process Payment'}
      </button>
    </form>
  );
};

export default PaymentForm;
