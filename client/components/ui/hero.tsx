// components/ui/hero.tsx

"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative bg-black text-white py-20">
      <div className="container px-4 mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to BARK Protocol
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover exclusive NFTs, manage your assets, and connect with our community.
        </p>
        <div className="flex space-x-4">
          <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
            Collection
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 transition-colors">
            Mint NFT
          </Button>
        </div>
      </div>
      <div className="absolute inset-0">
        <Image
          src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
    </section>
  );
};

export default Hero;
