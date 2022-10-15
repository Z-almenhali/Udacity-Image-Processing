"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middleware/middlewares"));
const utils_1 = __importDefault(require("../Utils/utils"));
const route = (0, express_1.Router)();
route.get('/', middlewares_1.default.validation, (req, res) => {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    utils_1.default
        .ProcessImage(filename, width, height)
        .then((imagePath) => {
        return res.sendFile(imagePath, { root: '.' });
    })
        .catch((error) => {
        return res.status(400).send(error);
    });
});
exports.default = {
    route
};
