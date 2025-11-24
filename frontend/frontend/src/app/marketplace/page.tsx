"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Plus, Search, Filter } from "lucide-react";
import sampleBook from "@/assets/sample-book.jpg";
import sampleCalculator from "@/assets/sample-calculator.jpg";
import sampleSnacks from "@/assets/sample-snacks.jpg";

export default function Marketplace() {
	const defaultTab = "buy";
	const [activeTab, setActiveTab] = useState(defaultTab);
	const [searchQuery, setSearchQuery] = useState("");

	const sampleProducts = useMemo(
		() => [
			{
				image: sampleBook,
				title: "Engineering Mathematics Textbook",
				price: "₹500",
				location: "Block A, Hostel 3",
				condition: "Good",
			},
			{
				image: sampleCalculator,
				title: "Scientific Calculator",
				price: "₹200",
				location: "Block B, Hostel 1",
				condition: "Like New",
			},
			{
				image: sampleSnacks,
				title: "Maggi & Snacks Bundle",
				price: "₹80",
				location: "Block C, Hostel 2",
				condition: "New",
			},
		],
		[],
	);

	const filteredProducts = useMemo(() => {
		return sampleProducts.filter((product) =>
			product.title.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, sampleProducts]);

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="container mx-auto px-4 pt-24 pb-20">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
					<div>
						<h1 className="text-3xl font-bold mb-2">Marketplace</h1>
						<p className="text-muted-foreground">
							Discover items from your campus community
						</p>
					</div>
					<a href="/create-listing">
						<Button className="rounded-full">
							<Plus className="h-4 w-4 mr-2" />
							Sell Item
						</Button>
					</a>
				</div>
				<div className="flex flex-col md:flex-row gap-4 mb-8">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input 
							placeholder="Search for items..." 
							className="pl-10 h-11"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							aria-label="Search products"
						/>
					</div>
					<Button variant="outline" className="h-11" aria-label="Open filters">
						<Filter className="h-4 w-4 mr-2" />
						Filters
					</Button>
				</div>
				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
					<TabsList className="w-full justify-start overflow-x-auto">
						<TabsTrigger value="buy">Buy</TabsTrigger>
						<TabsTrigger value="sell">My Listings</TabsTrigger>
						<TabsTrigger value="rent">Rent Requests</TabsTrigger>
						<TabsTrigger value="night-market">Night Market</TabsTrigger>
					</TabsList>
						{filteredProducts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{filteredProducts.map((product, index) => (
									<ProductCard key={index} {...product} />
								))}
							</div>
						) : (
							<div className="text-center py-20">
								<p className="text-muted-foreground">No items found matching your search</p>
							</div>
						)}
				<TabsContent value="sell" className="space-y-6">
					<div className="text-center py-20">
						<p className="text-muted-foreground mb-4">You haven&apos;t listed any items yet</p>
						<a href="/create-listing">
							<Button>Create Your First Listing</Button>
						</a>
					</div>
				</TabsContent>
					<TabsContent value="rent" className="space-y-6">
						<div className="flex justify-end mb-4">
							<a href="/create-rent-request">
								<Button variant="outline">
									<Plus className="h-4 w-4 mr-2" />
									New Request
								</Button>
							</a>
						</div>
						<div className="text-center py-20">
							<p className="text-muted-foreground">No rent requests available</p>
						</div>
					</TabsContent>
					<TabsContent value="night-market" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							<ProductCard
								image={sampleSnacks}
								title="Instant Noodles & Tea"
								price="₹50"
								location="Block A, Room 205"
								condition="Available Now"
							/>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
