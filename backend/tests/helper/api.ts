import supertest from 'supertest';
import app from '../../src/app';

const api = { api: supertest(app) };

export default api.api;
