"use client";

import { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from './button';
import { X } from 'lucide-react';

export default function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        className="bg-transparent text-white border-2 border-white rounded-md px-4 py-2"
        onClick={handleOpenModal}
      >
        Connect Wallet
      </Button>

      {/* Modal for Wallet Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white text-black p-6 rounded-md relative max-w-sm w-full">
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
    </>
  );
}
