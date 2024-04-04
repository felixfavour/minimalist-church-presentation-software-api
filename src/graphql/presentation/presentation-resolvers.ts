import Presentation from "../../models/Presentation";

interface PresentationInput {
    title: string;
}

export const presentationResolvers = {
    Query: {
        async getPresentation(_: any, { id }: { id: string }) {
            return await Presentation.findById(id);
        },
        async getPresentations(_: any) {
            return await Presentation.find();
        },
    },
    Mutation: {
        async createPresentation(
            _: any,
            { presentationInput }: { presentationInput: PresentationInput }
        ) {
            const newPresentation = new Presentation({
                title: presentationInput.title,
            });
            const res = await newPresentation.save();
            return res;
        },

        async deletePresentation(_: any, { id }: { id: string }) {
            const wasDeleted = (await Presentation.deleteOne({ _id: id }))
                .deletedCount;
            return wasDeleted;
        },
        async editPresentation(
            _: any,
            {
                id,
                presentationInput,
            }: { id: string; presentationInput: PresentationInput }
        ) {
            const wasEdited = (
                await Presentation.updateOne(
                    { _id: id },
                    {
                        title: presentationInput.title,
                    }
                )
            ).modifiedCount;
            return wasEdited;
        },
    },
};
