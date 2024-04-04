import { merge } from "lodash";
import { presentationResolvers } from "./presentation/presentation-resolvers";

const resolvers = merge({}, presentationResolvers);

export default resolvers;
