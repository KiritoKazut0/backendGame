import { UserModel } from "../Models/User";
import IUserRequest from "../interface/IUserRequest";
import { Request, Response } from "express";
import IUserResponse from "../interface/UserResponse";
import IUserWithLevels from "../Models/interfaces/IDocumentLevel";

export const Login = async (req: Request, res: Response) => {

    try {
        const { email, password }: IUserRequest = req.body;

        const user = await UserModel.findOne({ email, password });


        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
                data: null
            });
        }


        const userWithLevels = await UserModel.findById(user.id).populate({
            path: 'levelProgress.levelId',
            model: 'level'
        }) as IUserWithLevels | null;

        if (!userWithLevels) {
            throw new Error(`User with ID ${user.id} not found or failed to populate levels.`)
        }

        const response: IUserResponse = {
            id: user._id.toString(),
            email: user.email,
            score: user.score,
            levelProgress: userWithLevels?.levelProgress.map((progress) => ({
                level: progress.levelId,
                status: progress.status
            }))
        };


        return res.status(200).json({
            msg: 'Access succefully',
            data: response
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error',
            data: null
        })
    }


}