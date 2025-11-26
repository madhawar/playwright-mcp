import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';
import { config } from '../config/env.config';

export class UsersAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request, config.api.baseUrl);
  }

  async getAllItems() {
    return await this.get('/item');
  }

  async getItemById(userId: number) {
    return await this.get(`/users/${userId}`);
  }

  async createUser(userData: { name: string; email: string; role: string }) {
    return await this.post('/users', userData);
  }

  async updateUser(userId: number, userData: any) {
    return await this.put(`/users/${userId}`, userData);
  }

  async deleteUser(userId: number) {
    return await this.delete(`/users/${userId}`);
  }
}