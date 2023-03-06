const socketSettings = (io, db, dbmsgs) => {
    let users = []
    let usersID = {}
    let messages = []

io.on('connection', socket => {
    console.log(`New connection ${socket.id}`)
    socket.on('newuser', (usuario) => {
        const exists = users.some((el) => el._id === usuario._id)
        if(!exists){
            usuario.socket_id = socket.id
            users.push(usuario)
            usersID[usuario.username] = socket.id
            io.emit('conectados', users)
        }else{
            const userUpdate = users.filter(el => {return el._id === usuario._id})
            userUpdate[0].pic = usuario.pic
            io.emit('conectados', users)
        }

    })

    socket.on('currentChattingUsers', async (usersFromClient) => {
        const dbUsersMessages = await dbmsgs.find({
            $or: [
                {sender: `${usersFromClient.sender}`, receiver: `${usersFromClient.receiver}`}, 
                {sender: `${usersFromClient.receiver}`, receiver: `${usersFromClient.sender}`} 
                ]
            })

        const socketA = usersID[usersFromClient.sender]
        const socketB = usersID[usersFromClient.receiver]

        io.to(socketA).emit('currentChat', dbUsersMessages);
        io.to(socketB).emit('currentChat', dbUsersMessages);
    })

    socket.on('disconnect', ()=> {
        const socket_id = socket.id
        users = users.filter(el => el.socket_id !== socket_id)
        io.emit('conectados', users)
    })

    socket.on('newmessage', async (msg) => {
        messages.push(msg)
        io.emit('loadmsgs', msg)
        await dbmsgs.create(msg)
    })
})

}

module.exports = socketSettings