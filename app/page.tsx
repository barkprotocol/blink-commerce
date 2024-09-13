import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Truck, Shield, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-center text-white flex items-center">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to BARK E-commerce
            </h1>
            <p className="text-gray-300 md:text-xl">
              Your one-stop shop for all things BARK. Quality products, fast delivery, and excellent customer service.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-center">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            <FeatureCard
              icon={<ShoppingBag className="h-10 w-10 text-primary" />}
              title="Wide Selection"
              description="Browse through our extensive catalog of high-quality BARK products."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-primary" />}
              title="Fast Delivery"
              description="Enjoy quick and reliable shipping on all your BARK purchases."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Secure Shopping"
              description="Shop with confidence knowing your transactions are safe and secure."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {[
              { name: "BARK Chew Toy", price: 14.99, rating: 4.5, image: "/placeholder.svg" },
              { name: "BARK Dog Bed", price: 59.99, rating: 4.8, image: "/placeholder.svg" },
              { name: "BARK Dog Food", price: 39.99, rating: 4.7, image: "/placeholder.svg" },
            ].map((product, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48 rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>${product.price.toFixed(2)}</CardDescription>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground text-center">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Join the BARK Community
            </h2>
            <p className="text-primary-foreground/80 md:text-xl">
              Subscribe to our newsletter for exclusive offers, pet care tips, and new product announcements.
            </p>
            <div className="w-full max-w-md mx-auto">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-center">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to start shopping?
            </h2>
            <p className="text-gray-500 md:text-xl">
              Join thousands of satisfied customers and experience the BARK difference today.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Explore All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-gray-500">{description}</p>
    </div>
  );
}
