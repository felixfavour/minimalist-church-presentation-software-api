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
Object.defineProperty(exports, "__esModule", { value: true });
const slide_repository_1 = require("../repositories/slide-repository");
function addSlide(slideData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const slide = yield slide_repository_1.slideRepository.create(slideData);
            return slide;
        }
        catch (error) {
            throw new Error("Error creating slide");
        }
    });
}
function getAllSlidees() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const slidees = yield slide_repository_1.slideRepository.findAll();
            return slidees;
        }
        catch (error) {
            throw new Error("Error retrieving slidees");
        }
    });
}
function getSlideById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const slide = yield slide_repository_1.slideRepository.findById(id);
            if (!slide) {
                throw new Error(`Slide with ID ${id} not found`);
            }
            return slide;
        }
        catch (errorr) {
            throw new Error("Error retrieving slide");
        }
    });
}
function updateSlide(id, slideData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const slide = yield slide_repository_1.slideRepository.update(id, slideData);
            return slide;
        }
        catch (error) {
            throw new Error("Error updating slide");
        }
    });
}
exports.default = {
    addSlide,
    getAllSlidees,
    getSlideById,
    updateSlide,
};
