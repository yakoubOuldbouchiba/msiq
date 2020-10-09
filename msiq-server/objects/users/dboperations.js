const BCRYPT = require('bcrypt');
const saltRounds=10;
const jwt = require('jsonwebtoken');
var config = require('../../config/dbconfig.js');
const sql = require('mssql');
const {generateJWT} = require ('../../services/auth-service.js')
// getting all users.
async function getUsers(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().execute("GetUsers"));
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
            .input('ln', sql.VarChar, user.lastName)
            .input('fn', sql.VarChar, user.firstName)
            .input('bd', sql.DateTimeOffset, user.ddn)
            .input('tu', sql.VarChar, user.usertype)
            .input('tel', sql.VarChar, user.mobile)
            .input('email', sql.VarChar, user.email)
            .input('job', sql.VarChar, user.fonction)
            .input('struc', sql.VarChar, user.structure)
            .input('depart', sql.VarChar, user.departement)
            .execute('setAccountDemand');
            console.log('User Inserted');
            sql.close();
            return  'UI' //user inserted
        } catch (error) {
            console.log('can not instert user');
            sql.close();
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
                title: "Ce utilisateur n'est n'exister pas",
                error: 'User not found'
            }
        }else{
            let auth = await BCRYPT.compareSync(user.password , user_data.recordset[0].userPassword);
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
async function  editUser(){
    try{
        //let pool =  sql.connect(config);
    }catch(error){
        console.log(error);
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
module.exports = {
    getUsers,
    getUser,
    setUser,
    editUser,
    deleteUser,
    Login,
}