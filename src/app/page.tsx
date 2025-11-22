import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ShoppingBag, Clock, Package } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 opacity-5">
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Buy • Sell • Rent<br />
            Night Market
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Your campus marketplace, re-imagined.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/marketplace">
              <Button size="lg" className="h-12 px-8 rounded-full">
                Browse Marketplace
              </Button>
            </Link>
            <Link href="/marketplace?tab=night-market">
              <Button size="lg" variant="secondary" className="h-12 px-8 rounded-full">
                Night Market
              </Button>
            </Link>
            <Link href="/create-listing">
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full">
                Post Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Buy & Sell</h3>
              <p className="text-muted-foreground text-sm">
                Find great deals on textbooks, electronics, and more from fellow students
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Rent & Borrow</h3>
              <p className="text-muted-foreground text-sm">
                Request items you need for short-term use, save money on occasional needs
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Night Market</h3>
              <p className="text-muted-foreground text-sm">
                Late-night cravings? Find snacks, noodles, and essentials available in hostels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start trading?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join your campus community and discover a smarter way to buy, sell, and share.
          </p>
          <Link href="/auth">
            <Button size="lg" className="h-12 px-8 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CampusThrift. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
}
