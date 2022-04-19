const request = require('supertest');
const multer = require('multer');
jest.mock('fs');
jest.mock('multer');

multer.mockImplementation(() => {
  return {
    single: () => (req, res, next) => {
      req.file = { filename: 'test' };
      next();
    }
  };
});

const imageService = require('./service/image');

const mockService = jest.spyOn(imageService, 'getImage').mockImplementation((req, res) => {
  res.send('done');
});

const app = require('./app');

describe('test for image api', () => {
  test('test for get image', done => {
    request(app)
      .get('/image/test')
      .expect(200)
      .then(() => {
        expect(mockService).toHaveBeenCalled();
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test('test for upload image', done => {
    request(app)
      .post('/image')
      .expect(200)
      .then(res => {
        expect(res.body.id).toBe('test');
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
