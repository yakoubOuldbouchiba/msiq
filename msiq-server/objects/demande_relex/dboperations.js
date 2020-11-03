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
        let date_depart = Demande.date_depart+" "+Demande.heure_depart;
        let date_retour = Demande.date_retour+" "+Demande.heure_retour;
        await sql.connect(config)
        console.log(Demande)
        try {
             await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .input('destination',sql.VarChar,Demande.destination)
            .input('objet_mission',sql.VarChar,Demande.objet_mission)
            .input('date_depart',sql.DateTime,date_depart)
            .input('date_retour',sql.DateTime,date_retour)
            .input('prise_en_charge',sql.Bit,Demande.prise_en_charge)
            .input('demande_V_ID',sql.Int,Demande.demande_V_ID)
            .output('DID', sql.Int)
            .output('DDATE', sql.DateTime)
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
                 io.emit('NewDemandCD', Demand )
                 io.emit(Demande.userID , Demand )
                 io.emit(Demande.struct+"RD" , Demand )
             });
            console.log('Demande Inserted');
            sql.close();
            return 'DI' //Demand inserted
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
async function  editDemandeRelex(Demande){
    try {
        let date_depart = Demande.date_depart+" "+Demande.heure_depart;
        let date_retour = Demande.date_retour+" "+Demande.heure_retour;
        await sql.connect(config)
        console.log(Demande)
        try {
            let objets = await new sql.Request()
            .input('destination',sql.VarChar,Demande.destination)
            .input('objet_mission',sql.VarChar,Demande.objet_mission)
            .input('date_depart',sql.DateTime,date_depart)
            .input('date_retour',sql.DateTime,date_retour)
            .input('prise_en_charge',sql.Bit,Demande.prise_en_charge)
            .input('demande_R_ID',sql.Int,Demande.demande_R_ID)
            .execute('UpdateDemandeRelex')
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
            let res = console.log(id);
            await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .execute('DeleteDemandeRelex');
            sql.close();
            console.log("demande deleted")
            return ({
                result :"DD" ,
                typedelete : res.output.typedelete
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