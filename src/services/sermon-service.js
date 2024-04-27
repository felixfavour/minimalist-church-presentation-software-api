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
const sermon_repository_1 = require("../repositories/sermon-repository");
function addSermon(sermonData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sermon = yield sermon_repository_1.sermonRepository.create(sermonData);
            return sermon;
        }
        catch (error) {
            throw new Error("Error creating sermon");
        }
    });
}
function getAllSermons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sermons = yield sermon_repository_1.sermonRepository.findAll();
            return sermons;
        }
        catch (error) {
            throw new Error("Error retrieving sermones");
        }
    });
}
function getSermonById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sermon = yield sermon_repository_1.sermonRepository.findById(id);
            if (!sermon) {
                throw new Error(`Sermon with ID ${id} not found`);
            }
            return sermon;
        }
        catch (errorr) {
            throw new Error("Error retrieving sermon");
        }
    });
}
function updateSermon(id, sermonData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sermon = yield sermon_repository_1.sermonRepository.update(id, sermonData);
            return sermon;
        }
        catch (error) {
            throw new Error("Error updating sermon");
        }
    });
}
function removeSermon(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sermon = yield sermon_repository_1.sermonRepository.delete(id);
            return sermon;
        }
        catch (error) {
            throw new Error("Error removing sermon");
        }
    });
}
exports.default = {
    addSermon,
    getAllSermons,
    getSermonById,
    updateSermon,
    removeSermon,
};
