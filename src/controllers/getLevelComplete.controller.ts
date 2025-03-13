import { Request, Response } from "express";
import { UserModel } from "../Models/User";

export const listLevels = async (req: Request, res:Response) => {

  try {
    const idUser =  req.params.id;

    const listLevelComplete = await UserModel.findById(idUser)
        .populate('levelComplete')
        .exec;

    if (!listLevelComplete){
        return res.status(404).json({
            msg: 'Usuario no encontrado',
            data: null
        })
    }

    
    return res.status(200).json({
        msg: 'Lista de niveles',
        data: listLevelComplete
    })

  } catch (error) {
    return res.status(404).json({
        msg: 'Hubo un problema en el servidor',
        data: null
    })
  }

}