'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { SiteHeader } from "@/src/components/site-header"
import { SiteFooter } from "@/src/components/site-footer"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Moon, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function NightMarketPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const nightMarketItems = [
    {
      id: 1,
      seller: "Priya K.",
      item: "Maggi Noodles Pack (4pc)",
      price: "₹60",
      location: "Hostel A - Room 214",
      time: "5 mins ago",
      image: "/maggi-noodles-pack.jpg",
    },
    {
      id: 2,
      seller: "Rahul M.",
      item: "Oreo Biscuits",
      price: "₹30",
      location: "Hostel B - Room 105",
      time: "12 mins ago",
      image: "/oreo-biscuits.jpg",
    },
    {
      id: 3,
      seller: "Ananya S.",
      item: "Kurkure + Lays Combo",
      price: "₹50",
      location: "Girls Hostel 1 - Room 312",
      time: "18 mins ago",
      image: "/assorted-chips.png",
    },
    {
      id: 4,
      seller: "Arjun P.",
      item: "Red Bull Energy Drink",
      price: "₹120",
      location: "Hostel C - Room 420",
      time: "25 mins ago",
      image: "/vibrant-energy-drink.png",
    },
    {
      id: 5,
      seller: "Meera R.",
      item: "Pack of Pens (Blue & Black)",
      price: "₹40",
      location: "Girls Hostel 2 - Room 201",
      time: "32 mins ago",
      image: "/ballpoint-pens.jpg",
    },
    {
      id: 6,
      seller: "Karan V.",
      item: "Instant Coffee Sachets (10pc)",
      price: "₹80",
      location: "Hostel D - Room 315",
      time: "40 mins ago",
      image: "/instant-coffee-sachets.jpg",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Section */}
        <div className="border-b bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <Moon className="h-8 w-8 text-primary-foreground" />
              </div>
              <Badge variant="secondary" className="mb-3">
                Live Now
              </Badge>
              <h1 className="mb-3 text-4xl font-bold tracking-tight">Night Market</h1>
              <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
                Late-night essentials from students in your hostel. Snacks, stationery, and more available for immediate
                pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="container py-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Available Now</h2>
              <p className="text-sm text-muted-foreground">Fresh listings from the last hour</p>
            </div>
            <Button asChild>
              <Link href="/sell">List Your Item</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nightMarketItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.item}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{item.item}</h3>
                    <p className="text-lg font-bold text-nowrap">{item.price}</p>
                  </div>
                  <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Seller: {item.seller}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Contact Seller</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State for no items */}
          {nightMarketItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Moon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No items available right now</h3>
              <p className="mb-6 text-muted-foreground">Be the first to list something!</p>
              <Button asChild>
                <Link href="/sell">List Your Item</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
