import { test } from '@playwright/test';
import { getApiContext } from '../utils/apiContext';

test('Debug API auth connection', async () => {
  const api = await getApiContext();

  const response = await api.get('/api/employees');

  console.log('📦 Status:', response.status());
  console.log('📄 Body:', await response.text());

  if (response.status() === 403) {
    console.error('❌ Access denied: Token may be malformed or not accepted');
  } else {
    console.log('✅ Auth worked!');
  }
});