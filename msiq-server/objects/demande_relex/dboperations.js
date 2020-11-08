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
// get a demande client 
async function getDemandeRelex(id){
    try{
        let pool = await (sql.connect(config));
        try{
            let demande = await pool.request()
            .input("id", sql.VarChar, id)
            .execute('GetDemandeRelex')
            console.log(demande.recordset[0]);
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
// set new demande
async function  setDemandeRelex(Demande,io){
    try {
        let date_depart = Demande.D.date_depart+" "+Demande.D.heure_depart;
        let date_retour = Demande.D.date_retour+" "+Demande.D.heure_retour;
        await sql.connect(config)
        console.log(Demande.D)
        try {
             if (Demande.UT == 'Chef departement') {
                await new sql.Request()
                .input('userID',sql.VarChar,Demande.D.userID)
                .input('destination',sql.VarChar,Demande.D.destination)
                .input('objet_mission',sql.VarChar,Demande.D.objet_mission)
                .input('date_depart',sql.DateTime,date_depart)
                .input('date_retour',sql.DateTime,date_retour)
                .input('prise_en_charge',sql.Bit,Demande.D.prise_en_charge)
                .input('demande_V_ID',sql.Int,Demande.D.demande_V_ID)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .output('FID', sql.Int)//For notif
                .output('recevoir_ID', sql.VarChar)//For notif
                .input('etat', sql.VarChar, 'Directeur')
                .execute('InsertDemandeRelex').then((res,err) => {
                    if (err) 
                        return 'CNID'
                    let Demand = {
                         demande_ID: res.output.DID,
                         demande_Date: res.output.DDATE,
                         type_demande: 'Demande relex',
                         etat: 'Directeur',
                         motif: '',
                         seen: 0,
                     }
                    // i need check from to
                    let Notif = {// notification Info 
                      userID : Demande.userID,
                      notification_ID : res.output.FID,
                      demande_ID: res.output.DID,
                      seen : 0,
                      description_notif : 'est effecuté(e) une nouvelle demande activité relex',
                      icon:'hotel'
                    }
                 io.emit(Demande.struct+"RD" , Demand )//for repporting 
                 io.emit("NewNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
                     io.emit('NewDemandD'+Demande.D.structure, Demand )
                     io.emit(Demande.D.userID , Demand )
                 });
                console.log('Demande Inserted');
                sql.close();
                return 'DI' //Demand inserted
             } if (Demande.UT == 'Directeur') {
                await new sql.Request()
                .input('userID',sql.VarChar,Demande.D.userID)
                .input('destination',sql.VarChar,Demande.D.destination)
                .input('objet_mission',sql.VarChar,Demande.D.objet_mission)
                .input('date_depart',sql.DateTime,date_depart)
                .input('date_retour',sql.DateTime,date_retour)
                .input('prise_en_charge',sql.Bit,Demande.D.prise_en_charge)
                .input('demande_V_ID',sql.Int,Demande.D.demande_V_ID)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar, 'Acceptee')
                .execute('InsertDemandeRelex').then((res,err) => {
                    if (err) 
                        return 'CNID'
                    let Demand = {
                         demande_ID: res.output.DID,
                         demande_Date: res.output.DDATE,
                         type_demande: 'Demande relex',
                         etat: 'Acceptee',
                         motif: '',
                         seen: 0,
                     }
                     io.emit('NewDemandRR', Demand )
                     io.emit(Demande.D.userID , Demand )
                 });
                console.log('Demande Inserted');
                sql.close();
                return 'DI' //Demand inserted
             } else {
                await new sql.Request()
                .input('userID',sql.VarChar,Demande.D.userID)
                .input('destination',sql.VarChar,Demande.D.destination)
                .input('objet_mission',sql.VarChar,Demande.D.objet_mission)
                .input('date_depart',sql.DateTime,date_depart)
                .input('date_retour',sql.DateTime,date_retour)
                .input('prise_en_charge',sql.Bit,Demande.D.prise_en_charge)
                .input('demande_V_ID',sql.Int,Demande.D.demande_V_ID)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar, 'Chef Departement')
                .execute('InsertDemandeRelex').then((res,err) => {
                    if (err) 
                        return 'CNID'
                    let Demand = {
                         demande_ID: res.output.DID,
                         demande_Date: res.output.DDATE,
                         type_demande: 'Demande relex',
                         etat: 'Chef Departement',
                         motif: '',
                         seen: 0,
                     }
                     io.emit('NewDemandCD'+Demande.D.structure+Demande.D.departement, Demand )
                     io.emit(Demande.D.userID , Demand )
                 });
                console.log('Demande Inserted');
                sql.close();
                return 'DI' //Demand inserted
             }
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
// edit new demande
async function  editDemandeRelex(Demande ,io){
    try {
        let date_depart = Demande.date_depart+" "+Demande.heure_depart;
        let date_retour = Demande.date_retour+" "+Demande.heure_retour;
        await sql.connect(config)
        console.log(Demande)
        try {
            await new sql.Request()
            .input('destination',sql.VarChar,Demande.destination)
            .input('objet_mission',sql.VarChar,Demande.objet_mission)
            .input('date_depart',sql.DateTime,date_depart)
            .input('date_retour',sql.DateTime,date_retour)
            .input('prise_en_charge',sql.Bit,Demande.prise_en_charge)
            .input('demande_R_ID',sql.Int,Demande.demande_R_ID)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .execute('UpdateDemandeRelex')
            .then((res , err)=>{
                if(err)return 'CNUD';
                let Notif = {// notification Info 
                    userID : Demande.uID,
                    notification_ID : res.output.NID,
                    demande_ID: Demande.demande_R_ID,
                    seen : 0,
                    description_notif : 'est modifé(e) la demande activité relex numéro '+Demande.demande_R_ID,
                    icon:'hotel'
                }
                io.emit("UpdateNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
            })
            console.log('Demande updated');
            sql.close();
            return 'DU' //Demand inserted
        } catch (error) {
            console.log('can not update Demande');
            sql.close();
            return 'CNUD'; // can not insert Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// delete demande
async function  deleteDemandeRelex(id){
    try{
        await sql.connect(config);
        try{
             console.log(id);
             let res =await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('DeleteDemandeRelex');
            sql.close();
            console.log(res)
            console.log("demande deleted")
            return ({
                result :"DD" ,
                typedelete : res.output.typedelete,
                recevoir_ID :res.output.recevoir_ID// for notif
            }) 

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
    getDemandesRelex,
    getDemandeRelex,
    setDemandeRelex,
    editDemandeRelex,
    deleteDemandeRelex
}