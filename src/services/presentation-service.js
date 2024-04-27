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
const presentation_repository_1 = require("../repositories/presentation-repository");
const slide_repository_1 = require("../repositories/slide-repository");
function addPresentation(presentationData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const presentation = yield presentation_repository_1.presentationRepository.create(presentationData);
            return presentation;
        }
        catch (error) {
            throw new Error("Error creating presentation");
        }
    });
}
function getAllPresentations() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const presentations = yield presentation_repository_1.presentationRepository.findAll();
            return presentations;
        }
        catch (error) {
            throw new Error("Error retrieving presentationes");
        }
    });
}
function getPresentationById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const presentation = yield presentation_repository_1.presentationRepository.findById(id);
            if (!presentation) {
                throw new Error(`Presentation with ID ${id} not found`);
            }
            return presentation;
        }
        catch (errorr) {
            throw new Error("Error retrieving presentation");
        }
    });
}
function updatePresentation(id, presentationData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const presentation = yield presentation_repository_1.presentationRepository.update(id, presentationData);
            return presentation;
        }
        catch (error) {
            throw new Error("Error updating presentation");
        }
    });
}
function removePresentation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield slide_repository_1.slideRepository.deleteMany(id);
            yield presentation_repository_1.presentationRepository.delete(id);
        }
        catch (error) {
            throw new Error("Error removing presentation");
        }
    });
}
function addSlide(presentationId, slideData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newSlide = yield slide_repository_1.slideRepository.create(slideData);
            const updatedPresentation = yield presentation_repository_1.presentationRepository.addSlideToPresentation(presentationId, newSlide._id);
            return updatedPresentation;
        }
        catch (error) {
            throw new Error(`Error adding slide to presentation`);
        }
    });
}
function removeSlide(presentationId, slideId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPresentation = yield presentation_repository_1.presentationRepository.removeSlide(presentationId, slideId);
            yield slide_repository_1.slideRepository.delete(slideId);
            if (!updatedPresentation) {
                throw new Error("Presentation not found or slide not part of the presentation");
            }
            return updatedPresentation;
        }
        catch (error) {
            throw new Error(`Error removing slide`);
        }
    });
}
exports.default = {
    addPresentation,
    getAllPresentations,
    getPresentationById,
    updatePresentation,
    removePresentation,
    addSlide,
    removeSlide,
};
