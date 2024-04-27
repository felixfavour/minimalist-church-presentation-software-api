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
exports.churchRepository = void 0;
const Church_1 = __importDefault(require("../schemas/Church"));
class ChurchRepository {
    create(churchData) {
        return __awaiter(this, void 0, void 0, function* () {
            const church = new Church_1.default(churchData);
            yield church.save();
            return church;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Church_1.default.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Church_1.default.findById(id);
        });
    }
    update(id, churchData) {
        return __awaiter(this, void 0, void 0, function* () {
            return Church_1.default.findByIdAndUpdate(id, churchData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Church_1.default.findByIdAndDelete(id);
        });
    }
}
exports.churchRepository = new ChurchRepository();
