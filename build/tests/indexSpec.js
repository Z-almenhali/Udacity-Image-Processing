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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs = __importStar(require("fs"));
const request = (0, supertest_1.default)(index_1.default.app);
//Failed cases
describe('Test failed endpoint responses', () => {
    it('check if the parameter sent', async () => {
        // Arrange
        const endpoint = '/images';
        // Act
        const response = await request.get(endpoint);
        // Assert
        expect(response.status).toBe(400);
        expect(response.text).toBe('parameter not sent');
    });
    it('check if the Image exists', async () => {
        // Arrange
        const endpoint = '/images?filename=dog';
        // Act
        const response = await request.get(endpoint);
        // Assert
        expect(response.status).toBe(400);
        expect(response.text).toBe('image not found');
    });
});
//Successful cases
describe('Test successful endpoint responses', () => {
    it('find image without resizing', async () => {
        // Arrange
        const endpoint = '/images?filename=cat';
        // Act
        const response = await request.get(endpoint);
        // Assert
        expect(response.status).toBe(200);
    });
});
it('Image resized and saved', async () => {
    // Arrange
    const endpoint = '/images?filename=cat&width=121&height=121';
    // Act
    const response = await request.get(endpoint);
    // Assert
    fs.stat('./thumb/cat-121-121.jpg', (err) => {
        expect(response.status).toBe(200);
        expect(err).toBe(null);
    });
});
