/**
 * we using objet table
 */
var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all ojects.
async function  getObjects(){
    try{
         await (sql.connect(config));
        let users = await (new sql.Request().execute("GETOBJETS"));
        sql.close();
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
        .input('co', sql.VarChar, objet.code_object)
        .input('desig', sql.VarChar, objet.designation)
        .input('qty', sql.Int, parseInt(objet.quantite))
        .execute("SETOBJET");
        sql.close();
        return true;
    }catch(error){ 
        return false;
    }
}
//edit object
async function  editObject(objet){
    try{
         await (sql.connect(config));
         await new sql.Request()
        .input('co', sql.VarChar, objet.code_object)
        .input('desig', sql.VarChar, objet.designation)
        .input('qty', sql.Int, parseInt(objet.quantite))
        .execute("UPDATEOBJECT")
        sql.close();
        return true;
    }catch(error){
        console.log(error)
        return false;
    }
}
// delete message
async function  deleteObject(code_objet){
    try{
         await (sql.connect(config));
        let res =  await new sql.Request()
        .input("code_objet", sql.VarChar, code_objet)
        .output("deleted",sql.Bit)
        .execute("DELETEOBJET")
        sql.close();
        console.log(res.output.deleted)
        return  res.output.deleted ;
    
        
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