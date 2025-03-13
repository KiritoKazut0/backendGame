import mongoose, { Schema } from "mongoose";
import IUser from "./interfaces/IUser";

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    levelProgress: [{
        levelId: {
            type: Schema.Types.ObjectId,
            ref: "level"
        },
        status: {
            type: String,
            default: "Pendiente"
        }
    }],
    roomCode: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});

export const UserModel = mongoose.model('user', UserSchema);
