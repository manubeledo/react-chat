require('dotenv').config();
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const { chatModel : db } = require('../backend/config/database/index')
const { newChatModel : dbmsgs } = require('../backend/config/database/index')
const socketConfig = require('./sockets_config/index')


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

socketConfig(io, db, dbmsgs)

/*let users = []
let usersID = {}
let messages = []

io.on('connection', socket => {

    console.log(`New connection ${socket.id}`)

    socket.on('newuser', async (usuario) => {
        await db.create({username: `${usuario.name}`}) // Crea el user en la base de datos.
        usuario.socket_id = socket.id
        users.push(usuario)
        usersID[usuario.name] = socket.id
        io.emit('conectados', users)
    })

    socket.on('currentChattingUsers', async (usersFromClient) => {
        let dbUsersMessages = await dbmsgs.find({
            $or: [
                {sender: `${usersFromClient.sender}`, receiver: `${usersFromClient.receiver}`}, 
                {sender: `${usersFromClient.receiver}`, receiver: `${usersFromClient.sender}`} 
                ]
            })

        let socketA = usersID[usersFromClient.sender]
        let socketB = usersID[usersFromClient.receiver]

        io.to(socketA).emit('currentChat', dbUsersMessages);
        io.to(socketB).emit('currentChat', dbUsersMessages);
    })

    socket.on('disconnect', ()=> {
        let socket_id = socket.id
        users = users.filter(el => el.socket_id !== socket_id)
        io.emit('conectados', users)
    })

    socket.on('newmessage', async (msg) => {
        messages.push(msg)
        io.emit('loadmsgs', msg)
        console.log('Es es el sender y receiver', msg.sender, msg.receiver)
        await dbmsgs.create(msg)
    })
})*/

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

