
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
// set new user
function  setUser(){
    try{
        let pool =  sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// Login user
function  Login(){
    try{
        //let pool =  sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
//edit user
function  editUser(){
    try{
        //let pool =  sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete user
function  deleteUser(){
    try{
        //let pool =  sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getUsers,
    setUser,
    editUser,
    deleteUser,
    Login
}