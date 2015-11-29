# Pegify [![Build Status](https://travis-ci.org/rstone770/pegify.svg?branch=master)](https://travis-ci.org/rstone770/pegify)

A configurable [Browserify](http://browserify.org/) transform for [PegJS](http://pegjs.org/) that just works.

## Installation
```bash
npm install pegify pegjs --save-dev
```

__NOTE__: PegJS is not bundled with the transform and must be installed along with Pegify if is not already included in your project. This allows you to select the version of PegJS that works with your project.

## Usage

### Command Line
Command line usage is as you would expect, just apply it as a transform.

```bash
browserify -t pegify myfile.js
```

### Middleware
Here is an example of Pegify being used as Browserify middleware

```javascript
var bundler = browserify()
  .transform(pegify())
  .add('myfile.js');
```

After everything is all setup, you are able to require PegJS files.

```javascript
var parser = require('./path/to/file.pegjs');

parser.parse(/* your langage */);
```

### Configuration
All options provided to Pegify will be sent directly to PegJS. Meaning all options supported by PegJS are automatically supported by Pegify. There is one exception, output is permanently set to source. Along with the standard options provided by PegJS, Pegify itself can be configured.

To set Pegify options, just pass in an options object when the transform is being initialized.

```javascript
pegify({
    export: 'window.parser',
    extensions: ['.pgjs']
});
```

All Pegify options can also be included in a __.pegifyrc__ as json.

__output = 'source'__

This option is locked, and cannot be modified.


__export = 'module.exports'__

Defines variable that the compiled parser should be exported to. The default is set to commonjs module.export so that it can be injected as a module.


__extensions = ['.peg', '.pegjs']__

Extensions that Pegify should work on.

## Gulp Usage
Pegify will drop in directly into any Browserify build pipeline. Below is just one implementations.

```javascript
var browserify = require('browserify'),
    gulp = require('gulp'),
    pegify = require('pegify'),
    source = require('vinyl-source-stream');

gulp.task('js', function () {
  var bundler = browserify()
    .add('./main.js')
    .transform(pegify({
      optimize: 'size'
    }));

  return bundler
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./bin'));
});
```

You may notice that [vinyl-source-stream](https://github.com/hughsk/vinyl-source-stream) is included after the bundler.bundle. This is due to the differences between Browserify streams and Gulp/Vinyl streams. Browserify streams a bundle as text, while Gulp uses Vinyl streams. This is where vinyl-source-stream comes in, it will convert a text stream into a vinyl stream. Depending on down stream pipes, other stream manipulation may be needed such as buffering.

## License
[MIT](LICENSE)
