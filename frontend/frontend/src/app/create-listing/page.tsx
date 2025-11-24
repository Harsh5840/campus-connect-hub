"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Upload, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

export default function CreateListing() {
	const [images, setImages] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			// Limit to 4 images max
			const newImages = Array.from(files)
				.slice(0, 4 - images.length)
				.map(file => URL.createObjectURL(file));
			setImages([...images, ...newImages]);
		}
	};

	const removeImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		setIsSubmitting(true);

		try {
			const formData = new FormData(e.currentTarget);
			console.log("Listing submitted:", Object.fromEntries(formData));
			// TODO: Call API to create listing
		} catch {
			setErrors({ submit: "Failed to create listing. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="container mx-auto px-4 pt-24 pb-20">
				<div className="max-w-3xl mx-auto">
					<a href="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
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
						<form className="space-y-6" onSubmit={handleSubmit}>
							{errors.submit && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{errors.submit}</AlertDescription>
								</Alert>
							)}

							<div className="space-y-2">
								<Label>Upload Images (Max 4)</Label>
								<div className="grid grid-cols-4 gap-4">
									{images.map((image, index) => (
										<div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
											<Image src={image} alt={`Upload ${index + 1}`} fill className="object-cover" />
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
												aria-label={`Remove image ${index + 1}`}
											>
												<X className="h-6 w-6 text-white" />
											</button>
										</div>
									))}
									{images.length < 4 && (
										<label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-foreground/50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
											<Upload className="h-6 w-6 text-muted-foreground" />
											<span className="text-xs text-muted-foreground text-center">Upload</span>
											<input
												type="file"
												accept="image/*"
												multiple
												className="hidden"
												onChange={handleImageUpload}
												aria-label="Upload product images"
											/>
										</label>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									name="title"
									placeholder="Engineering Textbook"
									disabled={isSubmitting}
									required
									aria-invalid={!!errors.title}
								/>
								{errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea 
									id="description" 
									name="description"
									placeholder="Describe your item in detail..."
									rows={4}
									disabled={isSubmitting}
								/>
							</div>

							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="category">Category *</Label>
									<Select required>
										<SelectTrigger id="category" name="category" aria-invalid={!!errors.category}>
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
									{errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="condition">Condition *</Label>
									<Select required>
										<SelectTrigger id="condition" name="condition" aria-invalid={!!errors.condition}>
											<SelectValue placeholder="Select condition" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="new">New</SelectItem>
											<SelectItem value="like-new">Like New</SelectItem>
											<SelectItem value="good">Good</SelectItem>
											<SelectItem value="fair">Fair</SelectItem>
										</SelectContent>
									</Select>
									{errors.condition && <p className="text-sm text-destructive">{errors.condition}</p>}
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Label htmlFor="price">Price (₹) *</Label>
									<Input
										id="price"
										name="price"
										type="number"
										placeholder="500"
										disabled={isSubmitting}
										required
										aria-invalid={!!errors.price}
									/>
									{errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="location">Location / Hostel *</Label>
									<Select required>
										<SelectTrigger id="location" name="location" aria-invalid={!!errors.location}>
											<SelectValue placeholder="Select hostel" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="h1">Hostel 1</SelectItem>
											<SelectItem value="h2">Hostel 2</SelectItem>
											<SelectItem value="h3">Hostel 3</SelectItem>
											<SelectItem value="h4">Hostel 4</SelectItem>
										</SelectContent>
									</Select>
									{errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
								<Input
									id="whatsapp"
									name="whatsapp"
									type="tel"
									placeholder="+91 98765 43210"
									disabled={isSubmitting}
								/>
							</div>

							<div className="flex gap-4 pt-4">
								<Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
									{isSubmitting ? "Publishing..." : "Publish Listing"}
								</Button>
								<a href="/marketplace" className="flex-1">
									<Button type="button" variant="outline" className="w-full" size="lg" disabled={isSubmitting}>
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
