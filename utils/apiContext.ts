import { request, APIRequestContext } from '@playwright/test';
let apiContext: APIRequestContext;

export const getApiContext = async (): Promise<APIRequestContext> => {
  if (!apiContext) {
   const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  Authorization: process.env.AUTH_TOKEN || '',
  Cookie: [
    '.AspNetCore.Antiforgery.AsW4q1BB7-Y=CfDJ8Ag59PU1ZK1MsrODN5sbAr1BQhmnIatJpX4rSuKr6GaKPoWhKW_8TFRzE0V2dS-KnL-RRnpvAbcd0L9ouccsufXi_STX7XDYOtRTDLMy0IP2cgjgg4ohynadCwj2Hv6Jhx3UOAvmBTXNZ2gL4bhB7P0',
    '.AspNetCore.Cookies=CfDJ8Ag59PU1ZK1MsrODN5sbAr1yV4bQ7nobq9UMVGvpuCUjqlQQoUa-xKe7zTVPqn7b7Jf6uk8NRmu6ob3CTbCjeN3xC2KO__tuUPzzSA_KxitiR3bDLl2ZsJIVpw7FjIglPg9hxCex1rCbz8h836WuXn-J58mog4qTFnn09e8TjJX9_p1ebSkmKhh85OukN8EOoSWvdn8w-OuApqbClGk46qzc0EudHquXirD9njtHAV68RU7mM9TPmj6rCsou7I3HnTVdwlRWCQ620CgG2pNNaFFGgu0ORIV7LsdUsSMXkIEm'
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