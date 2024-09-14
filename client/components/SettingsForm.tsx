"use client";

import React, { useState } from 'react';
import { useToast } from '../hooks/use-toasts';

const SettingsForm: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [paymentProviders, setPaymentProviders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!storeName.trim() || !walletAddress.trim()) {
      addToast('error', 'Store name and wallet address are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/updateSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName,
          storeDescription,
          storeLogo,
          walletAddress,
          paymentProviders,
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        addToast('success', result.message);
      } else {
        addToast('error', result.message || 'Failed to update settings');
      }
    } catch (error) {
      addToast('error', `Failed to update settings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Store Settings</h2>
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
          aria-required="true"
          placeholder="Enter store name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
          Store Description
        </label>
        <textarea
          id="storeDescription"
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter store description"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="storeLogo" className="block text-sm font-medium text-gray-700">
          Store Logo URL
        </label>
        <input
          type="text"
          id="storeLogo"
          value={storeLogo}
          onChange={(e) => setStoreLogo(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter logo URL"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
          Merchant Wallet Address
        </label>
        <input
          type="text"
          id="walletAddress"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          aria-required="true"
          placeholder="Enter SOL wallet address"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="paymentProviders" className="block text-sm font-medium text-gray-700">
          Payment Providers (Comma-separated)
        </label>
        <input
          type="text"
          id="paymentProviders"
          value={paymentProviders.join(', ')}
          onChange={(e) => setPaymentProviders(e.target.value.split(',').map(provider => provider.trim()))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter payment providers"
        />
      </div>
      <button
        type="submit"
        className={`px-4 py-2 rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 text-white'}`}
        disabled={loading}
        aria-live="polite"
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">&#9696;</span>
            Saving...
          </>
        ) : (
          'Save Settings'
        )}
      </button>
    </form>
  );
};

export default SettingsForm;
