var config = require('../../config/dbconfig.js');
const sql = require('mssql');

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
            .input('description', sql.VarChar, Demande.rb.description)
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

module.exports = {
    setDemandeClient,
}