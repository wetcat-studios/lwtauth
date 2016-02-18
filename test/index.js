var should = require('chai').should(),
    lwt = require('../index'),
    decode = lwt.decode;

describe('#decode', function() {
  it('should return false for undefined', function () {
    decode().should.equal(false);
  });
  it('should return false for bad token (1)', function () {
    decode('this_is_a_bad_token').should.equal(false);
  });
  it('should return false for bad token (2)', function () {
    decode('this.is.a.bad.token').should.equal(false);
  });
  it('should return false for bad token (3)', function () {
    decode('bad.token').should.equal(false);
  });
  it('should return false for bad token (4)', function () {
    decode('last.bad.token').should.equal(false);
  });
  
  // Acceptable token
  var token = 'eyJhbGciOiJBRVMtMjU2LUNCQyIsInR5cCI6ImxpdHRlcmJveCJ9.eyJ1dWlkIjoiNmUxZTc2ZWMtZDc2My00ZDAxLWE2NDMtMzM0OTdiOTdmZGIwIiwibmFtZSI6IkFuZHJlYXMgR1x1MDBmNnJhbnNzb24iLCJyb2xlIjoic3VwZXJhZG1pbiJ9.YzU3Y2NlMTItZDY4My0xMWU1LTk4ZGUtMDQwMTgxYTVjZTAx';
  it('should be an array', function () {
    decode(token).to.be.instanceof(Array);
  });
  it('should have a length of three', function () {
    decode(token).length.to.equal(2);
  });
});
