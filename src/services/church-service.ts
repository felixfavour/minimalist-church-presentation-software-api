import { churchRepository } from "../repositories/church-repository";
import { IChurch } from "../schemas/Church";

async function addChurch(churchData: IChurch): Promise<IChurch> {
    try {
        const church = await churchRepository.create(churchData);
        return church;
    } catch (error) {
        throw new Error("Error creating church");
    }
}

async function getAllChurches(): Promise<IChurch[]> {
    try {
        const churches = await churchRepository.findAll();
        return churches;
    } catch (error) {
        throw new Error("Error retrieving churches");
    }
}

async function getChurchById(id: number): Promise<IChurch> {
    try {
        const church = await churchRepository.findById(id);
        if (!church) {
            throw new Error(`Church with ID ${id} not found`);
        }
        return church;
    } catch (errorr) {
        throw new Error("Error retrieving church");
    }
}

async function updateChurch(id: number, churchData: IChurch) {
    try {
        const church = await churchRepository.update(id, churchData);
        return church;
    } catch (error) {
        throw new Error("Error updating church");
    }
}

async function removeChurch(id: number) {
    try {
        const church = await churchRepository.delete(id);
        return church;
    } catch (error) {
        throw new Error("Error removing church");
    }
}

export default {
    addChurch,
    getAllChurches,
    getChurchById,
    updateChurch,
    removeChurch,
};
