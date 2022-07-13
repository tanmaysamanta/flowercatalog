const request = require('supertest');
const { app } = require('../src/app');

describe('test app', () => {
  it('should return 200 status code on GET / ', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1084')
      .expect(200, done)
  });
});