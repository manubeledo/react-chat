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

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

