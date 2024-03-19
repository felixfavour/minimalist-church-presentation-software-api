import { churchRepository } from "../repositories/church-repository";
import { IChurch } from "../schemas/Church";

async function addChurch(churchData: IChurch) {
    try {
        const church = await churchRepository.create(churchData);
        return church;
    } catch (error) {
        throw new Error("Error creating church");
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
    removeChurch,
};
