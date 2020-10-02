const jwt = require('jsonwebtoken');
var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// getting all users.
async function getUsers(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().query("SELECT * FROM client"));
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
        .query("SELECT * FROM client where userName = @user_name");
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
        .input('un', sql.VarChar, user.userName)
        .input('pw', sql.VarChar, user.passWord)
        .input('ln', sql.VarChar, user.lastName)
        .input('fn', sql.VarChar, user.firstName)
        .input('bd', sql.DateTimeOffset, user.ddn)
        .input('tel', sql.VarChar, user.mobile)
        .input('email', sql.VarChar, user.email)
        .input('job', sql.VarChar, user.fonction)
        .input('struc', sql.VarChar, user.structure)
        .input('depart', sql.VarChar, user.departement)
        .query("INSERT INTO client VALUES("+
                    "@un,@pw,@ln,@fn,@bd,@tel,@email,@job,@struc,@depart);");           
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
        .input("user_name",sql.VarChar,user.userName)
        .query("SELECT userPassword , fonction FROM client where userName = @user_name");
        if(user_data.recordset.length == 0){
            return {
                title: 'User not found',
                error: 'User not found'
            }
        }else{
            if(user_data.recordset[0].userPassword ==user.password){
                if(user_data.recordset[0].fonction==user.role){
                    return {
                        title: 'User in',
                        token: jwt.sign(user.userName, 'TMPK3Y')
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
        console.log("request done");    
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
async function  deleteUser(userName){
    try{
        let pool = await (sql.connect(config));
         await pool.request()
        .input("user_name", sql.VarChar, userName)
        .query("DELETE FROM client where userName = @user_name");
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