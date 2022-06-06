const socketSettings = (io, db, dbmsgs) => {
    let users = []
    let usersID = {}
    let messages = []

io.on('connection', socket => {

    console.log(`New connection ${socket.id}`)

    socket.on('newuser', async (usuario) => {
        await db.create({
            username: `${usuario.username}`,
            pswd: `${usuario.pswd}`
        }) 
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
        //console.log('Es es el sender y receiver', msg.sender, msg.receiver)
        await dbmsgs.create(msg)
    })
})

}

module.exports = socketSettings