"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useState } from "react";

export default function CreateListing() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to marketplace
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
            <p className="text-muted-foreground">
              List your item for sale on the marketplace
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Images (Max 5)</Label>
                <div className="border-2 border-dashed border-border rounded-3xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-5 gap-4 mt-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1 hover:bg-background"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Scientific Calculator" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the item, condition, and any details..."
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
                      <SelectItem value="textbooks">Textbooks</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
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
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="₹100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
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
                <Link href="/marketplace" className="flex-1">
                  <Button type="button" variant="outline" className="w-full" size="lg">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
