# swcify [![Build Status](https://travis-ci.org/dy/swcify.svg?branch=master)](https://travis-ci.org/dy/swcify)

[SWC](https://github.com/swc-project/swc) [browserify](https://github.com/substack/node-browserify) transform. Enables ES6/JSX/react for browserify times faster than babelify.

## Installation

```sh
$ npm install --save-dev swcify @swc/core
```

## Usage

### CLI

```sh
$ browserify script.js -t swcify > bundle.js
```

By default, swcify reads `.swcrc` file in the basedir with SWC config.

### Node

```javascript
var fs = require("fs")
var browserify = require("browserify")

var b = browserify("./script.js")
  .transform("swcify", config)
  .bundle()
  .pipe(fs.createWriteStream("bundle.js"));
```

The optional argument `config` can be an object with options for SWC.


## FAQ

### Why aren't files in `node_modules` being transformed?

This is the default browserify behavior.

A possible solution is to add:

```json
{
  "browserify": {
    "transform": ["swcify"]
  }
}
```

to the root of all your modules `package.json` that you want to be transformed.


### Why am I not getting source maps?

To use source maps, enable them in browserify with the [`debug`](https://github.com/substack/node-browserify#browserifyfiles--opts) option:

```js
browserify({debug: true}).transform("swcify");
```

```sh
$ browserify -d -t swcify
```
