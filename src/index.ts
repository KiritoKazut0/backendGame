import 'dotenv/config'
import './Config/ConectionDatabase'
import express from "express"
import {createServer} from "node:http"
import { SocketServer } from "./Socket";
import router from "./routes/routes";

const port = 3000;
const app = express();
app.use(express.json())
app.use('/',router)

const server = createServer(app);



// SocketServer(server)

server.listen(port,() => {
    console.log(`Server Listening on port ${port}`);
})