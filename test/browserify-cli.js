var path = require('path');
var spawn = require('cross-spawn');
var test = require('tape');
var vm = require('vm');

test('browserify-cli no subargs', function (t) {
  t.plan(5);

  var cmd = require.resolve('browserify/bin/cmd.js');
  var args = [
    '-r', path.join(__dirname, '/bundle/index.js') + ':bundle',
    '-t', path.join(__dirname, '../')
  ];

  var out = '';
  var err = '';

  var ps = spawn(cmd, args);
  ps.stdout.on('data', function(buf) { out += buf; });
  ps.stderr.on('data', function(buf) { err += buf; });

  ps.on('error', function(err) { throw err; });
  ps.on('exit', function(code) {
    t.notOk(err);
    t.equal(code, 0);

    var c = {};
    vm.runInNewContext(out, c);

    t.equal(c.require('bundle').a, 'a is for apple');
    t.ok(out.toString().match(/'?catch'?: `catch`/));
    t.ok(out.toString().match(/'?delete'?: `delete`/));
  });
});

test.skip('browserify-cli with subargs', function (t) {
  // FIXME: react-flow is not supported for now

  t.plan(4);

  process.env.NODE_ENV = 'development';

  var cmd = require.resolve('browserify/bin/cmd.js');
  var args = [
    '-r', path.join(__dirname, '/bundle/react-flow.js') + ':reactFlow',
    '-t', '[',
      path.join(__dirname, '../'),
      // '--presets', '[', '@swc/preset-env', '@swc/preset-react', '@swc/preset-flow', ']',
      // '--plugins', '[',
      //   '@swc/plugin-transform-react-display-name',
      //   'transform-node-env-inline',
      // ']',
      // '--config=123',
    ']'
  ];

  var out = '';
  var err = '';

  var ps = spawn(cmd, args);
  ps.stdout.on('data', function(buf) { console.log(buf.toString()); out += buf; });
  ps.stderr.on('data', function(buf) { err += buf; });

  ps.on('error', function(err) {throw err; });
  ps.on('exit', function(code) {
    console.log(err)
    t.notOk(err);
    t.equal(code, 0);

    var c = {};
    vm.runInNewContext(out, c);

    c.require('reactFlow')({
      createClass: function(obj) {
        t.equal(obj.envLength(), process.env.NODE_ENV.length);
        t.equal(obj.displayName, 'TestComponent');
      }
    });
  });
});
