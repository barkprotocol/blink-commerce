"use client";

import { useState } from 'react';
import { Button } from './button'; // Adjust the import path according to your project structure
import Input from './input'; // Adjust the import path according to your project structure

// Subscription Component
const Subscription = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    
    try {
      // Replace with actual subscription logic
      console.log('Subscribed:', email);
      setEmail('');
      setStatus('success');
    } catch (error) {
      console.error('Subscription failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 text-center">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
          Stay Updated
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Subscribe to our newsletter to get the latest updates and exclusive offers.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="mt-4 md:mt-0 md:ml-4 bg-black text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Subscribe
          </Button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-green-600 dark:text-green-400">Thank you for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
};

export default Subscription;
