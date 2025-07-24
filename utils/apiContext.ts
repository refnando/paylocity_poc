import { request, APIRequestContext } from '@playwright/test';
let apiContext: APIRequestContext;

export const getApiContext = async (): Promise<APIRequestContext> => {
  if (!apiContext) {
   const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  Authorization: process.env.AUTH_TOKEN || '',
  Cookie: [
    process.env.ANTIFORGERY_COOKIE,
    process.env.ASPNETCORE_COOKIES,
    process.env.ANTIFORGERY_COOKIE ? `Antiforgery=${process.env.ANTIFORGERY_COOKIE}` : '',
    process.env.ASPNETCORE_COOKIES ? `ASPNETCORE_COOKIES=${process.env.ASPNETCORE_COOKIES}` : '',
    ].join('; ')
};

    console.log('🔐 Headers enviados:', headers);

    apiContext = await request.newContext({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: headers,
    });
  }
  return apiContext;
};