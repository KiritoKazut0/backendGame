import { Server } from "socket.io";
import { Server as HttpServer } from "node:http"
import IRoom from "./interfaces/IRoom";
import IRoomIndividual from "./interfaces/IRoomIndividual";
import { ValidateAnswers } from "./services/FindLevel";

const listRooms: Array<string> = [];

export const SocketServer = (server: HttpServer) => {

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log(`Un Usuario se ah conectado: ${socket.id}`);


        socket.on('JoinRoom', (data: IRoom) => {
            
        });


        socket.on('game', async (data: IRoomIndividual) => {

            try {

                const result = await ValidateAnswers(data);
                socket.emit('LevelComplete', result);

            } catch (error: unknown) {

                if (error instanceof Error) {
                    socket.emit('error', { msg: error.message });

                } else {
                    socket.emit('error', { msg: 'Hubo un problema al procesar el nivel' });
                }
            }
        })




        socket.on('disconnect', () => {
            console.log('a user has disconnected')
        })

    })


}