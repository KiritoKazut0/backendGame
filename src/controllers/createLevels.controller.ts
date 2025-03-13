import { Request, Response } from "express";
import { LevelModel } from "../Models/LevelModel";
import ILevelRequest from "../interface/LevelRequest";

export const InsertLevel = async (req: Request, res: Response) => {
    try {

        const { levels }: ILevelRequest = req.body;
        if (!levels || !Array.isArray(levels) || levels.length === 0) {
            return res.status(400).json({ message: "Debe enviar una lista de niveles." });
        }

        const insertedLevels = await LevelModel.insertMany(levels);

        return res.status(201).json(insertedLevels);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hubo un error al insertar los niveles." });
    }
};
