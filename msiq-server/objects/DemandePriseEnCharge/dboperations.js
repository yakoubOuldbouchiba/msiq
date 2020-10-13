var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// set new message
async function  setDemandePriseEnCharge(Data){
    try {
        await sql.connect(config)
        try {
            console.log(Data);
             await new sql.Request()
            .input('userID', sql.VarChar, Data.UserID)    
            .input('Col1_ID', sql.VarChar, typeof Data.Collegues[0] == 'undefined' ? null : Data.Collegues[0])
            .input('Col2_ID', sql.VarChar, typeof Data.Collegues[1] == 'undefined' ? null : Data.Collegues[1])
            .input('Col3_ID', sql.VarChar, typeof Data.Collegues[2] == 'undefined' ? null : Data.Collegues[2])
            .input('Col4_ID', sql.VarChar, typeof Data.Collegues[3] == 'undefined' ? null : Data.Collegues[3])
            .input('Col5_ID', sql.VarChar, typeof Data.Collegues[4] == 'undefined' ? null : Data.Collegues[4])
            .input('Dest', sql.VarChar, Data.Destination)
            .input('Objet', sql.VarChar, Data.Objet)
            .input('SD', sql.DateTimeOffset, Data.StartDate)
            .input('ED', sql.DateTimeOffset, Data.EndDate)
            .input('MDT', sql.VarChar, Data.MoyDeTrans)
            .input('A', sql.VarChar, Data.Aeroport)
            .input('HV', sql.VarChar, Data.HeureDeVol)
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

module.exports = {
    setDemandePriseEnCharge,
}