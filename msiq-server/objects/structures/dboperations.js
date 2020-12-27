var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all structures.
async function  getStructures(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().execute("GETSTRUCTURE"));
        //sql.close();
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// getting all destinations.
async function  getDestinations(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().execute("GETDESTINATION"));
        //sql.close();
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getDestinations,
    getStructures
}