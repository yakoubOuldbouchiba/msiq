var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all demande.
async function  getDemandesRelex(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new demande
async function  setDemandeRelex(Demande){
    try {
        let date_depart = Demande.date_depart+" "+Demande.heure_depart;
        let date_retour = Demande.date_retour+" "+Demande.heure_retour;
        await sql.connect(config)
        console.log(Demande)
        try {
            let objets = await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .input('destination',sql.VarChar,Demande.destination)
            .input('objet_mission',sql.VarChar,Demande.objet_mission)
            .input('date_depart',sql.DateTime,date_depart)
            .input('date_retour',sql.DateTime,date_retour)
            .input('prise_en_charge',sql.Bit,Demande.is_prise_encharge)
            .input('demande_V_ID',sql.Int,Demande.demande_v_id)
            .execute('InsertDemandeRelex')
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
//edit demande
async function  editDemandeRelex(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete demande
async function  deleteDemandeRelex(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getDemandesRelex,
    setDemandeRelex,
    editDemandeRelex,
    deleteDemandeRelex
}