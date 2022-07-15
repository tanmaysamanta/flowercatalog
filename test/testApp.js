const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/app');

describe('GET /somthingWrong', () => {
  it('should return 404 status code on GET /somthingWrong', (done) => {
    const config = { commentsFile: './test/comments.json' };
    request(createApp(config, {}))
      .get('/somethingWrong')
      .expect('Content-Type', /html/)
      .expect(404, done)
  });
});

describe('GET /', () => {
  it('should return 200 status code on GET / ', (done) => {
    const config = { source: './public', commentsFile: './test/comments.json' };
    request(createApp(config))
      .get('/')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1084')
      .expect(/Flower Catalog/)
      .expect(200, done)
  });
});

describe('GET /abeliophyllum.html', () => {
  it('should return 200 status code on GET /abeliophyllum.html', (done) => {
    const config = { source: './public', commentsFile: './test/comments.json' };
    request(createApp(config))
      .get('/abeliophyllum.html')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1458')
      .expect(/Abeliophyllum/)
      .expect(200, done)
  });
});

describe('GET /agerantum.html', () => {
  it('should return 200 status code on GET /agerantum.html', (done) => {
    const config = { source: './public', commentsFile: './test/comments.json' };
    request(createApp(config))
      .get('/agerantum.html')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '1246')
      .expect(/Agerantum/)
      .expect(200, done)
  });
});

describe('GET /login', () => {
  it('should return 200 status code on GET /login', (done) => {
    const config = { commentsFile: './test/comments.json' };
    request(createApp(config))
      .get('/login')
      .expect('Content-Type', /html/)
      .expect('Content-Length', '290')
      .expect(200, done)
  });

  it('should return 302 status code on GET /login', (done) => {
    const config = { commentsFile: './test/comments.json' };
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(createApp(config, sessions))
      .get('/login')
      .set('Cookie', 'sessionId=12345')
      .expect('Location', '/guestbook')
      .expect(302, done)
  });
});

describe('POST /login', () => {
  it('should return 302 status code on GET /login', (done) => {
    const config = { commentsFile: './test/comments.json' };
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(createApp(config, sessions))
      .post('/login')
      .send('user=abc')
      .set('Cookie', 'sessionId=12345')
      .expect('Location', '/guestbook')
      .expect(302, done)
  });
});

describe('GET /guestbook', () => {
  it('should return 200 status code with guestbook page', (done) => {
    const config = {
      commentsFile: './test/comments.json'
    };
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(createApp(config, sessions))
      .get('/guestbook')
      .set('Cookie', 'sessionId=12345')
      .expect('Content-type', /html/)
      .expect(/Guest book/)
      .expect(200, done)
  });

  it('should return 302 status code and redirected to login page', (done) => {
    const config = { commentsFile: './test/comments.json' };
    request(createApp(config))
      .get('/guestbook')
      .expect('Location', '/login')
      .expect(302, done)
  });
});

describe('POST /add-comment', () => {
  it('should return 200 status code with guestbook page', (done) => {
    const config = {
      commentsFile: './test/comments.json'
    };
    const sessions = {
      12345: {
        username: 'abc',
        sessionId: 12345
      }
    }
    request(createApp(config, sessions))
      .post('/add-comment')
      .set('Cookie', 'sessionId=12345')
      .send('name=sonu&comment=hello')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(200, done)
  });
});
