var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// set new message
async function  setDemandeTirage(Data){
    try {
        await sql.connect(config)
        try {
             await new sql.Request()
            .input('userID', sql.VarChar, Data.userID)    
            .input('FN', sql.VarChar, Data.OriginalFileName)
            .input('NF', sql.Int, Data.NombreFeu)
            .input('NE', sql.Int, Data.NombreCop)
            .input('NTF', sql.Int, Data.NombreTot)
            .input('TF', sql.VarChar, Data.DocTyp)
            .input('A', sql.VarChar, Data.AutreDes)
            .input('SFN', sql.VarChar, Data.StoringName)
            .input('FF', sql.VarChar, Data.TypeOfFile)
            .execute('InsertDemandeTirage');
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
    setDemandeTirage,
}