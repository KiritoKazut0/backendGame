import ILevel from "../Models/interfaces/ILevel";

export default interface IUserResponse {
    id: string,
    email: string;
    score: number
    levelProgress: {
        level: ILevel;
        status: string;
    }[] | null;
}