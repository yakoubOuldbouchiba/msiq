var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all messages.
async function  getDemandes(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new message
async function  setDemande(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
//edit message
async function  editDemande(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete message
async function  deleteDemande(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getDemandes,
    setDemande,
    editDemande,
    deleteDemande
}