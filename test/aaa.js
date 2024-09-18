var browserify = require('browserify');
var test = require('tape');
var path = require('path');
var vm = require('vm');
var swcify = require('../');

test('aaa', function (t) {
  t.plan(2);

  var b = browserify();

  b.require(path.join(__dirname, 'bundle/index.js'), {expose: 'bundle'});
  b.transform([swcify]);

  b.bundle(function (err, src) {
    t.error(err);
    var c = {};
    vm.runInNewContext(src, c);

    t.equal(c.require('bundle').a, 'a is for apple');
  });
});

test('basedir', function (t) {
   t.plan(2);

  var b = browserify({basedir: __dirname});

  b.require(path.join(__dirname, 'bundle/index.js'), {expose: 'bundle'});
  b.transform([swcify]);

  b.bundle(function (err, src) {
    t.error(err);
    var c = {};
    vm.runInNewContext(src, c);

    t.equal(c.require('bundle').a, 'a is for apple');
  });
})
