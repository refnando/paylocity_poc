import { request, APIRequestContext } from '@playwright/test';

export async function getApiContext(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      Authorization: process.env.AUTH_TOKEN || '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}