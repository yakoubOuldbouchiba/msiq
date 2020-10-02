/**
 * we using objet table
 */
var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all ojects.
async function  getObjects(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().query("SELECT * FROM objet"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// set new object
async function  setObject(objet){
    try{
        let pool = await (sql.connect(config));
        await pool.request()
        .input('co', sql.VarChar, objet.code_objet)
        .input('desig', sql.VarChar, objet.designation)
        .input('qty', sql.VarChar, parseInt(objet.quantite))
        .query("INSERT INTO objet VALUES("+
                    "@co,@desig,@qty);");
        return true;
    }catch(error){ 
        return false;
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
async function  deleteObject(code_objet){
    try{
        let pool = await (sql.connect(config));
         await pool.request()
        .input("code_objet", sql.VarChar, code_objet)
        .query("DELETE FROM objet where code_objet = @code_objet");
        return true;
    }catch(error){
        return false;
    }
}
module.exports = {
    getObjects,
    setObject,
    editObject,
    deleteObject
}