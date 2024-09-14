"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Truck, Shield, Star, Facebook, Instagram, Twitter } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import FeatureCard from '@/components/ui/feature-card';
import Input from '@/components/ui/input'; // Ensure correct import path

// Subscription Component
const Subscription = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <div className="w-full py-16 md:py-24 bg-white text-center">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
          Stay Updated with BARK
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Sign up for our newsletter and get the latest updates on new collections, special offers, and more!
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full sm:w-auto max-w-md border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            required
          />
          <Button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

// Landing Page
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-black text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ucarecdn.com/92d4d7ea-f9d8-429c-bf68-6f3bc69c1c02/goldenshoppingcart.jpg"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 container px-4 md:px-6 mx-auto text-center">
          <div className="space-y-8 max-w-2xl mx-auto py-12 md:py-24 lg:py-32">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to BARK E-commerce
            </h1>
            <p className="text-gray-300 md:text-xl">
              Your one-stop shop for all things BARK. Quality products, fast delivery, and excellent customer service.
            </p>
            <div className="space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-800"
              >
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white hover:text-black dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 lg:py-32 bg-gray-100 text-center dark:bg-gray-800 dark:text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
            <FeatureCard
              icon={<ShoppingBag className="h-8 w-8 text-primary transition-transform transform hover:scale-110" />}
              title="Wide Selection"
              description="Browse through our extensive catalog of high-quality BARK products."
            />
            <FeatureCard
              icon={<Truck className="h-8 w-8 text-primary transition-transform transform hover:scale-110" />}
              title="Fast Delivery"
              description="Enjoy quick and reliable shipping on all your BARK purchases."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary transition-transform transform hover:scale-110" />}
              title="Secure Shopping"
              description="Shop with confidence knowing your transactions are safe and secure."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {[
              { name: "BARK Chew Toy", price: 14.99, priceUSDC: 15.00, rating: 4.5, image: "/placeholder.svg", description: "Durable and fun chew toy for your dog." },
              { name: "BARK Dog Bed", price: 59.99, priceUSDC: 60.00, rating: 4.8, image: "/placeholder.svg", description: "Comfortable and stylish bed for a good night's sleep." },
              { name: "BARK Dog Food", price: 39.99, priceUSDC: 40.00, rating: 4.7, image: "/placeholder.svg", description: "Nutritional and tasty food for your furry friend." },
              { name: "BARK Dog Collar", price: 24.99, priceUSDC: 25.00, rating: 4.6, image: "/placeholder.svg", description: "Adjustable and durable collar for your dog." },
              { name: "BARK Hoodie", price: 49.99, priceUSDC: 50.00, rating: 4.6, image: "/placeholder.svg", description: "Stylish and comfortable hoodie for everyday wear." },
              { name: "BARK T-Shirt", price: 29.99, priceUSDC: 30.00, rating: 4.4, image: "/placeholder.svg", description: "Casual T-shirt with a bold BARK logo." },
            ].map((product, index) => (
              <Card key={index} className="flex flex-col justify-between bg-white dark:bg-gray-900 shadow-md rounded-lg transition-transform transform hover:scale-105 dark:shadow-lg">
                <CardHeader>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200} // Example width
                    height={150} // Example height
                    className="object-cover w-full h-32 rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                  <CardDescription className="text-sm">${product.price.toFixed(2)} (${product.priceUSDC.toFixed(2)} USDC)</CardDescription>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <Subscription />

      {/* Social Media */}
      <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h3 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
            Follow Us
          </h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-black text-white text-center">
        <div className="container px-4 md:px-6 mx-auto">
          <p className="text-sm">&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by Solana</p>
        </div>
      </footer>
    </div>
  );
}
