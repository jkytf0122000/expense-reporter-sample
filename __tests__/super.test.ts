import app from '../src';
import request from 'supertest';

describe('Root', () => {
  it('Root index is valid', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe('Login', () => {
  const userCredentials = {
    user: 'test@example.com',
    password: 'password'
  };
  it('login form is varid', async () => {
    const response = await request(app).get("/login");
    expect(response.status).toBe(200);
  });
  it('login with user credential is valid', async () => {
    const response = await request(app).post("/login")
      .send(userCredentials);
    expect(response.status).toBe(302);
    expect(response.header['location']).toBe('/');
  })
});

describe('submit', () => {
  it('A submit form is valid', async () => {
    const response = await request(app).get("/expenses/submit");
    expect(response.status).toBe(200);
  });
});

describe('payment', () => {
  it('A payment list is valid', async () => {
    const response = await request(app).get("/expenses/payment");
    expect(response.status).toBe(200);
  });
});

// エラーテスト
describe('/expense', () => {
  it('This URI is not valid', async () => {
    const response = await request(app).get("/expense");
    expect(response.status).toBe(404);
  });
});