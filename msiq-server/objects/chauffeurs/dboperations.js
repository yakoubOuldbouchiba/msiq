var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all chauffeurs.
async function  getChauffeurs(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().query("SELECT * FROM chauffeur"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// set new chauffeur
async function  setChauffeur(chauffeur){
    console.log(chauffeur);
    try{
        let pool = await sql.connect(config);
         let nouveau_chauffeur = await pool.request()
        .input('nom',sql.VarChar,chauffeur.nom)
        .input('prenom',sql.VarChar,chauffeur.prenom)
        .input('type_permis',sql.VarChar,chauffeur.type_permis)
        .input('telephone',sql.VarChar,chauffeur.telephone)
        .input('email',sql.VarChar,chauffeur.email)
        .query("INSERT  INTO chauffeur VALUES("+
            "@nom,@prenom,@type_permis,@telephone,@email);");      
         return true;
    }catch(error){ 
        console.log("wrong");
        return false;
    }
}
//edit chauffeur
async function  editChauffeur(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete chauffeur
async function  deleteChauffeur(chauffeur_id){
    try{
        console.log("chauffeur id : "+chauffeur_id);
        let pool = await (sql.connect(config));
         await pool.request()
        .input("chauffeur_id", sql.VarChar,chauffeur_id)
        .query("DELETE FROM chauffeur where chauffeur_id = @chauffeur_id");
        return true;
    }catch(error){
        return false;
    }
}
module.exports = {
    getChauffeurs,
    setChauffeur,
    editChauffeur,
    deleteChauffeur
}