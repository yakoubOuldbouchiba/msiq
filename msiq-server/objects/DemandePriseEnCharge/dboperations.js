var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// set new message
async function  setDemandePriseEnCharge(Data){
    try {
        await sql.connect(config)
        try {
             await new sql.Request()
            .input('userID', sql.VarChar, Data.UserID)    
            .input('Col1_ID', sql.VarChar, typeof Data.Collegues[0] == 'undefined' ? null : Data.Collegues[0])
            .input('Col2_ID', sql.VarChar, typeof Data.Collegues[1] == 'undefined' ? null : Data.Collegues[1])
            .input('Col3_ID', sql.VarChar, typeof Data.Collegues[2] == 'undefined' ? null : Data.Collegues[2])
            .input('Col4_ID', sql.VarChar, typeof Data.Collegues[3] == 'undefined' ? null : Data.Collegues[3])
            .input('Col5_ID', sql.VarChar, typeof Data.Collegues[4] == 'undefined' ? null : Data.Collegues[4])
            .input('Dest', sql.VarChar, Data.destination)
            .input('Objet', sql.VarChar, Data.objet_mission)
            .input('SD', sql.DateTimeOffset, Data.startDate)
            .input('ED', sql.DateTimeOffset, Data.EndDate)
            .input('MDT', sql.VarChar, Data.moyen_transport)
            .input('A', sql.VarChar, Data.aeroport)
            .input('HV', sql.VarChar, Data.heureDeVol)
            .execute('InsertDemandePriseEnCharge');
            console.log('Demande Inserted');
            sql.close();
            return  'DI' //Demand inserted
        } catch (error) {
            console.log('can not instert Demande');
            console.log(error);
            sql.close();
            return 'CNID'; // can not insert Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// delete message
async function  deleteDemandePriseEnCharge(id){
    try{
        await sql.connect(config);
        try{
            console.log(id);
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('DeleteDemandePEC');
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

//Get Demand
async function  GetDemandePriseEnCharge(id){
    try{
        await sql.connect(config);
        try{
            let Demande = await new sql.Request()
            .input('id',sql.Int,id)
            .execute('GetDemandePEC');
            console.log('Your demande has been loaded');
            console.log( Demande.recordset[0]);
            return Demande.recordset[0]
        }catch(error){
            return  null; // can not delete Demand
        }
    }catch (error) {
        return null;  //can not connect to database
    }         
}

//Get Demand
async function  UpdateDemandePriseEnCharge(Data){
    try{
        await sql.connect(config);
        try{
            await new sql.Request()
            .input('id', sql.VarChar, Data.demande_P_ID)    
            .input('Col1_ID', sql.VarChar, typeof Data.Collegues[0] == 'undefined' ? null : Data.Collegues[0])
            .input('Col2_ID', sql.VarChar, typeof Data.Collegues[1] == 'undefined' ? null : Data.Collegues[1])
            .input('Col3_ID', sql.VarChar, typeof Data.Collegues[2] == 'undefined' ? null : Data.Collegues[2])
            .input('Col4_ID', sql.VarChar, typeof Data.Collegues[3] == 'undefined' ? null : Data.Collegues[3])
            .input('Col5_ID', sql.VarChar, typeof Data.Collegues[4] == 'undefined' ? null : Data.Collegues[4])
            .input('Dest', sql.VarChar, Data.destination)
            .input('Objet', sql.VarChar, Data.objet_mission)
            .input('SD', sql.DateTimeOffset, Data.startDate)
            .input('ED', sql.DateTimeOffset, Data.EndDate)
            .input('MDT', sql.VarChar, Data.moyen_transport)
            .input('A', sql.VarChar, Data.aeroport)
            .input('HV', sql.VarChar, Data.heureDeVol)
            .execute('UpdateDemandePEC');
            console.log('Demande Edited');
            return 'DE'
        }catch(error){
            console.log('Can not edite demande');
            console.log(error);
            return  'CNED'; // can not delete Demand
        }
    }catch (error) {
        console.log('Can not connect');
        return 'CNCTDB';  //can not connect to database
    }         
}

module.exports = {
    setDemandePriseEnCharge,
    deleteDemandePriseEnCharge,
    GetDemandePriseEnCharge,
    UpdateDemandePriseEnCharge
}