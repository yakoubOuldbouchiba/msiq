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
        let date_depart = Demande.DateSortie+" "+Demande.HeureSortie;
        let date_retour = Demande.DateRetour+" "+Demande.HeureRetour;
    
        await sql.connect(config)
        try {
            console.log(date_depart);
            console.log(date_retour);
            let result = await new sql.Request()
             .input('userID',sql.VarChar,Demande.UserID)
             .input('lieu',sql.VarChar,Demande.Lieu)
             .input('organisme',sql.VarChar,Demande.Organisme)
             .input('motif_deplacement',sql.VarChar,Demande.motif_deplacement)
             .input('date_depart',sql.DateTime,date_depart)
             .input('lieu_remmassage_d',sql.VarChar,Demande.LieuRemassageSortie)
             .input('date_retour',sql.DateTime,date_retour)
             .input('lieu_remmassage_r',sql.VarChar,Demande.LieuRemassageRetour)
             .input('nature_marchandise',sql.VarChar,Demande.NatureMarchandise)
             .input('utilisateur1',sql.VarChar,Demande.utilisateur1)
             .input('utilisateur2',sql.VarChar,Demande.utilisateur2)
             .input('utilisateur3',sql.VarChar,Demande.utilisateur3)
             .output('demande_v_id',sql.int)
            .execute('InsertDemandeVehicule');
            console.log('Demande Inserted');
            sql.close();
            return  ({
                result : 'DI',
                demande_v_id : result.output.demande_v_id
            } )//Demand inserted
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
async function  deleteDemandeVehicule(id){
    try{
        await sql.connect(config);
        try{
            console.log(id);
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('DeleteDemandeVehicule');
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
    getDemandesVehicule,
    setDemandeVehicule,
    editDemandeVehicule,
    deleteDemandeVehicule
}