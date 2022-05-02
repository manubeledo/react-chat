const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3001
const { chatModel : db } = require('../backend/config/database/index')
const { newChatModel : dbmsgs } = require('../backend/config/database/index')


const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
let whitelist = ['http://localhost:3000']
let corsConfig = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed'))
        }
    },
    credentials: true
}
app.use(cors(corsConfig))

app.get('/', (req, res) => res.send('En la raiz del server'))

let users = []
let messages = []

io.on('connection', socket => {

    console.log(`New connection ${socket.id}`)

    socket.on('newuser', async (usuario) => {
        await db.create({username: `${usuario.name}`}) // Crea el user en la base de datos.
        usuario.socket_id = socket.id
        users.push(usuario)
        io.emit('conectados', users)
    })

    socket.on('newmessage', async (msg) => {
        messages.push(msg)
        console.log('Es es el sender y receiver', msg.sender, msg.receiver)
        let dbmessages = await dbmsgs.find({
            $or: [
                {sender: `${msg.sender}`, receiver: `${msg.receiver}`}, 
                {sender: `${msg.receiver}`, receiver: `${msg.sender}`} 
                ]
            })
        await dbmsgs.create(msg) // Crea el mensaje en la base de datos. 
        console.log('estos son los mensajes', dbmessages)
        io.emit('messages', messages)
    })

})

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

