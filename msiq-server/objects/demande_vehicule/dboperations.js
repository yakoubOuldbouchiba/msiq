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
//getting a single demande
async function getDemandeVehicule(id){
    try{
        let pool = await (sql.connect(config));
        try{
            let demande = await pool.request()
            .input("id", sql.VarChar, id)
            .execute('GetDemandeVehicule')
            console.log('Demande getted');
            sql.close();
            console.log(demande.recordset[0])
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
async function  setDemandeVehicule(Demande,io){
    try {
        let date_depart = Demande.D.date_depart+" "+Demande.D.heure_depart;
        let date_retour = Demande.D.date_retour+" "+Demande.D.heure_retour;
        console.log(Demande);
        await sql.connect(config)
        try {
            if (Demande.UT == 'Chef departement'){
                let result = await new sql.Request()
                .input('userID',sql.VarChar,Demande.D.UserID)
                .input('lieu',sql.VarChar,Demande.D.lieu)
                .input('organisme',sql.VarChar,Demande.D.organisme)
                .input('motif_deplacement',sql.VarChar,Demande.D.motif_deplacement)
                .input('date_depart',sql.DateTime,date_depart)
                .input('lieu_remmassage_d',sql.VarChar,Demande.D.lieu_ramassage_d)
                .input('date_retour',sql.DateTime,date_retour)
                .input('lieu_remmassage_r',sql.VarChar,Demande.D.lieu_ramassage_r)
                .input('nature_marchandise',sql.VarChar,Demande.D.nature_marchandise)
                .input('utilisateur1',sql.VarChar,Demande.D.utilisateur1_ID)
                .input('utilisateur2',sql.VarChar,Demande.D.utilisateur2_ID)
                .input('utilisateur3',sql.VarChar,Demande.D.utilisateur3_ID)
                .output('demande_v_id',sql.Int)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar, 'Directeur')
                .execute('InsertDemandeVehicule')
                let Demand = {
                        demande_ID: result.output.demande_v_id,
                        demande_Date: result.output.DDATE,
                        type_demande: 'Demande véhicule',
                        etat: 'Directeur',
                        motif: '',
                        seen: 0,
                    }
                io.emit('NewDemandD'+Demande.D.structure, Demand )
                io.emit(Demande.D.UserID , Demand )
                console.log('Demande Inserted');
                sql.close();
                return  ({
                    result : 'DI',
                    demande_v_id : result.output.demande_v_id
                })//Demand inserted
            }
            if (Demande.UT == 'Directeur') {
                let result = await new sql.Request()
                .input('userID',sql.VarChar,Demande.D.UserID)
                .input('lieu',sql.VarChar,Demande.D.lieu)
                .input('organisme',sql.VarChar,Demande.D.organisme)
                .input('motif_deplacement',sql.VarChar,Demande.D.motif_deplacement)
                .input('date_depart',sql.DateTime,date_depart)
                .input('lieu_remmassage_d',sql.VarChar,Demande.D.lieu_ramassage_d)
                .input('date_retour',sql.DateTime,date_retour)
                .input('lieu_remmassage_r',sql.VarChar,Demande.D.lieu_ramassage_r)
                .input('nature_marchandise',sql.VarChar,Demande.D.nature_marchandise)
                .input('utilisateur1',sql.VarChar,Demande.D.utilisateur1_ID)
                .input('utilisateur2',sql.VarChar,Demande.D.utilisateur2_ID)
                .input('utilisateur3',sql.VarChar,Demande.D.utilisateur3_ID)
                .output('demande_v_id',sql.Int)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar,'Chef de parc')
                .execute('InsertDemandeVehicule')
                let Demand = {
                        demande_ID: result.output.demande_v_id,
                        demande_Date: result.output.DDATE,
                        type_demande: 'Demande véhicule',
                        etat: 'Chef de parc',
                        motif: '',
                        seen: 0,
                    }
                io.emit('NewDemandCP', Demand )
                io.emit(Demande.D.UserID , Demand )
                console.log('Demande Inserted');
                sql.close();
                return  ({
                    result : 'DI',
                    demande_v_id : result.output.demande_v_id
                })//Demand inserted
            }else {
                let result = await new sql.Request()
                .input('userID',sql.VarChar,Demande.D.UserID)
                .input('lieu',sql.VarChar,Demande.D.lieu)
                .input('organisme',sql.VarChar,Demande.D.organisme)
                .input('motif_deplacement',sql.VarChar,Demande.D.motif_deplacement)
                .input('date_depart',sql.DateTime,date_depart)
                .input('lieu_remmassage_d',sql.VarChar,Demande.D.lieu_ramassage_d)
                .input('date_retour',sql.DateTime,date_retour)
                .input('lieu_remmassage_r',sql.VarChar,Demande.D.lieu_ramassage_r)
                .input('nature_marchandise',sql.VarChar,Demande.D.nature_marchandise)
                .input('utilisateur1',sql.VarChar,Demande.D.utilisateur1_ID)
                .input('utilisateur2',sql.VarChar,Demande.D.utilisateur2_ID)
                .input('utilisateur3',sql.VarChar,Demande.D.utilisateur3_ID)
                .output('demande_v_id',sql.Int)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar, 'Chef Departement')
                .execute('InsertDemandeVehicule')
                let Demand = {
                        demande_ID: result.output.demande_v_id,
                        demande_Date: result.output.DDATE,
                        type_demande: 'Demande véhicule',
                        etat: 'Chef Departement',
                        motif: '',
                        seen: 0,
                    }
                io.emit('NewDemandCD'+Demande.D.structure+Demande.D.departement, Demand )
                io.emit(Demande.D.UserID , Demand )
                console.log('Demande Inserted');
                sql.close();
                return  ({
                    result : 'DI',
                    demande_v_id : result.output.demande_v_id
                })//Demand inserted
                
            }
            
        } catch (error) {
            console.log(error);
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
// edit demande
async function  editDemandeVehicule(Demande){
    try {
        let date_depart = Demande.date_depart+" "+Demande.heure_depart;
        let date_retour = Demande.date_retour+" "+Demande.heure_retour;
    
        await sql.connect(config)
        try {
            console.log(Demande);
            console.log(date_depart);
            console.log(date_retour);
            let result = await new sql.Request()
             .input('demande_v_id',sql.Int , Demande.demande_V_ID)
             .input('lieu',sql.VarChar,Demande.lieu)
             .input('organisme',sql.VarChar,Demande.organisme)
             .input('motif_deplacement',sql.VarChar,Demande.motif_deplacement)
             .input('date_depart',sql.DateTime,date_depart)
             .input('lieu_remmassage_d',sql.VarChar,Demande.lieu_ramassage_d)
             .input('date_retour',sql.DateTime,date_retour)
             .input('lieu_remmassage_r',sql.VarChar,Demande.lieu_ramassage_r)
             .input('nature_marchandise',sql.VarChar,Demande.nature_marchandise)
             .input('utilisateur1',sql.VarChar,Demande.utilisateur1_ID)
             .input('utilisateur2',sql.VarChar,Demande.utilisateur2_ID)
             .input('utilisateur3',sql.VarChar,Demande.utilisateur3_ID)
             .input('matricule', sql.VarChar, Demande.matricule)
             .input('CID', sql.Int, Demande.chauffeur_ID)
             .input('Observ', sql.VarChar, Demande.observation)
            .execute('UpdateDemandeVehicule');
            console.log('Demande Inserted');
            sql.close();
            return  'DU' //Demand inserted
        } catch (error) {
            console.log(error);
            console.log('can not instert Demande');
            sql.close();
            return 'CNUD'; // can not insert Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    getDemandesVehicule,
    getDemandeVehicule,
    setDemandeVehicule,
    editDemandeVehicule,
    deleteDemandeVehicule
}