import api from '../lib/api';

export interface BorrowRequestData {
  itemName: string;
  reason: string;
  budgetRange: string;
  neededFor: string;
}

export const borrowService = {
  async getAll(filters?: { status?: string; page?: number; limit?: number }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    const response = await api.get(`/borrow?${params.toString()}`);
    return response.data;
  },

  async create(data: BorrowRequestData) {
    const response = await api.post('/borrow', data);
    return response.data;
  },

  async update(id: string, data: Partial<BorrowRequestData>) {
    const response = await api.put(`/borrow/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/borrow/${id}`);
    return response.data;
  },

  async getMyRequests() {
    const response = await api.get('/borrow/user/requests');
    return response.data;
  },

  async respond(id: string, responseType: 'accept' | 'reject') {
    const response = await api.post(`/borrow/${id}/respond`, { response: responseType });
    return response.data;
  },
};