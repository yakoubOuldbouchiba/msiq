var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// get a demande client 
async function getDemandeClient(id){
    try{
        let pool = await (sql.connect(config));
        try{
            let demande = await pool.request()
            .input("id", sql.VarChar, id)
            .execute('GetDemandeClient')
            console.log('Demande getted');
            sql.close();
            return {
                 result : 'DG' , //Demand inserted
                 demande : demande.recordset[0]
            }  
        }catch(error){
            console.log('can not Get Demande');
            sql.close();
            return 'CNGD'; // can not get Demand
        }
    }catch(err){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}

// set new message
async function  setDemandeClient(Demande){
    try {
        await sql.connect(config)
        try {
            console.log(Demande);
             await new sql.Request()
            .input('userID', sql.VarChar, Demande.uID)    
            .input('nature', sql.VarChar, Demande.rb.nature)
            .input('objet', sql.VarChar, Demande.rb.objet)
            .input('description', sql.VarChar, Demande.rb.demande_C_description)
            .execute('InsertDemandeClient');
            console.log('Demande Inserted');
            sql.close();
            return  'DI' //Demand inserted
        } catch (error) {
            console.log('can not instert Demande');
            sql.close();
            return 'CNID'; // can not insert Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// delete message
async function  deleteDemandeClient(id){
    try{
        await sql.connect(config);
        try{
            console.log(id);
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('DeleteDemandeClient');
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
// set new message
async function  updateDemandeClient(Demande){
    try {
        await sql.connect(config)
        try {
            console.log(Demande);
             await new sql.Request()
            .input('demande_C_ID', sql.Int, Demande.demande_C_ID)    
            .input('nature', sql.VarChar, Demande.nature)
            .input('objet', sql.VarChar, Demande.objet)
            .input('description', sql.VarChar, Demande.demande_C_description)
            .execute('updateDemandeClient');
            console.log('Demande Updated');
            sql.close();
            return  'DU' //Demand updated
        } catch (error) {
            console.log('can not update Demande');
            sql.close();
            return 'CNUD'; // can not update Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    setDemandeClient,
    deleteDemandeClient,
    getDemandeClient,
    updateDemandeClient
}