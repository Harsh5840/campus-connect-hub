import api from '../lib/api';

export interface NightMarketPostData {
  item: string;
  price: number;
  quantity: number;
  hostel: string;
}

export const nightMarketService = {
  async getAll() {
    const response = await api.get('/night-market');
    return response.data;
  },

  async create(data: NightMarketPostData) {
    const response = await api.post('/night-market', data);
    return response.data;
  },

  async update(id: string, data: Partial<NightMarketPostData>) {
    const response = await api.put(`/night-market/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/night-market/${id}`);
    return response.data;
  },

  async getMyPosts() {
    const response = await api.get('/night-market/user/posts');
    return response.data;
  },
};