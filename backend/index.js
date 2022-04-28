const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3001
const { chatModel : db } = require('../backend/config/database/index')

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

    socket.on('newuser', (usuario) => {
        db.create({username: `${usuario.name}`})
        usuario.socket_id = socket.id
        users.push(usuario)
        io.emit('conectados', users)
    })

    socket.on('newmessage', (msg) => {
        messages.push(msg)
        console.log(messages)
        io.emit('messages', messages)
    })

    socket.on('new-user-message', (msg) => {
        /*Buscar mensajes entre usuario 1 y usuario2 */
        /*Asegurarse de que estan en orden */
        /*Se emiten los mensajes */
        io.emit('all-chat-messages', messages)
    })


})

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

