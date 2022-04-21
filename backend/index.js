const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3001

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
    const user = req.body
    console.log(user)
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

