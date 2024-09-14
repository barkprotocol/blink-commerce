"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SubscriptionForm() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle subscription logic here
      console.log('Subscribed with email:', email);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 rounded-md border border-gray-300 bg-gray-800 text-white"
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors">
        Subscribe
      </Button>
    </form>
  );
}

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container px-4 mx-auto flex flex-col items-center">
        <SubscriptionForm />
        <div className="mt-4">
          <Link href="/privacy-policy" className="text-white hover:underline">Privacy Policy</Link>
          <Link href="/terms-of-use" className="text-white hover:underline ml-4">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
