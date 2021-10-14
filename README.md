# pure-color-thief-node

Pure javascript version of color thief reimplementation for Node.js.

The [original color thief project](https://github.com/lokesh/color-thief) relies on the browser `Canvas` object to extract pixels from images. It does not work well in Node.js environment because the `Canvas` object does not natively exist in Node.js.

Another project, [Color Thief Node](https://www.npmjs.com/package/color-thief-node), however, relies on the [node-canvas library](https://github.com/Automattic/node-canvas) to simulate a `Canvas` object in Node.js environment. It involves unnecessary gyp build. Is behaves badly when a pre-build version of `node-canvas` is provided for your runtime, expecially when you need to deploy your project with docker (your image usually do not provide full gyp-build env).

However, canvas is only used to get the pixel information of the image, which is very inefficient for Node  environment. We can use a simpler way to get the pixel color information.

**Here comes pure-color-thief-node! 100% Javascript, gyp freeeeeeeeeeeeee ! ! !**



## Installation

`npm i pure-color-thief-node`

or

`yarn add pure-color-thief-node`



## Usage

### Get the Dominant Color from an Image

``` javascript
const colorThief = require('pure-color-thief-node');

const img = new colorThief();
img.loadImage('./cover.jpg').then(()=>{
    console.log(img.getColor());
});
```

### Build a Color Palette from an Image

``` javascript
const colorThief = require('pure-color-thief-node');

const img = new colorThief();
img.loadImage('./cover.jpg').then(()=>{
  console.log(img);
  // 5 for palette color count, min 3
  console.log(img.getColorPalette(5));
});
```

### Get the Dominant Color from an Image Buffer

```javascript
const colorThief = require('pure-color-thief-node');
const fs = require('fs');
const img = new colorThief();
img.loadImage(fs.readFileSync('./cover.jpg'), 'image/jpeg').then(()=>{
  console.log(img);
  console.log(img.getColor());
});
```



Enjoy ✔️

