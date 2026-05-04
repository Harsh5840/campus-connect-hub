import axios from 'axios';

const API_URL = 'http://localhost:5000';
let accessToken = '';
let userId = '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to make requests
const testRoute = async (method: string, route: string, data?: any, authenticated: boolean = false) => {
  try {
    if (authenticated && accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    let response;
    if (method === 'GET') {
      response = await api.get(route);
    } else if (method === 'POST') {
      response = await api.post(route, data);
    } else if (method === 'PUT') {
      response = await api.put(route, data);
    } else if (method === 'DELETE') {
      response = await api.delete(route);
    }

    console.log(`✓ ${method} ${route} - Status: ${response?.status}`);
    return response?.data;
  } catch (error: any) {
    console.log(`✗ ${method} ${route} - Error: ${error.response?.status} ${error.response?.data?.error || error.message}`);
    return null;
  }
};

const runTests = async () => {
  console.log('🚀 Starting API Tests...\n');

  // Test 1: Health Check
  console.log('--- Health Check ---');
  await testRoute('GET', '/health');

  // Test 2: Register a new user
  console.log('\n--- Auth Routes ---');
  const testUser = {
    name: 'Test User',
    email: `testuser${Date.now()}@test.com`,
    password: 'Test@1234',
  };

  const registerData = await testRoute('POST', '/auth/register', testUser);
  if (registerData?.accessToken) {
    accessToken = registerData.accessToken;
    userId = registerData.user.id;
    console.log(`✓ Registered user with ID: ${userId}`);
  }

  // Test 3: Login
  const loginData = await testRoute('POST', '/auth/login', {
    email: testUser.email,
    password: testUser.password,
  });
  if (loginData?.accessToken) {
    accessToken = loginData.accessToken;
    console.log(`✓ Login successful`);
  }

  // Test 4: Get Profile
  await testRoute('GET', '/auth/profile', undefined, true);

  // Test 5: AI Routes
  console.log('\n--- AI Routes ---');
  const descriptionData = await testRoute('POST', '/ai/generate-description', {
    title: 'Introduction to Algorithms Textbook',
  }, true);
  if (descriptionData?.description) {
    console.log(`✓ Generated description: ${descriptionData.description.substring(0, 100)}...`);
  }

  // Test 6: Listings Routes
  console.log('\n--- Listings Routes ---');
  await testRoute('GET', '/listings');

  const listingData = await testRoute('POST', '/listings', {
    title: 'Test Textbook',
    description: 'A great textbook for learning',
    category: 'books',
    condition: 'like-new',
    price: 500,
    location: 'hostel-a',
    imageUrls: [],
  }, true);

  if (listingData?.id) {
    console.log(`✓ Created listing with ID: ${listingData.id}`);
  }

  // Test 7: Borrow Routes
  console.log('\n--- Borrow Routes ---');
  await testRoute('GET', '/borrow');

  // Test 8: Night Market Routes
  console.log('\n--- Night Market Routes ---');
  await testRoute('GET', '/night-market');

  // Test 9: Share Routes
  console.log('\n--- Share Routes ---');
  await testRoute('GET', '/share');

  console.log('\n✅ API Tests Completed!');
};

runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
