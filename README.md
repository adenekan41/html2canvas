html2canvas
===========

[Homepage](https://html2canvas.hertzen.com) | [Downloads](https://github.com/niklasvh/html2canvas/releases) | [Questions](http://stackoverflow.com/questions/tagged/html2canvas?sort=newest)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/niklasvh/html2canvas?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://dev.azure.com/niklasvh/html2canvas/_apis/build/status/niklasvh.html2canvas?branchName=master)](https://dev.azure.com/niklasvh/html2canvas/_build/latest?definitionId=1&branchName=master)
[![NPM Downloads](https://img.shields.io/npm/dm/html2canvas.svg)](https://www.npmjs.org/package/html2canvas)
[![NPM Version](https://img.shields.io/npm/v/html2canvas.svg)](https://www.npmjs.org/package/html2canvas)

This is a branch of the original and fixes:
- Rendering of textarea (see [#2008](https://github.com/niklasvh/html2canvas/issues/2008))

#### JavaScript HTML renderer ####

 The script allows you to take "screenshots" of webpages or parts of it, directly on the users browser. The screenshot is based on the DOM and as such may not be 100% accurate to the real representation as it does not make an actual screenshot, but builds the screenshot based on the information available on the page.


### Why another html2canvas package? ###
This is a fork of niklasvh/html2canvas & nidi3/html2canvas that includes various fixes and new features. It offers several advantages over the original html2canvas, such as:

- Gracefully handles cross-origin images
- Gracefully handles color and advanced CSS properties
- Supports SVG rendering
- Support for object-fit and object-position CSS properties thanks to @yorickshan

### Installation ###
```bash
npm install @adenekan41/html2canvas
```

### Example ScreenShot ###
- With @adenekan41/html2canvas
  Handle textarea rendering, Cross-origin images, colors, SVG rendering, object-fit and object-position CSS properties
- With niklasvh/html2canvas
  
- With html2canvas-pro
  Handles colors but breaks screenshot, textarea rendering is off by a few pixels
  
### Browser compatibility ###

The library should work fine on the following browsers (with `Promise` polyfill):

* Firefox 3.5+
* Google Chrome
* Opera 12+
* IE9+
* Safari 6+

As each CSS property needs to be manually built to be supported, there are a number of properties that are not yet supported.

### Usage ###

The html2canvas library utilizes `Promise`s and expects them to be available in the global context. If you wish to
support [older browsers](http://caniuse.com/#search=promise) that do not natively support `Promise`s, please include a polyfill such as
[es6-promise](https://github.com/jakearchibald/es6-promise) before including `html2canvas`.

To render an `element` with html2canvas, simply call:
` html2canvas(element[, options]);`

The function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing the `<canvas>` element. Simply add a promise fulfillment handler to the promise using `then`:

    html2canvas(document.body).then(function(canvas) {
        document.body.appendChild(canvas);
    });

### Building ###

You can download ready builds [here](https://github.com/niklasvh/html2canvas/releases).

Clone git repository:

    $ git clone git://github.com/niklasvh/html2canvas.git

Install dependencies:

    $ npm install

Build browser bundle

    $ npm run build

### Examples ###

For more information and examples, please visit the [homepage](https://html2canvas.hertzen.com) or try the [test console](https://html2canvas.hertzen.com/tests/).

### Contributing ###

If you wish to contribute to the project, please send the pull requests to the develop branch. Before submitting any changes, try and test that the changes work with all the support browsers. If some CSS property isn't supported or is incomplete, please create appropriate tests for it as well before submitting any code changes.
