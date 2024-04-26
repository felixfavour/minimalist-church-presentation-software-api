import { merge } from "lodash";
import { presentationResolvers } from "./presentation/presentation-resolvers";
import { churchResolvers } from "./church/church-resolvers";

const resolvers = merge({}, presentationResolvers, churchResolvers);

export default resolvers;
