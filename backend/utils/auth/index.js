const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logger = require('../logs/logger')
const { chatModel : db } = require('../../config/database/index')

function createHash(pswd){
    return bcrypt.hash(pswd, 10, null)
}

function bcryptCompare (userExists, user) {
    console.log(userExists.pswd, user.pswd, 'en el compare')
    return bcrypt.compareSync(user.pswd, userExists.pswd)
}

const authAccount = async (req, res, next) => {
    const user = req.body.data
    console.log(user, 'el user desde body')
    try {
        const userExists = await db.findOne({username: `${user.username}`})
        if(userExists){
            const match = await bcrypt.compareSync(user.pswd, userExists.pswd)
            if(match){
                // JSON WEB TOKEN LOGIC 
                req.session.user = userExists
                const id = userExists._id
                const token = jwt.sign({id}, 'jwtSecret', {
                    expiresIn: 300
                })
                res.json({
                    auth: true,
                    token: token,
                    user: userExists
                })
            }else{
                res.json({
                    auth: false,
                    message: 'El username es valido, pero la conrtaseña no...'
                })
            }
        }else{
            user.pswd = await createHash(user.pswd)
            user.rol = 'user'
            await db.create(user)
            let userData = await db.findOne({username: user.username})
            res.json({
                user: userData,
                message: 'Tu usuario fue creado con exito!',
                status: 'User registrated'
            })
            next()
        }
    }catch(error){
        logger.getLogger('outerror').error('Saving error!', error) 
    }
}

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        res.send('We need a token, give it to us next time')
    }else{
        jwt.verify(token, "jwtSecret", (err, decoded)=>{
            if(err){
                res.json({
                    auth: false,
                    message: 'You failed to authenticate'
                })
            }else{
                req.userId = decoded.id
                next()
            }
        })
    }
}

// SOLUCIONAR DETALLE DEL REGISTRO CON LA FUNCION verifyJwt. 

module.exports = {authAccount, verifyJwt}