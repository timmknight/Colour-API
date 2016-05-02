var request = require('supertest');
// var should = require('should');
var expect = require('chai').expect;

describe('Express server', function () {
  var url = "localhost:8080";
// GET
// .../api/
  it('respond to a get request to /api/ and list all palettes', function (done) {
    request(url)
      .get('/api/')
      .expect(200)
      .end(function (err, res){
        if (err) throw err;
        var arr = res.body;
        for (var i = 0; i < arr.length; i++) {
          // __v is mongoose record version
          expect(arr[i]).to.have.all.keys('colors', 'likes', 'title', '_id', '__v');
        }
        done();
      });
  });

// All routes that don't start with /api/
  it('404 all get requests that are not /api/', function (done) {
    request(url)
      .get('/foo/bar')
      .expect(404)
      .end(function (err, res){
        if (err) throw err;
        done();
      });
  });

// POST
// Success

// Failures
// Existing routes
  it('should be able to post to /create/ but get 400 bad request if no data is sent', function (done) {
    request(url)
      .post('/api/create/')
      .expect(400)
      .end(function (err, res){
        var error = JSON.parse(res.error.text)
        console.log(error);
        expect(error).to.have.any.property("error", "Palette title & colors cannot be blank");
        if (err) throw err;
        done();
      });
  });

  it('should not be able to post to /', function (done) {
    request(url)
      .post('/')
      .expect(404)
      .end(function (err, res){
        if (err) throw err;
        done();
      });
  });

  it('should not be able to post to /api/', function (done) {
    request(url)
      .post('/api/')
      .expect(404)
      .end(function (err, res){
        if (err) throw err;
        done();
      });
  });

// Non-existing routes
  it('should not be able to post to non existing routes', function (done) {
    request(url)
      .post('/foo/bar')
      .expect(404)
      .end(function (err, res){
        if (err) throw err;
        done();
      });
  });

});
