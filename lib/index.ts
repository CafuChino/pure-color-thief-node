const fs = require('fs');
const quantize = require('quantize');
var getPixels = require("get-pixels");
import { NdArray } from 'ndarray';

function ndFlatten(img:NdArray) {
  let fullArr = [];
  for (var i = 0; i < img.shape[0]; ++i) {
    for (var j = 0; j < img.shape[1]; ++j) {
      let t = [];
      for (var k = 0; k < 3; ++k) {
          t.push(img.get(i, j, k));
      }
      fullArr.push(t);
    }
  }
  return fullArr;
}


class ColorThief {
  
  sourceImageData: null | NdArray;
  type: null | string;
  
  constructor() {
    this.sourceImageData = null;
    this.type = null;
  }
  
  _getPixels(imgBuffer:Buffer): Promise<null|NdArray> {
    return new Promise((resolve, reject) => {
      getPixels(imgBuffer, this.type, (err:Error, pixels:NdArray ) => {
        if (err) {
          resolve(null);
        }
        resolve(pixels);
      });
    })
  }

  async loadImage(image:Buffer|string, type:string|null=null) {
    this.type = type;
    if (Buffer.isBuffer(image)) {
      if (!this.type || !['image/png', 'image/jpeg', 'image/jpg'].includes(this.type)){
        throw new Error('type must be image/png or image/jpeg or image/jpg');
      }
      this.sourceImageData = await this._getPixels(image);
      return this.sourceImageData;
    } else {
      const ext = image.split('.').pop();
      if (!ext || !['png', 'jpg', 'jpeg'].includes(ext)) {
        throw new Error('extension must be png, jpg or jpeg');
      }
      this.type = `image/${ext}`;
      this.sourceImageData = await this._getPixels(fs.readFileSync(image));
      return this.sourceImageData;
    }
  };

  getColorPalette(colorCount:number):[number, number, number][] {
    if (!this.sourceImageData) {
      throw new Error('No image loaded');
    }
    const palette = quantize(ndFlatten(this.sourceImageData), colorCount);
    return palette.palette();
  }

  getColor():[number, number, number] {
    if (!this.sourceImageData) {
      throw new Error('No image loaded');
    }
    const palette = quantize(ndFlatten(this.sourceImageData), 1);
    return palette.palette()[0];
  }
}

export default ColorThief;