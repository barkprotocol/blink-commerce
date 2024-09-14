"use client";

import React, { useState } from 'react';
import { useToast } from '../hooks/use-toasts';
import { createStore } from '../actions/store';

const StoreForm: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!storeName.trim()) {
      addToast('error', 'Store name cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('storeName', storeName);

      const response = await createStore(formData);
      if (response.success) {
        addToast('success', response.message || 'Store created successfully.');
        setStoreName(''); // Clear the form after successful submission
      } else {
        addToast('error', response.message || 'Failed to create store.');
      }
    } catch (error) {
      addToast('error', `Failed to create store: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Create New Store</h2>
      <div className="mb-4">
        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
          Store Name
        </label>
        <input
          type="text"
          id="storeName"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
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
        {loading ? 'Creating...' : 'Create Store'}
      </button>
    </form>
  );
};

export default StoreForm;
