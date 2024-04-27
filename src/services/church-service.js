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
const church_repository_1 = require("../repositories/church-repository");
function addChurch(churchData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const church = yield church_repository_1.churchRepository.create(churchData);
            return church;
        }
        catch (error) {
            throw new Error("Error creating church");
        }
    });
}
function getAllChurches() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const churches = yield church_repository_1.churchRepository.findAll();
            return churches;
        }
        catch (error) {
            throw new Error("Error retrieving churches");
        }
    });
}
function getChurchById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const church = yield church_repository_1.churchRepository.findById(id);
            if (!church) {
                throw new Error(`Church with ID ${id} not found`);
            }
            return church;
        }
        catch (errorr) {
            throw new Error("Error retrieving church");
        }
    });
}
function updateChurch(id, churchData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const church = yield church_repository_1.churchRepository.update(id, churchData);
            return church;
        }
        catch (error) {
            throw new Error("Error updating church");
        }
    });
}
function removeChurch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const church = yield church_repository_1.churchRepository.delete(id);
            return church;
        }
        catch (error) {
            throw new Error("Error removing church");
        }
    });
}
exports.default = {
    addChurch,
    getAllChurches,
    getChurchById,
    updateChurch,
    removeChurch,
};
