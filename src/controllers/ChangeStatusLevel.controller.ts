import { Request, Response } from "express";
import { UserModel } from "../Models/User";

export const updateStatusLevel = async (req: Request, res: Response) => {
    const { idUser, idLevel, status } = req.body;

    try {

        if (!idUser || !idLevel || !status) {
            return res.status(400).json({ message: "Faltan parámetros requeridos." });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: idUser, "levelProgress.levelId": idLevel },
            { $set: { "levelProgress.$.status": status } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado o nivel no encontrado en el progreso."});
        }

        return res.status(200).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hubo un error al actualizar el estado del nivel." });
    }
};
