var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all messages.
async function  getDemandes(){
    try{
        await sql.connect(config);
        try{
            let demandes = await new sql.Request()
            .execute('getDemande')
            return  {
                result : 'DG',
                demandes : demandes.recordset
            } // demande getted 
        }catch(err){
            console.log('can not instert Demande');
            sql.close();
            return 'CNGD'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
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
async function  deleteDemande(id){
    try{
        await sql.connect(config);
        try{
            console.log(id);
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('DeleteDemande');
            sql.close();
            console.log("demande deleted")
            return "DD"

        }catch(error){
            console.log('can not delete Demande');
            sql.close();
            return 'CNDD'; // can not delete Demand
        }
    }catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    getDemandes,
    editDemande,
    deleteDemande
}