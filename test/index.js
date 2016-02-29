'use strict'

var should = require('chai').should(),
    lwt = require('../index'),
    errors = require('../errors'),
    decode = lwt.decode,
    encode = lwt.encode;

const encHead = 'eyJhbGciOiJBRVMtMjU2LUNCQyIsInR5cCI6ImxpdHRlcmJveCJ9';
const encData = 'eyJ1dWlkIjoiNmUxZTc2ZWMtZDc2My00ZDAxLWE2NDMtMzM0OTdiOTdmZGIwIiwibmFtZSI6IlRlc3QgVGVzdHNzb24iLCJyb2xlIjoiYWRtaW4ifQ';
                'eyJ1dWlkIjoiNmUxZTc2ZWMtZDc2My00ZDAxLWE2NDMtMzM0OTdiOTdmZGIwIiwibmFtZSI6IlRlc3QgVGVzdHNzb24iLCJyb2xlIjoiYWRtaW4iLCJzZWNyZXQiOiJjNTdjY2UxMi1kNjgzLTExZTUtOThkZS0wNDAxODFhNWNlMDEifQ=='
const encFoot = 'YzU3Y2NlMTItZDY4My0xMWU1LTk4ZGUtMDQwMTgxYTVjZTAx';
const token = encHead + '.' + encData + '.' + encFoot;

describe('#encode', function () {
  
  // {"alg":"AES-256-CBC","typ":"litterbox"}
  // {"uuid":"6e1e76ec-d763-4d01-a643-33497b97fdb0","name":"Test Testsson","role":"admin"}
  // c57cce12-d683-11e5-98de-040181a5ce01
  it('should return undefined identifier', function() {
    encode().should.equal(errors.undefinedIdentifier);
    encode(null, 'a', 'b', 'c').should.equal(errors.undefinedIdentifier);
  });
  it('should return undefined name', function() {
    encode('a').should.equal(errors.undefinedName);
    encode('a', null, 'b', 'c').should.equal(errors.undefinedName);
  });
  it('should return undefined role', function() {
    encode('a', 'b').should.equal(errors.undefinedRole);
    encode('a', 'b', null, 'c').should.equal(errors.undefinedRole);
  });
  it('should return undefined secret', function() {
    encode('a', 'b', 'c').should.equal(errors.undefinedSecret);
    encode('a', 'b', 'c', null).should.equal(errors.undefinedSecret);
  });
  
  it('should return bad identifier', function () {
    encode('bad-identifier', 'Test Testsson', 'admin', 'c57cce12-d683-11e5-98de-040181a5ce01').should.equal(errors.badIdentifier);
  });
  
  it('should encode correctly', function () {
    encode('6e1e76ec-d763-4d01-a643-33497b97fdb0', 'Test Testsson', 'admin', 'c57cce12-d683-11e5-98de-040181a5ce01').should.equal(token);
  });
});

describe('#decode', function () {
  it('should return undefined', function () {
    decode().should.equal(errors.undefinedToken);
  });
  it('should return short token', function () {
    decode(encHead + '.' + encData).should.equal(errors.shortToken);
  });
  it('should return long token', function () {
    decode(encHead + '.' + encData + '.' + encFoot + '.toomuchdata').should.equal(errors.longToken);
  });
  it('should return bad header', function () {
    decode('badpart.' + encData + '.' + encFoot).should.equal(errors.badHeader);
  });
  it('should return bad data', function () {
    decode(encHead + '.badpart.' + encFoot).should.equal(errors.badData);
  });
  it('should return bad secret', function () {
    decode(encHead + '.' + encData + '.badsecret').should.equal(errors.badSecret);
  });
  it('should be an array', function () {
    decode(token).should.be.an('Array');
  });
  it('should have a length of three', function () {
    decode(token).should.have.length(3);
  });
  it('should be the resulting array', function () {
    var expected = [
      {alg: 'AES-256-CBC', typ: 'litterbox'},
      {uuid: '6e1e76ec-d763-4d01-a643-33497b97fdb0', name: 'Test Testsson', role: 'admin'},
      'c57cce12-d683-11e5-98de-040181a5ce01'
    ];
    decode(token).should.deep.equal(expected);
  });
});
