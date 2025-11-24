'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { SiteHeader } from "@/src/components/site-header"
import { SiteFooter } from "@/src/components/site-footer"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Search, Plus, MapPin, Moon } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
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

  const sampleProducts = [
    {
      id: 1,
      title: "Introduction to Algorithms (CLRS)",
      price: "₹800",
      condition: "Good",
      location: "Hostel A",
      image: "/algorithms-textbook.jpg",
    },
    {
      id: 2,
      title: "Scientific Calculator Casio FX-991ES",
      price: "₹600",
      condition: "Like New",
      location: "Hostel B",
      image: "/scientific-calculator.jpg",
    },
    {
      id: 3,
      title: "Study Lamp with USB Port",
      price: "₹400",
      condition: "Excellent",
      location: "Hostel C",
      image: "/desk-study-lamp.jpg",
    },
    {
      id: 4,
      title: "Formal Blazer - Size M",
      price: "₹1200",
      condition: "Good",
      location: "Girls Hostel 1",
      image: "/formal-blazer.jpg",
    },
    {
      id: 5,
      title: "Data Structures Notes (Handwritten)",
      price: "₹250",
      condition: "Good",
      location: "Library Area",
      image: "/handwritten-notes.png",
    },
    {
      id: 6,
      title: "Bluetooth Headphones JBL",
      price: "₹1500",
      condition: "Good",
      location: "Hostel D",
      image: "/bluetooth-headphones.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Section */}
        <div className="border-b bg-muted/30">
          <div className="container py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                <p className="text-muted-foreground">Discover great deals from fellow students</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" asChild className="gap-2 bg-transparent">
                  <Link href="/night-market">
                    <Moon className="h-4 w-4" />
                    Night Market
                  </Link>
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/sell">
                    <Plus className="h-4 w-4" />
                    Sell Item
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="container py-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search for items..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="books">Books & Notes</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="food">Food & Snacks</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="container pb-16">
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">My Listings</TabsTrigger>
              <TabsTrigger value="rent">Rent Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sampleProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="font-semibold leading-tight text-pretty">{product.title}</h3>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.condition}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {product.location}
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{product.price}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full bg-transparent" variant="outline">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sell">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No listings yet</h3>
                <p className="mb-6 text-muted-foreground">Start selling items to see them here</p>
                <Button asChild>
                  <Link href="/sell">Create Listing</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rent">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No rent requests</h3>
                <p className="mb-6 text-muted-foreground">Create a request when you need to borrow something</p>
                <Button asChild>
                  <Link href="/rent-request">Create Request</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
  const sampleProducts = [
    {
      id: 1,
      title: "Introduction to Algorithms (CLRS)",
      price: "₹800",
      condition: "Good",
      location: "Hostel A",
      image: "/algorithms-textbook.jpg",
    },
    {
      id: 2,
      title: "Scientific Calculator Casio FX-991ES",
      price: "₹600",
      condition: "Like New",
      location: "Hostel B",
      image: "/scientific-calculator.jpg",
    },
    {
      id: 3,
      title: "Study Lamp with USB Port",
      price: "₹400",
      condition: "Excellent",
      location: "Hostel C",
      image: "/desk-study-lamp.jpg",
    },
    {
      id: 4,
      title: "Formal Blazer - Size M",
      price: "₹1200",
      condition: "Good",
      location: "Girls Hostel 1",
      image: "/formal-blazer.jpg",
    },
    {
      id: 5,
      title: "Data Structures Notes (Handwritten)",
      price: "₹250",
      condition: "Good",
      location: "Library Area",
      image: "/handwritten-notes.png",
    },
    {
      id: 6,
      title: "Bluetooth Headphones JBL",
      price: "₹1500",
      condition: "Good",
      location: "Hostel D",
      image: "/bluetooth-headphones.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header Section */}
        <div className="border-b bg-muted/30">
          <div className="container py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                <p className="text-muted-foreground">Discover great deals from fellow students</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" asChild className="gap-2 bg-transparent">
                  <Link href="/night-market">
                    <Moon className="h-4 w-4" />
                    Night Market
                  </Link>
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/sell">
                    <Plus className="h-4 w-4" />
                    Sell Item
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="container py-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search for items..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="books">Books & Notes</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="food">Food & Snacks</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="container pb-16">
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">My Listings</TabsTrigger>
              <TabsTrigger value="rent">Rent Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sampleProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="font-semibold leading-tight text-pretty">{product.title}</h3>
                      </div>
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.condition}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {product.location}
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{product.price}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full bg-transparent" variant="outline">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sell">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No listings yet</h3>
                <p className="mb-6 text-muted-foreground">Start selling items to see them here</p>
                <Button asChild>
                  <Link href="/sell">Create Listing</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rent">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No rent requests</h3>
                <p className="mb-6 text-muted-foreground">Create a request when you need to borrow something</p>
                <Button asChild>
                  <Link href="/rent-request">Create Request</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
