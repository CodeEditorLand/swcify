var browserify = require('browserify');
var test = require('tape');
var path = require('path');
var babelify = require('../');

test('passes options via configure', function(t) {
  t.plan(3);

  var b = browserify(path.join(__dirname, 'bundle/index.js'));

  b.transform(babelify.configure({
    // plugins: ['@babel/plugin-transform-property-literals']
  }));

  b.bundle(function (err, src) {
    t.error(err);
    t.ok(src.toString().match(/'?catch'?: `catch`/));
    t.ok(src.toString().match(/'?delete'?: `delete`/));
  });
});
