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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentationRepository = void 0;
const Presentation_1 = __importDefault(require("../schemas/Presentation"));
class PresentationRepository {
    create(sermonData) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentation = new Presentation_1.default(sermonData);
            yield presentation.save();
            return presentation;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Presentation_1.default.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Presentation_1.default.findById(id).populate("slides");
        });
    }
    update(id, sermonData) {
        return __awaiter(this, void 0, void 0, function* () {
            return Presentation_1.default.findByIdAndUpdate(id, sermonData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Presentation_1.default.findByIdAndDelete(id);
        });
    }
    findByChurchId(churchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Presentation_1.default.find({ churchId: churchId });
        });
    }
    addSlideToPresentation(presentationId, slideId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPresentation = yield Presentation_1.default.findOneAndUpdate({ _id: presentationId }, { $push: { slides: slideId } }, { new: true });
            if (!updatedPresentation) {
                throw new Error(`Presentation with ID ${presentationId} not found`);
            }
            return updatedPresentation;
        });
    }
    removeSlide(presentationId, slideId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPresentation = yield Presentation_1.default.findOneAndUpdate({ _id: presentationId, slides: slideId }, { $pull: { slides: slideId } }, { new: true });
                if (!updatedPresentation) {
                    throw new Error(`Presentation containing slide ID ${slideId} not found`);
                }
                return updatedPresentation;
            }
            catch (error) {
                throw new Error(`Error removing slide from presentation`);
            }
        });
    }
}
exports.presentationRepository = new PresentationRepository();
