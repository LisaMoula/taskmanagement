const request = require('supertest');
const app = require('../server');

describe('Tests d\'intégration utilisateur + taches', () => {
  let token = '';
  let createdTaskId = '';

  const testUser = {
    email: 'integration@test.com',
    password: 'test1234',
    name: 'User Integration'
  };

  test('Inscription d\'un nouvel utilisateur', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testUser.email);

    token = res.body.token;
  });

  test('Connexion de l\'utilisateur', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('3️Création d\'une tache avec le token reçu', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tache intégrée',
        description: 'Créée via un test d’intégration'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Tache intégrée');

    createdTaskId = res.body.id;
  });

  test('Accès à la tache créée', async () => {
    const res = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdTaskId);
  });
});
