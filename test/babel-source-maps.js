var assert = require('assert');
var swc = require('@swc/core');
var convert = require('convert-source-map');
var fs = require('fs');
var path = require('path');
var test = require('tape');

// Validate assumptions about swc's source maps.

var sourceFile = path.join(__dirname, 'bundle/index.js');
assert(path.isAbsolute(sourceFile));

var sourceSrc = fs.readFileSync(sourceFile, 'utf8');

test('swc source maps (filename and sourceFileName)', function(t) {
  var result = swc.transformSync(sourceSrc, {
    sourceMaps: 'inline',
    filename: sourceFile,
    sourceFileName: sourceFile,
  });

  // With "sourceFileName", the source path is "sourceFileName".
  var sm = convert
    .fromJSON(result.map)
    // .fromSource(result.code.toString())
    .toObject();

  t.deepEqual(sm.sources, [sourceFile]);

  t.end();
});
