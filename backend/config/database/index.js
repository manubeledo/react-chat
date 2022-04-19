require('dotenv').config();
let mongoose = require('mongoose');
const logger = require('../../utils/logger')

function test(){
    console.log('un console log desde config', mongoose)
}

const MONGO_DB = process.env.MONGO_DB_URI;
const CONNECT = `${MONGO_DB}`

let connection = null;

(async ()=>{
    try {
        logger.getLogger('consola').info(`Conexion de mongo creada en ${CONNECT}`)
        connection = await mongoose.connect(`${CONNECT}`)
    } catch (error) {
        logger.getLogger('outerror').error('error al conectarse a Mongo')
        
    }
})()

const Schema = mongoose.Schema;

const chatsSchema = new Schema({
    username: String,
    usermail: String,
    chat: []
})

const newChatsSchema = new Schema({
    timestamp: String,
    chatID : String, 
    sender: String,
    receiver: String, 
    message: String
})

const chatModel = mongoose.model('chat', chatsSchema)
const newChatModel = mongoose.model('newChat', newChatsSchema)


module.exports = {chatModel, newChatModel, test}

