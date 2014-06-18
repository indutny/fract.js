var bn = require('bn.js');

// Rational number
function Fraction(num, denom) {
  if (typeof num === 'number')
    num = new bn(num, 16);
  if (typeof denom === 'number')
    denom = new bn(denom, 16);
  if (typeof denom === 'object') {
    var g = num.gcd(denom);
    if (g.cmpn(1) !== 0) {
      num = num.div(g);
      denom = denom.div(g);
    }
  } else {
    denom = new bn(1);
  }

  // Ensure that denom is always positive
  if (denom.sign)
    num = num.neg();
  this.num = num;
  this.denom = denom;
}
module.exports = Fraction;

Fraction.prototype.inspect = function inspect() {
  return '<Frac: ' +
      this.num.toString(10) + '/' + this.denom.toString(10) + '>';
};

Fraction.prototype.mul = function mul(f) {
  return new Fraction(this.num.mul(f.num), this.denom.mul(f.denom));
};

Fraction.prototype.sqr = function sqr() {
  return this.mul(this);
};

Fraction.prototype.sub = function sub(f) {
  // a/b - c/d = (a * d - c * b) / b * d
  var denom = this.denom.mul(f.denom);
  var num = this.num.mul(f.denom).isub(f.num.mul(this.denom));
  return new Fraction(num, denom);
};

Fraction.prototype.add = function add(f) {
  // a/b + c/d = (a * d + c * b) / b * d
  var denom = this.denom.mul(f.denom);
  var num = this.num.mul(f.denom).iadd(f.num.mul(this.denom));
  return new Fraction(num, denom);
};

Fraction.prototype.div = function div(f) {
  // (a/b) / (c/d) = a * d / b * c
  var num = this.num.mul(f.denom);
  var denom = this.denom.mul(f.num);
  return new Fraction(num, denom);
};

Fraction.prototype.cmpn = function cmpn(num) {
  var dm = this.num.divmod(this.denom);
  var r = dm.div.cmpn(num);
  if (r !== 0)
    return r;

  if (dm.mod.cmpn(0) !== 0)
    return this.num.sign ? 1 : -1;

  return 0;
};

Fraction.prototype.toBN = function toBN(round) {
  return round ? this.num.divRound(this.denom) : this.num.div(this.denom);
};
