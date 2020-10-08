import { json } from 'body-parser'
import jwt from 'jsonwebtoken'

export function generateJWT(user){
    const tokenData = {
        email : user.email, 
        nomUtilisateur : user.nomUtilisateur, 
        prenomUtilisateur : user.prenomUtilisateur,
        fonction : user.fonction,
        typeUtilisateur  : user.typeUtilisateur 
        
    }
    return jwt.sign({user : tokenData}, 'TMPK3Y')
}

//this checking the user is loging before enter any router
export function requireLogin(req, res , next){
    const token = decodeToken(req);
    //only is not enough we should test id with type user. 
    if(!token){
        res.status(401).json({message : "we have to be login"});
    }
    next();
}

//verifier if we have a right token
export function decodeToken(req){
    console.log(req.header('Authorization'))
    const token = req.header('Authorization')
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token,'TMPK3Y')
    }catch(error){
        return null
    }
}

