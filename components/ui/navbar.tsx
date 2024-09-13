"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectWallet = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="w-full bg-black text-white py-4">
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
            alt="BARK Logo"
            width={120}
            height={40}
          />
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:items-center`}>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <Link href="/products" className="text-white hover:underline" aria-label="Products">Products</Link>
            <Link href="/about" className="text-white hover:underline" aria-label="About Us">About Us</Link>
            <Link href="/contact" className="text-white hover:underline" aria-label="Contact">Contact</Link>
          </div>
          <div className="flex items-center space-x-4 ml-4 md:ml-6">
            <Button 
              className="bg-transparent text-white border-2 border-white rounded-md px-4 py-2"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
            <Link href="/cart" aria-label="Cart">
              <Button variant="outline" className="bg-white text-black border-white rounded-md">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Wallet Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white text-black p-6 rounded-md relative">
            <button 
              className="absolute top-2 right-2 text-black" 
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <WalletMultiButton />
          </div>
        </div>
      )}
    </nav>
  );
}
