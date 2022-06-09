const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logger = require('../logs/logger')
const { chatModel : db } = require('../../config/database/index')

function createHash(pswd){
    return bcrypt.hash(pswd, 10, null)
}

function verifyJwt (req, res, next) {
    console.log('entre al verificador')
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

const authAccount = async (req, res, next) => {
    const user = req.body.data
    console.log(user)
    try {
        const userExists = await db.findOne({username: `${user.username}`})
        if(userExists){
            //logger.getLogger('outwarning').warn(`El usuario ya existe!`)
            //return done(null, false)
            console.log('ya existo')
            let bcryptCompare = bcrypt.compare(userExists.pswd, user.pswd)
            if(bcryptCompare){
                console.log('entre al if')
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
                //res.redirect('/authLogin')
            }else{
                return 'El username es valido, pero la conrtaseña no...'
            }
        }else{
            //let user = req.body
            user.pswd = await createHash(user.pswd)
            user.rol = 'user'
            await db.create(user)
            let userData = await db.findOne({username: user.username})
            //next()
            res.json({
                user: userData,
                message: 'Tu usuario fue creado con exito!'
            })
            next()
        }
    }catch(error){
        logger.getLogger('outerror').error('Saving error!', error) 
    }
}

module.exports = {authAccount, verifyJwt}