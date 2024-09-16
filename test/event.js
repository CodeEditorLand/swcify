var browserify = require('browserify');
var path = require('path');
var test = require('tape');
var swcify = require('../');

var files = [
  path.join(__dirname, 'bundle/a.js'),
  path.join(__dirname, 'bundle/b.js'),
  path.join(__dirname, 'bundle/c.js'),
  path.join(__dirname, 'bundle/index.js')
];

test('event', function (t) {
  t.plan(7);

  var swcified = [];

  var b = browserify(path.join(__dirname, 'bundle/index.js'));
  b.transform([swcify, {}]);

  b.on('transform', function(tr) {
    if (tr instanceof swcify) {
      tr.once('swcify', function(result, filename) {
        swcified.push(filename);
        t.equal(typeof result.code, 'string');
      });
    }
  });

  b.bundle(function (err, src) {
    t.error(err);
    t.ok(src);
    t.deepEqual(swcified.sort(), files);
  });
});
