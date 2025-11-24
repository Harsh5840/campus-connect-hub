import api from '../lib/api';

export interface ListingFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  hostel?: string;
  sortBy?: 'newest' | 'price_asc' | 'price_desc';
  page?: number;
  limit?: number;
}

export const listingService = {
  async getAll(filters?: ListingFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    const response = await api.get(`/listings?${params.toString()}`);
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  async create(data: FormData) {
    const response = await api.post('/listings', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, data: Record<string, unknown>) {
    const response = await api.put(`/listings/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  },

  async getMyListings() {
    const response = await api.get('/listings/user/listings');
    return response.data;
  },
};