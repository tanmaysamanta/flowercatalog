const request = require('supertest');
const { app } = require('../src/app');

describe('test app', () => {
  it('should return 200 status code on GET / ', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1084')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });

  it('should return 200 status code on GET /abeliophyllum.html', (done) => {
    request(app)
      .get('/abeliophyllum.html')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1458')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });

  it('should return 200 status code on GET /agerantum.html', (done) => {
    request(app)
      .get('/agerantum.html')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1246')
      .expect(/Agerantum/)
      .expect(200, done)
  });

  it('should return 200 status code on GET /login', (done) => {
    request(app)
      .get('/login')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '295')
      .expect(200, done)
  });
});