import { APIRequestContext, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BaseAPI {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string, options?: any) {
    Logger.info(`GET request to: ${this.baseUrl}${endpoint}`);
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, options);
    return response;
  }

  async post(endpoint: string, data?: any, options?: any) {
    Logger.info(`POST request to: ${this.baseUrl}${endpoint}`);
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      ...options,
    });
    return response;
  }

  async put(endpoint: string, data?: any, options?: any) {
    Logger.info(`PUT request to: ${this.baseUrl}${endpoint}`);
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
      data,
      ...options,
    });
    return response;
  }

  async delete(endpoint: string, options?: any) {
    Logger.info(`DELETE request to: ${this.baseUrl}${endpoint}`);
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, options);
    return response;
  }

  async validateStatusCode(response: any, expectedStatus: number): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  async getResponseBody(response: any): Promise<any> {
    return await response.json();
  }
}
