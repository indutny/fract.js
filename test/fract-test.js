var assert = require('assert');
var bn = require('bn.js');

var Fractional = require('../');

describe('fract.js', function() {
  it('should support add', function() {
    var a = new Fractional(new bn(1), new bn(2));
    var b = new Fractional(new bn(1), new bn(2));
    var c = a.add(b);
    assert.equal(c.num.cmpn(1), 0);
    assert.equal(c.denom.cmpn(1), 0);
  });
});
