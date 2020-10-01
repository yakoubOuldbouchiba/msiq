var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all chauffeurs.
async function  getChauffeurs(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new chauffeur
async function  setChauffeur(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
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
async function  deleteChauffeur(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getChauffeurs,
    setChauffeur,
    editChauffeur,
    deleteChauffeur
}