// __tests__/authRoutes.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Auth Routes', () => {
  let token = '';

  beforeAll(async () => {
    // Register a user for testing
    await request(app)
      .post('/api/register')
      .send({ username: 'testuser', password: 'password123' });

    // Login to get the token
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'password123' });

    token = response.body.token;
  });

  // test('should register a user successfully', async () => {
  //   const response = await request(app)
  //     .post('/api/register')
  //     .send({ username: 'newuser', password: 'password123' });

  //   expect(response.status).toBe(201);
  //   expect(response.body.message).toBe('User registered successfully');
  // });

  test('should login a user and return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('should fail to login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid credentials');
  });
});
