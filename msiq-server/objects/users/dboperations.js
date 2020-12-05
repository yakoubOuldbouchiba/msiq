const BCRYPT = require('bcrypt');
const saltRounds=10;
const jwt = require('jsonwebtoken');
var config = require('../../config/dbconfig.js');
const sql = require('mssql');
const {generateJWT} = require ('../../services/auth-service.js')
// getting all users.
async function getUsers(struct , user){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request()
        .input('struct', sql.VarChar , struct)
        .input('user', sql.VarChar , user)
        .execute("GetUsers"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// get a single user.
async function getUser(email){
    try{
        let pool = await (sql.connect(config));
        let user = await pool.request()
        .input("email", sql.VarChar, email)
        .execute("GetUser")
        return user.recordset[0];
    }catch(error){
        return 0;
    }
}

// set new user
async function  setUser(user){   
    try {
        await sql.connect(config)
        try {
            let PW = await BCRYPT.hash(user.passWord, saltRounds);
            await new sql.Request()
            .input('pw', sql.NVarChar, PW)
            .input('ln', sql.VarChar, user.nomUtilisateur)
            .input('fn', sql.VarChar, user.prenomUtilisateur)
            .input('bd', sql.DateTimeOffset, user.ddn)
            .input('tu', sql.VarChar, user.typeUtilisateur)
            .input('tel', sql.VarChar, user.mobile)
            .input('email', sql.VarChar, user.email)
            .input('job', sql.VarChar, user.fonction)
            .input('struc', sql.VarChar, user.structure)
            .input('pt', sql.VarChar, user.posteTelephonique)
            .input('depart', sql.VarChar, user.departement)
            .execute('setAccountDemand');
            console.log('User Inserted');
            //sql.close();
            return  'UI'   
              //user inserted
        } catch (error) {
            console.log('can not instert user');
            //sql.close();
            return 'CNIU'; // can not insert user
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// Login user
async function  Login(user){
    try{
        let pool = await sql.connect(config);
        let user_data = await pool.request()
        .input("email",sql.VarChar,user.email)
        .execute("LOGIN");
        if(user_data.recordset.length == 0){
            return {
                title: "Ce utilisateur n'exister pas ou le compte est désactivé par votre directeur",
                error: 'User not found'}

            }else{  
            let auth = await BCRYPT.compare(user.password , user_data.recordset[0].userPassword);
            if(auth){
                if(user_data.recordset[0].typeUtilisateur==user.role){ 
                    let userInfo = await getUser(user.email);
                    return {
                        title: 'User in',
                        token: generateJWT(userInfo)
                    }
                }else{
                    return {
                        title: 'verifiez votre type',
                        error: 'Wrong Function'
                    }
                }
            }else{
                return {
                    title: 'Verifiez votre mot de passe',
                    error: 'Wrong Password'
                }
            }
            
        }  
    }catch(error){
        return {
            title: 'desolé, erreur de serveur',
            error: 'Something went wrong'
        }
    }
}
//edit user
async function  editUser(user){
    try{
        await sql.connect(config);
        try {
            await new sql.Request()
            .input('email', sql.VarChar, user.UserName)
            .input('ln', sql.VarChar, user.LastName)
            .input('fn', sql.VarChar, user.LastName)
            .input('bd', sql.DateTimeOffset, user.dateNaissance)
            .input('tel', sql.VarChar, user.Tel)
            .input('job', sql.VarChar, user.Fonction)
            .input('struc', sql.VarChar, user.Structure)
            .input('depart', sql.VarChar, user.Departement)
            .input('pt', sql.VarChar, user.PosteTelephonique)
            .execute('UpdateUser');
            console.log('user updated');
            return 'UU';
        } catch (error) {
            console.log(error);
            return 'CNUU'
        }
    }catch(error){
        return 'CNCTDB';
    }
}
// delete user
async function  deleteUser(email){
    try{
        let pool = await (sql.connect(config));
         await pool.request()
        .input("email", sql.VarChar, email)
        .execute("DeleteUser");
        return true;
    }catch(error){
        return false;
    }
}

async function  confirm(user){
    try{
        await sql.connect(config);
        try {
            let result = await new sql.Request()
            .input('email', sql.VarChar, user.UserName)
            .execute('LOGIN');
            if (await BCRYPT.compare(user.PassWord, result.recordset[0].userPassword))
                return 'G';
            else
                return 'WP';
        } catch (error) {
            return 'CNFU'
        }
    }catch(error){
        return 'CNCTDB';
    }
}

async function  changePW(user){
    try{
        await sql.connect(config);
        try {
            let PW = await BCRYPT.hash(user.pw, saltRounds);
            await new sql.Request()
            .input('email', sql.VarChar, user.UserName)
            .input('npw', sql.VarChar, PW)
            .execute('UpdatePassword');
            return 'G';
        } catch (error) {
            return 'CIP'
        }
    }catch(error){
        return 'CNCTDB';
    }
}

async function  TAccDemande(UserID,Msg){
    try{
        await sql.connect(config);
        try {
            console.log(UserID+' '+Msg);
            await new sql.Request()
            .input('email', sql.VarChar, UserID)
            .input('Msg', sql.VarChar, Msg)
            .execute('TAccDemande');
            console.log('Accout has been '+Msg+'ed');
            return Msg;
        } catch (error) {
            console.log(error);
            console.log('Something went wrong');
            return 'SomeThing went wrong'
        }
    }catch(error){
        return 'CNCTDB';
    }
}

module.exports = {
    getUsers,
    getUser,
    setUser,
    editUser,
    deleteUser,
    Login,
    confirm,
    changePW,
    TAccDemande,

}