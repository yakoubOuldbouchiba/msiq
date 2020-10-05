const jwt = require('jsonwebtoken');
var config = require('../../config/dbconfig.js');
const sql = require('mssql');

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
async function getUser(userID){
    try{
        let pool = await (sql.connect(config));
        let user = await pool.request()
        .input("user_name", sql.VarChar, userID)
        .execute("GetUsers")
        return user.recordsets;
    }catch(error){
        return 0;
    }
}

// set new user
async function  setUser(user){
    console.log(user);
    try{
        let pool = await (sql.connect(config));
        let insertUser = await pool.request()
        .input('email', sql.VarChar, user.email)
        .input('pw', sql.VarChar, user.passWord)
        .input('ln', sql.VarChar, user.lastName)
        .input('fn', sql.VarChar, user.firstName)
        .input('tu', sql.VarChar, user.tu)
        .input('bd', sql.DateTimeOffset, user.ddn)
        .input('tel', sql.VarChar, user.mobile)
        .input('job', sql.VarChar, user.fonction)
        .input('struc', sql.VarChar, user.structure)
        .input('depart', sql.VarChar, user.departement)
        .execute('SetUsers');         
        return insertUser.recordsets;
    }catch(error){ 
        return 0;
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
                title: 'User not found',
                error: 'User not found'
            }
        }else{
            if(user_data.recordset[0].userPassword==user.password){
                if(user_data.recordset[0].typeUtilisateur==user.role){
                    return {
                        title: 'User in',
                        token: jwt.sign(user.email, 'TMPK3Y')
                    }
                }else{
                    return {
                        title: 'Wrong Function',
                        error: 'Wrong Function'
                    }
                }
            }else{
                return {
                    title: 'Wrong Password',
                    error: 'Wrong Password'
                }
            }
            
        }  
    }catch(error){
        return {
            title: 'Something went wrong',
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
    Login
}