import Church, { IChurch } from "../schemas/Church";

class ChurchRepository {
    async create(churchData: IChurch): Promise<IChurch> {
        const church = new Church(churchData);
        await church.save();
        return church;
    }

    async findAll(): Promise<IChurch[]> {
        return Church.find();
    }

    async findById(id: number) {
        return Church.findById(id);
    }

    async update(id: number, churchData: IChurch) {
        return Church.findByIdAndUpdate(id, churchData, { new: true });
    }

    async delete(id: number) {
        return Church.findByIdAndDelete(id);
    }
}

export const churchRepository = new ChurchRepository();
