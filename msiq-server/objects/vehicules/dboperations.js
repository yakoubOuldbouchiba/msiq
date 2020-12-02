const jwt = require('jsonwebtoken');
var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// getting all vehicules.
async function getVehicules(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().query("GETVEHICULE"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// getting all vehicules.
async function getDispoVehicules(date){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request()
        .input('date_depart',sql.DateTime,date)
        .query("GETDISPOVEHICULE"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// get a single car.
async function getVehicule(matricule){
    try{
        let pool = await (sql.connect(config));
        let user = await pool.request()
        .input("matricule", sql.VarChar, matricule)
        .query("SELECT * FROM vehicule where matricule = @matricule");
        return user.recordsets;
    }catch(error){
        return 0;
    }
}

// set new Vehicule
async function  setVehicule(vehicule){
    try{
        let pool = await sql.connect(config);
         await pool.request()
        .input('matricule', sql.VarChar, vehicule.matricule)
        .input('nom',sql.VarChar, vehicule.nom )
        .input('annee',sql.Int,parseInt(vehicule.annee))
        .input('type_vehicule',sql.VarChar,vehicule.type_vehicule)
        .execute("SETVEHICULE");      
        console.log("we inserted");
         return true;
    }catch(error){ 
        console.log("wrong");
        return false;
    }
}
//edit user
async function  editVehicule(vehicule){
    try{
        let pool = await sql.connect(config);
         await pool.request()
        .input('matricule', sql.VarChar, vehicule.matricule)
        .input('nom',sql.VarChar, vehicule.nom )
        .input('annee',sql.Int,parseInt(vehicule.annee))
        .input('type_vehicule',sql.VarChar,vehicule.type_vehicule)
        .execute("UPDATEVEHICULE");      
        console.log("we inserted");
         return true;
    }catch(error){ 
        console.log("wrong");
        return false;
    }
}
// delete user
async function  deleteVehicule(matricule){
    try{
        let pool = await (sql.connect(config));
        let res = await pool.request()
        .input("matricule", sql.VarChar, matricule)
        .output('deleted',sql.Bit)
        .execute("DELETEVEHICULE");
        //sql.close();
        return res.output.deleted;
    }catch(error){
        return false;
    }
}
module.exports = {
    getVehicules,
    getDispoVehicules,
    getVehicule,
    setVehicule,
    editVehicule,
    deleteVehicule,
}