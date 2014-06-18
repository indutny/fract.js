var assert = require('assert');

var Fractional = require('../');

describe('fract.js', function() {
  it('should support add', function() {
    var a = new Fractional(1, 2);
    var b = new Fractional(1, 2);
    var c = a.add(b);
    assert.equal(c.num.cmpn(1), 0);
    assert.equal(c.denom.cmpn(1), 0);
  });
});
