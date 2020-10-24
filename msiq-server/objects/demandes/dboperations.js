var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all messages.
async function  getDemandes(email){
    try{
        await sql.connect(config);
        try{
            let demandes = await new sql.Request()
            .input('email',sql.VarChar , email)
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

// Getting all Demandes a traiter.
async function  getDemandesATraiter(Params){
    try{
        await sql.connect(config);
        try{
            let demandes = await new sql.Request()
            .input('UserType',sql.VarChar , Params.UserType)
            .input('Depart',sql.VarChar , Params.Depart)
            .execute('getDemandeATraiter')
            console.log(demandes.recordset);
            return  demandes.recordset
        }catch(err){
            console.log('can not get the demandes');
            sql.close();
            return null; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return null;  //can not connect to database
    }
}

// Update demand State.
async function  UpdateDemandState(DemandeID, state, motif){
    try{
        await sql.connect(config);
        try{
            await new sql.Request()
            .input('Demand_ID',sql.VarChar , DemandeID)
            .input('motif', sql.VarChar, motif)
            .input('State',sql.VarChar , state)
            .execute('UpdateDemandState')
            return 'DU'
        }catch(err){
            console.log(err);
            console.log('can not Edit demande');
            sql.close();
            return 'CNED'; // can not Edit Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    getDemandes,
    editDemande,
    deleteDemande,
    getDemandesATraiter,
    UpdateDemandState
}