var should = require('chai').should(),
    lwt = require('../index'),
    decode = lwt.decode;

describe('#decode', function() {
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
  // TODO: More tests...
});
