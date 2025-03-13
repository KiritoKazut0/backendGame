export default interface IUser {
    email: string;
    password: string;
    levelProgress: {
        levelId: string;
        status: 'Completado' | 'Pendiente';
    }[];
    roomCode?: string;
    score: number;
}
