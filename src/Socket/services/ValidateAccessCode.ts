import { UserModel } from "../../Models/User";

const AccessCode = async (id: string, code: string): Promise<{ value: boolean, msg: string, code: string }> => {

    try {

        const user = await UserModel.findOne({ $where: id });
        


    } catch (error) {
        console.log('Hubo un problema al internar buscar el codigo de verificacion');
        return {
            msg: "Hubo un problema al internar buscar el codigo de verificacion",
            value: false,
            code
        }

    }


}