import Presentation from "../../models/Presentation";
import Slide from "../../models/Slide";

interface PresentationInput {
    title: string;
}

export const presentationResolvers = {
    Query: {
        async getPresentation(_: any, { id }: { id: string }) {
            return await Presentation.findById(id).populate("slides");
        },

        async getPresentations(_: any) {
            return await Presentation.find().populate("slides");
        },
    },

    Mutation: {
        async createPresentation(
            _: any,
            { presentationInput }: { presentationInput: PresentationInput }
        ) {
            const newPresentation = new Presentation({
                ...presentationInput,
            });
            const savedPresentation = await newPresentation.save();

            const defaultSlide = new Slide({
                name: "Welcome!",
                type: "Title Slide",
                layout: "Standard",
                contents: ["This is your first slide!"],
                presentationId: savedPresentation._id,
            });
            await defaultSlide.save();

            await Presentation.findByIdAndUpdate(savedPresentation._id, {
                $push: { slides: defaultSlide._id },
            });

            return Presentation.findById(savedPresentation._id).populate(
                "slides"
            );
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

        async deletePresentation(_: any, { id }: { id: string }) {
            const wasDeleted = (await Presentation.deleteOne({ _id: id }))
                .deletedCount;
            return wasDeleted;
        },
    },
};
