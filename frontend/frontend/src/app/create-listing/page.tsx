"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";

export default function CreateListing() {
	const [images, setImages] = useState<string[]>([]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newImages = Array.from(files).map(file => URL.createObjectURL(file));
			setImages([...images, ...newImages]);
		}
	};

	const removeImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
	};

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="container mx-auto px-4 pt-24 pb-20">
				<div className="max-w-3xl mx-auto">
					<a href="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
						<ArrowLeft className="h-4 w-4" />
						Back to marketplace
					</a>
					<div className="mb-8">
						<h1 className="text-3xl font-bold mb-2">Create Listing</h1>
						<p className="text-muted-foreground">
							List your item for sale on the marketplace
						</p>
					</div>
					<Card className="p-8">
						<form className="space-y-6">
							<div className="space-y-2">
								<Label>Upload Images</Label>
								<div className="grid grid-cols-4 gap-4">
									{images.map((image, index) => (
										<div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
											<Image src={image} alt={`Upload ${index + 1}`} fill className="object-cover" />
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="absolute top-2 right-2 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background z-10"
											>
												<X className="h-4 w-4" />
											</button>
										</div>
									))}
									{images.length < 4 && (
										<label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-foreground/50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
											<Upload className="h-6 w-6 text-muted-foreground" />
											<span className="text-xs text-muted-foreground">Upload</span>
											<input
												type="file"
												accept="image/*"
												multiple
												className="hidden"
												onChange={handleImageUpload}
											/>
										</label>
									)}
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input id="title" placeholder="Engineering Textbook" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea 
									id="description" 
									placeholder="Describe your item in detail..."
									rows={4}
								/>
							</div>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="books">Books</SelectItem>
											<SelectItem value="electronics">Electronics</SelectItem>
											<SelectItem value="furniture">Furniture</SelectItem>
											<SelectItem value="clothing">Clothing</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="condition">Condition</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select condition" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="new">New</SelectItem>
											<SelectItem value="like-new">Like New</SelectItem>
											<SelectItem value="good">Good</SelectItem>
											<SelectItem value="fair">Fair</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="price">Price (₹)</Label>
									<Input id="price" type="number" placeholder="500" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="location">Location / Hostel</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select hostel" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="h1">Hostel 1</SelectItem>
											<SelectItem value="h2">Hostel 2</SelectItem>
											<SelectItem value="h3">Hostel 3</SelectItem>
											<SelectItem value="h4">Hostel 4</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
								<Input id="whatsapp" type="tel" placeholder="+91 98765 43210" />
							</div>
							<div className="flex gap-4 pt-4">
								<Button type="submit" className="flex-1" size="lg">
									Publish Listing
								</Button>
								<a href="/marketplace" className="flex-1">
									<Button type="button" variant="outline" className="w-full" size="lg">
										Cancel
									</Button>
								</a>
							</div>
						</form>
					</Card>
				</div>
			</div>
		</div>
	);
}
