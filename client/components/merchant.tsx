"use client";

import React from 'react';
import StoreForm from './StoreForm';
import ProductForm from './ProductForm';
import PaymentForm from './PaymentForm';
import RefundForm from './RefundForm';
import SettingsForm from './SettingsForm';

const MerchantPage: React.FC = () => {
  return (
    <div className="space-y-8 p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <main className="space-y-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create Store</h2>
          <StoreForm />
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">List Product</h2>
          <ProductForm />
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Process Payment</h2>
          <PaymentForm />
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Initiate Refund</h2>
          <RefundForm />
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <SettingsForm />
        </section>
      </main>
    </div>
  );
};

export default MerchantPage;
