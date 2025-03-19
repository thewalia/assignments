const app = require("../03-errorcount");

const request = require('supertest');
const assert = require('assert');
describe('GET /user', function() {
  it('Initial request responds with 0', function(done) {
    request(app)
      .get('/errorCount')
      .then(response => {
        expect(response.body.errorCount).toBe(0);
        done();
      })
      .catch(done)
  });

  it('If there is an exception, errCount goes up', function(done) {
    const promises = []

          for (let i = 0; i<10; i++) {
            promises.push(
              request(app)
                    .get('/user')
                    .expect(404)
            )
          }

          Promise.all(promises).then(() => {
            return request(app)
                .get('/errorCount')
                .then(response => {
                  expect(response.body.errorCount).toBe(10);
                  done();
                })
          })
      });

      it('Exception endpoint returns a 404', function(done) {
        request(app)
          .get('/user')
          .then(response => {
            expect(response.status).toBe(404);
            done();
          })
      });

});

