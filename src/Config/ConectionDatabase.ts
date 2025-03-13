import mongoose from "mongoose";

const MONGODB_HOST = 'localhost'
const MONGODB_NAME_DATABASE = 'Game'


const MongoUrl = `mongodb://${MONGODB_HOST}/${MONGODB_NAME_DATABASE}`
mongoose.connect(MongoUrl)
.then(db => console.log ('Db is connected'))
.catch(error => console.log(error))