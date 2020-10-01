var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all messages.
async function  getMessages(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new message
async function  setMessage(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
//edit message
async function  editMessage(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete message
async function  deleteMessage(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getMessages,
    setMessage,
    editMessage,
    deleteMessage
}