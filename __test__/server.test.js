// Fixing the ReferenceError: regeneratorRuntime is not defined
// https://knowledge.udacity.com/questions/174638
import "babel-polyfill";

// References:
// https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
const app = require('../src/server/server.js')
const request = require('supertest')

describe("Test the root path", () => {
    test("It should response the GET method", done => {
      request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  