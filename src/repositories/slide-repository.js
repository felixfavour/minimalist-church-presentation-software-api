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
exports.slideRepository = void 0;
const Slide_1 = __importDefault(require("../schemas/Slide"));
class SlideRepository {
    create(slideData) {
        return __awaiter(this, void 0, void 0, function* () {
            const slide = new Slide_1.default(slideData);
            yield slide.save();
            return slide;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Slide_1.default.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Slide_1.default.findById(id);
        });
    }
    update(id, slideData) {
        return __awaiter(this, void 0, void 0, function* () {
            return Slide_1.default.findByIdAndUpdate(id, slideData, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Slide_1.default.findByIdAndDelete(id);
        });
    }
    deleteMany(presentationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Slide_1.default.deleteMany({
                presentationId: presentationId,
            });
            return result.deletedCount;
        });
    }
}
exports.slideRepository = new SlideRepository();
