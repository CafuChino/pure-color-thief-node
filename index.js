"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var quantize = require('quantize');
var getPixels = require("get-pixels");
function ndFlatten(img) {
    var fullArr = [];
    for (var i = 0; i < img.shape[0]; ++i) {
        for (var j = 0; j < img.shape[1]; ++j) {
            var t = [];
            for (var k = 0; k < 3; ++k) {
                t.push(img.get(i, j, k));
            }
            fullArr.push(t);
        }
    }
    return fullArr;
}
var ColorThief = /** @class */ (function () {
    function ColorThief() {
        this.sourceImageData = null;
        this.type = null;
    }
    ColorThief.prototype._getPixels = function (imgBuffer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            getPixels(imgBuffer, _this.type, function (err, pixels) {
                if (err) {
                    resolve(null);
                }
                resolve(pixels);
            });
        });
    };
    ColorThief.prototype.loadImage = function (image, type) {
        if (type === void 0) { type = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, ext, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.type = type;
                        if (!Buffer.isBuffer(image)) return [3 /*break*/, 2];
                        if (!this.type || !['image/png', 'image/jpeg', 'image/jpg'].includes(this.type)) {
                            throw new Error('type must be image/png or image/jpeg or image/jpg');
                        }
                        _a = this;
                        return [4 /*yield*/, this._getPixels(image)];
                    case 1:
                        _a.sourceImageData = _c.sent();
                        return [2 /*return*/, this.sourceImageData];
                    case 2:
                        ext = image.split('.').pop();
                        if (!ext || !['png', 'jpg', 'jpeg'].includes(ext)) {
                            throw new Error('extension must be png, jpg or jpeg');
                        }
                        this.type = "image/" + ext;
                        _b = this;
                        return [4 /*yield*/, this._getPixels(fs.readFileSync(image))];
                    case 3:
                        _b.sourceImageData = _c.sent();
                        return [2 /*return*/, this.sourceImageData];
                }
            });
        });
    };
    ;
    ColorThief.prototype.getColorPalette = function (colorCount) {
        if (!this.sourceImageData) {
            throw new Error('No image loaded');
        }
        var q = quantize(ndFlatten(this.sourceImageData), Math.max(2, colorCount));
        return q.palette();
    };
    ColorThief.prototype.getColor = function () {
        if (!this.sourceImageData) {
            throw new Error('No image loaded');
        }
        var palette = quantize(ndFlatten(this.sourceImageData), 2);
        return palette.palette()[0];
    };
    return ColorThief;
}());
exports.default = ColorThief;
