import IUserRequest from "../interface/IUserRequest";
import { UserModel } from "../Models/User";
import IUserResponse from "../interface/UserResponse";
import { LevelModel } from "../Models/LevelModel";
import IUserWithLevels from "../Models/interfaces/IDocumentLevel";
import { Request, Response } from "express";
import ILevel from "../Models/interfaces/ILevel";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password }: IUserRequest = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: 'is required fields',
                data: null
            });
        }

        const levels = await LevelModel.find();
        
        const levelProgress = levels.map((level) => ({
            levelId: level._id,
            status: "Pendiente",
            score: 0,
        }));

        const newUser = await UserModel.create({
            email,
            password,
            levelProgress
        });

     
        
        const response: IUserResponse = {
           id: newUser._id.toString(),
           email: newUser.email,
           score: newUser.score,
           levelProgress: null
        };

        return res.status(201).json({
            msg: 'user create succefully',
            data: response
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hubo un error en el servidor',
            data: null
        })

    }


}