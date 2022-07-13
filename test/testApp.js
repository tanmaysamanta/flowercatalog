const fs = require('fs');
const request = require('supertest');
const { app } = require('../src/app');

describe('GET /somthingWrong', () => {
  it('should return 404 status code on GET /somthingWrong', (done) => {
    const config = { source: './public' };
    request(app(config))
      .get('/somethingWrong')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '44')
      .expect(404, done)
  });
});

describe('GET /', () => {
  it('should return 200 status code on GET / ', (done) => {
    const config = { source: './public' };
    request(app(config))
      .get('/')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1084')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });
});

describe('GET /abeliophyllum.html', () => {
  it('should return 200 status code on GET /abeliophyllum.html', (done) => {
    const config = { source: './public' };
    request(app(config))
      .get('/abeliophyllum.html')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1458')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });
});

describe('GET /agerantum.html', () => {
  it('should return 200 status code on GET /agerantum.html', (done) => {
    const config = { source: './public' };
    request(app(config))
      .get('/agerantum.html')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1246')
      .expect(/Agerantum/)
      .expect(200, done)
  });
});

describe('GET /login', () => {
  it('should return 200 status code on GET /login', (done) => {
    const config = {};
    request(app(config))
      .get('/login')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '295')
      .expect(200, done)
  });

  it('should return 302 status code on GET /login', (done) => {
    const config = {};
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(app(config, sessions))
      .get('/login')
      .set('Cookie', 'sessionId=12345')
      .expect('Location', '/guestbook')
      .expect(302, done)
  });
});

describe('POST /login-page', () => {
  it('should return 302 status code on GET /login', (done) => {
    const config = {};
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(app(config, sessions))
      .post('/login-page')
      .send('user=abc')
      .set('Cookie', 'sessionId=12345')
      .expect('Location', '/guestbook')
      .expect(302, done)
  });
});

describe('GET /guestbook', () => {
  it('should return 200 status code with guestbook page', (done) => {
    const config = {
      comments: [{ "name": "modhu", "comment": "morning", "time": "13/07/2022, 09:58:22" }],
    };
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(app(config, sessions))
      .get('/guestbook')
      .set('Cookie', 'sessionId=12345')
      .expect('Content-type', /html/)
      .expect(/Guest book/)
      .expect(200, done)
  });

  it('should return 302 status code and redirected to login page', (done) => {
    const config = {};
    request(app(config))
      .get('/guestbook')
      .expect('Location', '/login')
      .expect(302, done)
  });
});

describe('POST /add-comment', () => {
  it('should return 200 status code with guestbook page', (done) => {
    const config = {
      comments: [{ "name": "modhu", "comment": "morning", "time": "13/07/2022, 09:58:22" }],
      commentsFile: './test/comments.json'
    };
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(app(config, sessions))
      .post('/add-comment')
      .set('Cookie', 'sessionId=12345')
      .send('name=sonu&comment=hello')
      .expect('Content-type', 'text/plain')
      .expect(/sonu/)
      .expect(200, done)
  });
});
