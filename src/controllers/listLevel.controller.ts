import { Request, Response } from "express";
import { UserModel } from "../Models/User";
import IUserWithLevels from "../Models/interfaces/IDocumentLevel";

export const listLevels = async (req: Request, res:Response) => {

  try {
    const idUser =  req.params.id;
    console.log(idUser)

   const userWithLevels = await UserModel.findById(idUser).populate({
              path: 'levelProgress.levelId',
              model: 'level'
          }) as IUserWithLevels | null;
  

    if (!userWithLevels){
        return res.status(404).json({
            msg: `User with ID ${idUser} not found or failed to populate levels.`,
            data: null
        })
    }

    const response = {
      score: userWithLevels.score,
      levelProgress: userWithLevels?.levelProgress.map((progress) => ({
        level: progress.levelId,
        status: progress.status
    }))
    }

    
    return res.status(200).json({
        msg: 'Lista de niveles',
        data: response
    })

  } catch (error) {
    return res.status(404).json({
        msg: 'Hubo un problema en el servidor',
        data: null
    })
  }

}