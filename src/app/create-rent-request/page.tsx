"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Calendar } from "lucide-react";

export default function CreateRentRequest() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link href="/marketplace?tab=rent" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to rent requests
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Rent Request</h1>
            <p className="text-muted-foreground">
              Request to borrow an item from fellow students
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">What do you need?</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Scientific Calculator, Bike, etc." 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description & Reason</Label>
                <Textarea 
                  id="description" 
                  placeholder="Why do you need this item and how will you use it?"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-date" className="text-xs text-muted-foreground">
                      From
                    </Label>
                    <div className="relative">
                      <Input id="from-date" type="date" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-date" className="text-xs text-muted-foreground">
                      To
                    </Label>
                    <div className="relative">
                      <Input id="to-date" type="date" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (Optional)</Label>
                  <Input id="budget" type="number" placeholder="₹100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
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

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg">
                  Publish Request
                </Button>
                <Link href="/marketplace?tab=rent" className="flex-1">
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
