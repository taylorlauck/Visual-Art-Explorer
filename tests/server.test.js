const request = require('supertest'); // Replace import statement with require
const app = require('../server'); // Adjust the path accordingly


describe('Endpoint Tests', () => {
  it('should add a new user', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User added successfully');
    // You might check for other specific data or keys in the response
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();
    // Check for expected user data or other relevant information in the response
  });

  it('should fetch user favorites', async () => {
    // Log in as the test user
    const loginResponse = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.favorites).toBeInstanceOf(Array);
    // Ensure the structure and content of favorites are as expected
  });

  // Additional tests for error scenarios, edge cases, etc.
});
