// __tests__/taskRoutes.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Task Routes', () => {
  let token = '';
  let taskId = '';

  beforeAll(async () => {
    // Register and login to get the token
    await request(app)
      .post('/api/register')
      .send({ username: 'testuser', password: 'password123' });

    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'password123' });

    token = response.body.token;
  });

  test('should create a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Task description', status: 'pending', dueDate: '2024-12-31' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
    expect(response.body.dueDate).toBe('2024-12-31');
    taskId = response.body._id;
  });

  test('should get all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should get a task by ID', async () => {
    const response = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(taskId);
  });

//   test('should update a task', async () => {
//     const response = await request(app)
//       .put(`/api/tasks/${taskId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({ status: 'completed' });

//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe('completed');
//   });

  test('should delete a task', async () => {
    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
