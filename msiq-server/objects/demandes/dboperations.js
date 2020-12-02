var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all messages.
async function  getDemandes(email){
    try{
        await sql.connect(config);
        try{
            let demandes = await new sql.Request()
            .input('email',sql.VarChar , email)
            .execute('getDemandes')
            console.log(demandes.recordset);
            return  {
                result : 'DG',
                demandes : demandes.recordset
            } // demande getted 
        }catch(err){
            console.log('can not get Demandes dashboard');
            console.log(err);
            sql.close();
            return 'CNGD'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}

//edit message
async function  editDemande(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// get Demand
async function  getDemande(id){
    try{
        await sql.connect(config);
        try{
            let res = await new sql.Request()
            .input('id',sql.Int,id)
            .execute('GetDemande');
            sql.close();
            console.log("demand get it")
            return(
                {
                    result :"DG",
                    demande : res.recordset[0] 
                }
            ) 
            

        }catch(error){
            console.log('can not get Demande');
            sql.close();
            return 'CNGD'; // can not delete Demand
        }
    }catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// delete demande
async function  deleteDemande(id){
    try{
        await sql.connect(config);
        try{
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('DeleteDemande');
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

// Getting all Demandes a traiter.
async function  getDemandesATraiter(Params){
    try{
        await sql.connect(config);
        try{
            let demandes = await new sql.Request()
            .input('UserType',sql.VarChar , Params.UserType)
            .input('Depart',sql.VarChar , Params.Depart)
            .input('Struct', sql.VarChar, Params.Struct)
            .execute('getDemandeATraiter')
            return  demandes.recordsets
        }catch(err){
            console.log(err);
            console.log('can not get the demandes');
            sql.close();
            return null; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return null;  //can not connect to database
    }
}

// Update demand State.
async function  UpdateDemandState(DemandeID, state, motif , valider , typeD , UT , io){
    try{
        await sql.connect(config);
        try{
            await new sql.Request()
            .input('Demand_ID',sql.VarChar , DemandeID)
            .input('motif', sql.VarChar, motif)
            .input('State',sql.VarChar , state)
            .output('userID',sql.VarChar)// for notif
            .output('NID', sql.Int) // for notif
            .output('desc',sql.VarChar) //for notif
            .output('desc_C',sql.VarChar) //for notif
            .output('userID_C',sql.VarChar)// for notif
            .input('DT',sql.VarChar , typeD)
            .input('UT',sql.VarChar , UT)
            .output('DDATE',sql.DateTime)
            .execute('UpdateDemandState').then((res , err)=>{
                if(err) console.log(err)
                let Notif = {// notification Info 
                    userID : res.output.userID,
                    notification_ID : res.output.NID,
                    demande_ID: DemandeID,
                    seen : 0,
                    description_notif : res.output.desc,
                    date_notification : res.output.DDATE
                
                }
                let Notif2 = {// notification Info 
                    userID : res.output.userID_C,
                    notification_ID : res.output.NID,
                    demande_ID: DemandeID,
                    seen : 0,
                    description_notif : res.output.desc_C,
                    date_notification : res.output.DDATE
                
                }
                if (typeD == 'Demande client'){
                    Notif.icon = 'devices'
                    Notif2.icon = 'devices'
                }              
                else if (typeD == 'Demande véhicule'){
                    Notif.icon = 'commute'
                    Notif2.icon = 'commute' 
                } 
                else if (typeD == 'Demande fourniture'){
                    Notif.icon = 'edit' 
                    Notif2.icon = 'edit' 
                }  
                else if (typeD == 'Demande de prise en charge') {
                    Notif.icon = 'flight'
                    Notif2.icon = 'flight'
                }
                else if (typeD == 'Demande de tirage') {
                    Notif.icon = 'print'
                    Notif2.icon = 'print'}
                else {
                    Notif.icon = 'hotel'
                    Notif2.icon = 'hotel'
                } 
                io.emit("addNotif"+res.output.userID_C , Notif2)//notifier le C.       
                io.emit("addNotif"+res.output.userID , Notif)//notifier le C.
                io.emit("DeleteNofit"+valider , DemandeID)//notifier le valideur.
            })
            return 'DU'
           
            
        }catch(err){
            console.log(err);
            console.log('can not Edit demande');
            sql.close();
            return 'CNED'; // can not Edit Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    getDemandes,
    getDemande,
    editDemande,
    deleteDemande,
    getDemandesATraiter,
    UpdateDemandState
}