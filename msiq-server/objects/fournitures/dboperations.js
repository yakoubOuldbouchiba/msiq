/**
 * we using objet table
 */
var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all ojects.
async function  getObjects(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new object
async function  setObject(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
//edit object
async function  editObject(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete message
async function  deleteObject(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getObjects,
    setObject,
    editObject,
    deleteObject
}