"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Truck, Shield, Star, Facebook, Instagram, Twitter } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import FeatureCard from '@/components/ui/feature-card';

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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 text-center dark:bg-gray-800 dark:text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            <FeatureCard
              icon={<ShoppingBag className="h-10 w-10 text-primary transition-transform transform hover:scale-110" />}
              title="Wide Selection"
              description="Browse through our extensive catalog of high-quality BARK products."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-primary transition-transform transform hover:scale-110" />}
              title="Fast Delivery"
              description="Enjoy quick and reliable shipping on all your BARK purchases."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary transition-transform transform hover:scale-110" />}
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
            ].map((product, index) => (
              <Card key={index} className="flex flex-col justify-between bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-transform transform hover:scale-105 dark:shadow-md">
                <CardHeader>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300} // Example width
                    height={200} // Example height
                    className="object-cover w-full h-48 rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>${product.price.toFixed(2)} (${product.priceUSDC.toFixed(2)} USDC)</CardDescription>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-800">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Streetwear of BARK */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Streetwear of BARK
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {[
              { name: "BARK Hoodie", price: 49.99, priceUSDC: 50.00, rating: 4.6, image: "/placeholder.svg", description: "Stylish and comfortable hoodie for everyday wear." },
              { name: "BARK T-Shirt", price: 29.99, priceUSDC: 30.00, rating: 4.4, image: "/placeholder.svg", description: "Casual T-shirt with a bold BARK logo." },
              { name: "BARK Cap", price: 19.99, priceUSDC: 20.00, rating: 4.7, image: "/placeholder.svg", description: "Trendy cap to complete your streetwear look." },
            ].map((product, index) => (
              <Card key={index} className="flex flex-col justify-between bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-transform transform hover:scale-105 dark:shadow-md">
                <CardHeader>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300} // Example width
                    height={200} // Example height
                    className="object-cover w-full h-48 rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>${product.price.toFixed(2)} (${product.priceUSDC.toFixed(2)} USDC)</CardDescription>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-800">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white flex items-center justify-center">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter to get the latest updates and exclusive offers.
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 w-full md:w-64 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              className="mt-4 md:mt-0 md:ml-4 bg-primary text-white hover:bg-primary-dark"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-8">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
