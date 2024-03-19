import { sermonRepository } from "../repositories/sermon-repository";
import { ISermon } from "../schemas/Sermon";

async function addSermon(sermonData: ISermon): Promise<ISermon> {
    try {
        const sermon = await sermonRepository.create(sermonData);
        return sermon;
    } catch (error) {
        throw new Error("Error creating sermon");
    }
}

async function getAllSermons(): Promise<ISermon[]> {
    try {
        const sermons = await sermonRepository.findAll();
        return sermons;
    } catch (error) {
        throw new Error("Error retrieving sermones");
    }
}

async function getSermonById(id: number): Promise<ISermon> {
    try {
        const sermon = await sermonRepository.findById(id);
        if (!sermon) {
            throw new Error(`Sermon with ID ${id} not found`);
        }
        return sermon;
    } catch (errorr) {
        throw new Error("Error retrieving sermon");
    }
}

async function updateSermon(id: number, sermonData: ISermon) {
    try {
        const sermon = await sermonRepository.update(id, sermonData);
        return sermon;
    } catch (error) {
        throw new Error("Error updating sermon");
    }
}

async function removeSermon(id: number) {
    try {
        const sermon = await sermonRepository.delete(id);
        return sermon;
    } catch (error) {
        throw new Error("Error removing sermon");
    }
}

export default {
    addSermon,
    getAllSermons,
    getSermonById,
    updateSermon,
    removeSermon,
};
