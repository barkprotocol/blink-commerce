"use client";

import React, { useState } from 'react';
import { useToast } from '../hooks/use-toasts';
import { initiateRefund } from '../actions/refund';

const RefundForm: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!orderId.trim()) {
      addToast('error', 'Order ID cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const response = await initiateRefund(orderId);
      if (response.success) {
        addToast('success', response.message || 'Refund initiated successfully.');
        setOrderId(''); // Clear the input field after successful submission
      } else {
        addToast('error', response.message || 'Failed to initiate refund.');
      }
    } catch (error) {
      addToast('error', `Failed to initiate refund: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Initiate Refund</h2>
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
        />
      </div>
      <button 
        type="submit" 
        className={`px-4 py-2 rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white'}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Initiate Refund'}
      </button>
    </form>
  );
};

export default RefundForm;
