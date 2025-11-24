import { z } from 'zod';

// User schemas
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  campus: z.string().optional(),
  hostel: z.string().optional(),
  role: z.enum(['STUDENT', 'ADMIN']).default('STUDENT'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  campus: z.string().optional(),
  hostel: z.string().optional(),
});

// Listing schemas
export const listingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  condition: z.string().min(1),
  negotiable: z.boolean().default(false),
});

export const updateListingSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  condition: z.string().min(1).optional(),
  negotiable: z.boolean().optional(),
  status: z.enum(['AVAILABLE', 'SOLD']).optional(),
});

// Borrow request schemas
export const borrowRequestSchema = z.object({
  itemName: z.string().min(1),
  reason: z.string().min(1),
  budgetRange: z.string().min(1),
  neededFor: z.string().min(1),
});

export const updateBorrowRequestSchema = z.object({
  status: z.enum(['OPEN', 'FULFILLED']).optional(),
});

// Night market schemas
export const nightMarketPostSchema = z.object({
  item: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  hostel: z.string().min(1),
});

export const updateNightMarketPostSchema = z.object({
  price: z.number().positive().optional(),
  quantity: z.number().int().positive().optional(),
  isAvailable: z.boolean().optional(),
});

// Search and filter schemas
export const searchListingsSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  hostel: z.string().optional(),
  sortBy: z.enum(['newest', 'price_asc', 'price_desc']).default('newest'),
  page: z.string().transform(Number).default(1),
  limit: z.string().transform(Number).default(10),
});