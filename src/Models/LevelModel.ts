import mongoose, { Schema, ObjectId } from "mongoose";
import ILevel from "./interfaces/ILevel";


const LevelSchema = new Schema <ILevel> ({

  nivel: {
    type: Number,
    required: true
  },

  descripcion: {
    type: String,
    required: true
  },

  dificultad: {
    type: String,
    required: true
  },

  palabrasCorrectas: {
    type: [String],
    required: true
  },

  patron: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pendiente"
  }

});

export const LevelModel = mongoose.model('level', LevelSchema)

