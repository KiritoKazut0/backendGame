import { Document, ObjectId } from "mongoose";

import ILevel from "./ILevel";

export default interface IUserWithLevels extends Document {
    id: ObjectId;
    email: string;
    score: number;
    levelProgress: {
        levelId: ILevel; 
        status: string;
    }[];
}
