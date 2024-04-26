import { presentationTypeDefs } from "./presentation/presentation-type-defs";
import { churchTypeDefs } from "./church/church-type-defs";
import { merge } from "lodash";

const typeDefs = [presentationTypeDefs, churchTypeDefs];
// const typeDefs = merge({}, presentationTypeDefs, churchTypeDefs);

export default typeDefs;
