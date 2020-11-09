var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all demande.
async function  getDemandeFourniture(id){
    try{
        console.log(id);
        let pool = await (sql.connect(config));
        try{
            let demande = await pool.request()
            .input("demande_f_id", sql.Int, id)
            .execute('GetObjetOftDemandeFourniture')
            console.log('Demande getted');
            sql.close();
            console.log(demande.recordset[0])
            return {
                 result : 'DG' , //Demand inserted
                 demande : demande.recordset
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
async function  setDemandeFourniture(Demande , io){
    try {
        
        await sql.connect(config)
        try {
            let objets = await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .output('demande_id',sql.Int)
            .output('FID', sql.Int)
            .output('recevoir_ID', sql.VarChar)
            .output('DDATE',sql.DateTime)
            .input('etat', sql.VarChar,'Chef Departement')
            .execute('InsertDemandeFourniture');
            
            let notification_ID = objets.output.FID;
            let demande_id=objets.output.demande_id;//id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                
                await new sql.Request()
                .input('demande_id',sql.Int,demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            let Notif = {// notification Info 
                userID : Demande.userID,
                notification_ID : notification_ID,
                demande_ID: demande_id,
                seen : 0,
                description_notif : 'est effecuté(e) une nouvelle demande fourniture',
                icon:'edit'
            }
            console.log(Notif)
            //io.emit(Demande.struct+"FD" , Demand )//for repporting 
            io.emit("NewNotif"+objets.output.recevoir_ID , Notif)//notifier le CD.
            console.log('Demande Inserted');
            sql.close();
            return  'DI' //Demand inserted
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
//edit demande
async function  editDemandeFourniture(Demande ,io){
    try {
        await sql.connect(config)
        try {
            console.log(Demande)
            let res = await new sql.Request()
            .input('demande_id',sql.Int ,Demande.demande_id)//notifier le CD.)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .input(etat ,sql.VarChar ,Demande[0].etat)
            .execute('deleteObjetOftDemandeFourniture'); //id of demande insert it 
            let Notif = {// notification Info 
                userID : Demande.uID,
                notification_ID : res.output.NID,
                demande_ID: Demande.demande_id,
                seen : 0,
                description_notif : 'est modifé(e) la demande fourniture numéro '+Demande.demande_id,
                icon:'edit'
            }
            io.emit("UpdateNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                await new sql.Request()
                .input('demande_id',sql.Int,Demande.demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            console.log('Demande updated');
            sql.close();
            return  'DU' //Demand updated
        } catch (error) {
            console.log(error)
            console.log('can not update Demande');
            sql.close();
            return 'CNUD'; // can not update Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// delete demande
async function  deleteDemandeFourniture(id){
    try{
        await sql.connect(config);
        try{
            console.log(id);
            let res = await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('deleteDemandeFourniture');
            sql.close();
            console.log("demande deleted")
            return ({
                result :"DD" ,
                typedelete : res.output.typedelete,
                recevoir_ID :res.output.recevoir_ID
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
    getDemandeFourniture,
    setDemandeFourniture,
    editDemandeFourniture,
    deleteDemandeFourniture
}