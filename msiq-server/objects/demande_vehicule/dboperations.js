var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all messages.
async function  getDemandesVehicule(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new message
async function  setDemandeVehicule(Demande){
    try {
        await sql.connect(config)
        try {
            console.log(Demande);
             await new sql.Request()
             .input('userID',sql.VarChar,Demande.UserID)
             .input('lieu',sql.VarChar,Demande.Lieu)
             .input('organisme',sql.VarChar,Demande.Organisme)
             .input('motif_deplacement',sql.VarChar,Demande.motif_deplacement)
             .input('date_depart',sql.Date,Demande.DateSortie)
             .input('heure_depart',sql.VarChar,Demande.HeureSortie)
             .input('lieu_remmassage_d',sql.VarChar,Demande.LieuRemassageSortie)
             .input('date_retour',sql.Date,Demande.DateRetour)
             .input('heure_retour',sql.VarChar,Demande.HeureRetour)
             .input('lieu_remmassage_r',sql.VarChar,Demande.LieuRemassageRetour)
             .input('nature_marchandise',sql.VarChar,Demande.NatureMarchandise)
             .input('transportee',sql.VarChar,Demande.Transportee)
             .input('utilisateur1',sql.VarChar,Demande.utilisateur1)
             .input('utilisateur2',sql.VarChar,Demande.utilisateur2)
             .input('utilisateur3',sql.VarChar,Demande.utilisateur3)
            .execute('InsertDemandeVehicule');
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
//edit message
async function  editDemandeVehicule(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete message
async function  deleteDemandeVehicule(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getDemandesVehicule,
    setDemandeVehicule,
    editDemandeVehicule,
    deleteDemandeVehicule
}