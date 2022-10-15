"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const ProcessImage = (filename, width, height) => {
    // This function takes three parameters filename, width, height
    // It returns the picture path which either got resized or not
    return new Promise((resolve, reject) => {
        fs.stat('./Full/' + filename + '.jpg', (err) => {
            if (err == null) {
                if (!width && !height) {
                    resolve('./Full/' + filename + '.jpg');
                }
                else {
                    fs.stat('./thumb/' + filename + '-' + width + '-' + height + '.jpg', (err) => {
                        if (err == null) {
                            resolve('./thumb/' + filename + '-' + width + '-' + height + '.jpg');
                        }
                        else if (err.code === 'ENOENT') {
                            (0, sharp_1.default)('./Full/' + filename + '.jpg')
                                .resize(Number(width), Number(height))
                                .toFile('./thumb/' + filename + '-' + width + '-' + height + '.jpg')
                                .then(() => {
                                resolve('./thumb/' + filename + '-' + width + '-' + height + '.jpg');
                            })
                                .catch(() => {
                                reject('error while processing the image');
                            });
                        }
                    });
                }
                //------------------------------
            }
            else if (err.code === 'ENOENT') {
                reject('image not found');
            }
            else {
                reject('error');
            }
        });
    });
};
exports.default = {
    ProcessImage
};
