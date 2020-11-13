var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all chauffeurs.
async function  getChauffeurs(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().execute("GETCHAUFFEURS"));
        sql.close();
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
         await pool.request()
        .input('nom',sql.VarChar,chauffeur.nom)
        .input('prenom',sql.VarChar,chauffeur.prenom)
        .input('type_permis',sql.VarChar,chauffeur.type_permis)
        .input('telephone',sql.VarChar,chauffeur.telephone)
        .input('email',sql.VarChar,chauffeur.email)
        .execute("SETCHAUFFEUR")  
        sql.close();   
         return true;
    }catch(error){ 
        console.log("wrong");
        return false;
    }
}
//edit chauffeur
async function  editChauffeur(id , chauffeur){
    try{
        console.log(id)
        let pool = await sql.connect(config);
        await pool.request()
        .input('chauffeur_id',sql.Int , chauffeur.chauffeur_id)
       .input('nom',sql.VarChar,chauffeur.nom)
       .input('prenom',sql.VarChar,chauffeur.prenom)
       .input('type_permis',sql.VarChar,chauffeur.type_permis)
       .input('telephone',sql.VarChar,chauffeur.telephone)
       .input('email',sql.VarChar,chauffeur.email)
       .execute("UPDATECHAUFFEUR")  
       sql.close();   
        return true;
    }catch(error){
        console.log(error);
    }
}
// delete chauffeur
async function  deleteChauffeur(chauffeur_id){
    try{
        let pool = await (sql.connect(config));
        let res = await pool.request()
        .input("chauffeur_id", sql.VarChar,chauffeur_id)
        .output('deleted',sql.Bit)
        .execute("DELETECHAUFFEUR");
        sql.close();
        return res.output.deleted;
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