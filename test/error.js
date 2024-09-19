var browserify = require('browserify');
var path = require('path');
var test = require('tape');
var babelify = require('../');

test('emits error', function(t) {
  t.plan(2);

  var b = browserify(path.join(__dirname, 'bundle/error.js'));

  b.transform(babelify.configure({}));

  b.bundle(function (err, src) {
    t.notOk(src);
    t.ok(err);
  });
});
