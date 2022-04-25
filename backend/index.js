const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3001

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

app.post('/login', (req, res)=>{
    const user = req.body.name
    // console.log(req.body.name)
    res.json(user)
})

let users = []

io.on('connection', socket => {

    console.log(`New connection ${socket.id}`)

    socket.on('newuser', (usuario) => {
        console.log('Nuevo usuario logueado con el nombre:', usuario.name)
        users.push(usuario.name)
        io.emit('conectados', users)
    })

})

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

