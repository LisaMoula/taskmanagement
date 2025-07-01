const request = require('supertest');
const app = require('../server');

let token = '';

beforeAll(async () => {
  const res = await request(app).post('/api/auth/login').send({
    email: 'admin@test.com',
    password: 'password' 
  });
  token = res.body.token;
});

describe('Tests des routes /api/tasks', () => {
  let taskId = '';

  test('GET /api/tasks -> retourne la liste des taches', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks -> crée une tache', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tache test',
        description: 'Tache de test créée automatiquement',
        priority: 'high'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Tache test');

    taskId = res.body.id;
  });

  test('PUT /api/tasks/:id -> met à jour une tache', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('done');
  });

  test('GET /api/tasks/:id -> retourne une tâche spécifique', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test('DELETE /api/tasks/:id -> supprime une tache', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
