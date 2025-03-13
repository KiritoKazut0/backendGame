import IRoomIndividual from "../interfaces/IRoomIndividual"
import ICompleteLevel from "../interfaces/ICompleteLevel"
import { LevelModel } from "../../Models/LevelModel"
import { UserModel } from "../../Models/User"

export const ValidateAnswers = async (data: IRoomIndividual): Promise<ICompleteLevel> => {

    const user = await UserModel.findById(data.idUser);
    const level = await LevelModel.findById(data.idLevel);


    if (!user || !level) {
        throw new Error('Hubo un problema al obtener los datos del usuario o nivel. Verifica la información proporcionada.');
    }

    const pattern = new RegExp(level.patron);
    const correctAnswers = data.answers.filter(answer => pattern.test(answer));
    const incorrectAnswers = data.answers.filter(answer => !pattern.test(answer));
    let pointsEarned: number = 0;


    //verificar si la cantidad de malas es mayor a 2, si lo supera no pasa el nivel. 

    if (incorrectAnswers.length > 2) {
        return {
            message: "No lograste completar el nivel. ¡Puedes hacerlo la próxima vez!",
            correctAnswersList: correctAnswers,
            incorrectAnswersList: incorrectAnswers,
            score: 0,
            unlockedLevel: `El nivel ${level.nivel} sigue bloqueado.`
        }
        
    }


    //verificar si aun no ah completado el nivel 
    if (!user.levelComplete.includes(data.idLevel)) {
        //icrementamos sus pts de recompensa
        pointsEarned = correctAnswers.length * 20;
        user.score += pointsEarned;
        user.levelComplete.push(data.idLevel);
    }

    await user.save();

    return {
        message: "¡Felicidades, has completado el nivel!",
        correctAnswersList: correctAnswers,
        incorrectAnswersList: incorrectAnswers,
        score: pointsEarned,
        unlockedLevel: `Has desbloqueado el nivel ${level.nivel}`
    }

}


