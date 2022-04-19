const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors('*'))

app.get('/', (req, res) => res.send('En la raiz del server'))

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

