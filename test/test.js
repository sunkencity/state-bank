var should = require('chai').should(),
    StateBank = require('../index');

describe('#set', function() {

  it('should add a property on an object', function() {
    var state = {foo:"bar"};
    StateBank.set(state, "ramanujan", 1729);
    state.should.eql({foo:"bar", ramanujan: 1729});
  });

  it('should set a property on an object', function() {
    var state = {foo:"bar", ramanujan: 12};
    StateBank.set(state, "ramanujan", 1729);
    state.should.eql({foo:"bar", ramanujan: 1729});
  });

  it('should add a property on a nested object', function() {
    var state = {foo:"bar", math: {}};
    StateBank.set(state, "math.ramanujan", 1729);
    state.should.eql({foo:"bar", math: {ramanujan: 1729}});
  });

  it('should set a property on an object', function() {
    var state = {foo:"bar", ramanujan: 12};
    StateBank.set(state, "ramanujan", 1729);
    state.should.eql({foo:"bar", ramanujan: 1729});
  });

  it('should change an index on an array', function() {
    var state = {foo:"bar", arr:[1,2,3,4]};
    StateBank.set(state, "arr[1]", 1729);
    state.should.eql({foo:"bar", arr: [1, 1729,3,4]});
  });

});

describe('#del', function() {

  it('should remove a property on an object', function() {
    var state = {foo:"bar", "baz":"bazoo"};
    StateBank.del(state, "baz");
    state.should.eql({foo:"bar"});
  });

  it('should remove a property on a nested object', function() {
    var state = {foo:"bar", a: { b: {c: 3, d: 4}}};
    StateBank.del(state, "a.b.c");
    state.should.eql({foo:"bar", a: {b:{d:4}}});
  });

});

describe('#merge', function() {

  it('should merge a property<object>', function() {
    var state = {foo:"bar", bar: {a:1, b:2}};
    StateBank.merge(state, "bar", {c:3, d:4});
    state.should.eql({foo:"bar", bar:{a:1,b:2,c:3,d:4}});
  });

  it('should merge a property<object> on nested ', function() {
    var state = {foo:"bar", hello: { bar: {a:1, b:2}}};
    StateBank.merge(state, "hello.bar", {c:3, d:4});
    state.should.eql({foo:"bar", hello: { bar:{a:1,b:2,c:3,d:4}}});
  });

});

describe('#push', function() {
  it('should push ', function() {
    var state = {foo:"bar", bar: [1,2,3]};
    StateBank.push(state, "bar", 4);
    state.should.eql({foo:"bar", bar:[1,2,3,4]});
  });

});

describe('#unshift', function() {
  it('should unshift ', function() {
    var state = {foo:"bar", bar: [1,2,3]};
    StateBank.unshift(state, "bar", 0);
    state.should.eql({foo:"bar", bar:[0,1,2,3]});
  });
});

describe('#apply', function() {
  it('should apply ', function() {
    var state = {foo:"bar", bar: 2};
    StateBank.apply(state, "bar", function(x) { return x * x; } );
    state.should.eql({foo:"bar", bar:4});
  });
});


