var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// get a Demande client 
async function getDemandeClient(id){
    try{
        let pool = await (sql.connect(config));
        try{
            let demande = await pool.request()
            .input("id", sql.VarChar, id)
            .execute('GetDemandeClient')
            console.log(demande.recordset[0]);
            console.log('Demande has been loaded');
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
async function  setDemandeClient(O,io){
    try {
        console.log(O);
        await sql.connect(config)
        try {
            console.log(O.D);
            if (O.UT == 'Chef departement') {
                await new sql.Request()
                .input('userID', sql.VarChar, O.D.UserID)    
                .input('nature', sql.VarChar, O.D.nature)
                .input('objet', sql.VarChar, O.D.objet)
                .input('etat', sql.VarChar, 'Directeur')
                .input('description', sql.VarChar, O.D.demande_C_description)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .execute('InsertDemandeClient').then((res,err) => {
                if (err) 
                    return 'CNID'
                    let Demand = {
                        demande_ID: res.output.DID,
                        demande_Date: res.output.DDATE,
                        type_demande: 'Demande client',
                        etat: 'Directeur',
                        motif: '',
                        seen: 0
                    }
                    io.emit('NewDemandD'+O.D.structure, Demand )
                    io.emit(O.D.UserID , Demand )
                })
            }else if(O.UT == 'Directeur') {
                await new sql.Request()
                .input('userID', sql.VarChar, O.D.UserID)    
                .input('nature', sql.VarChar, O.D.nature)
                .input('objet', sql.VarChar, O.D.objet)
                .input('etat', sql.VarChar, 'DAM')
                .input('description', sql.VarChar, O.D.demande_C_description)
                .output('DID', sql.Int)
                .output('FID', sql.Int)
                .output('recevoir_ID', sql.VarChar)
                .output('DDATE', sql.DateTime)
                .execute('InsertDemandeClient').then((res,err) => {
                if (err) 
                    return 'CNID'
                    let Demand = {
                        demande_ID: res.output.DID,
                        demande_Date: res.output.DDATE,
                        type_demande: 'Demande client',
                        etat: 'DAM',
                        motif: '',
                        seen: 0
                    }
                    io.emit('NewDemandRD', Demand )
                    io.emit(O.D.UserID , Demand )
                })
            }else{
                await new sql.Request()
                .input('userID', sql.VarChar, O.D.UserID)    
                .input('nature', sql.VarChar, O.D.nature)
                .input('objet', sql.VarChar, O.D.objet)
                .input('etat', sql.VarChar, 'Chef Departement')
                .input('description', sql.VarChar, O.D.demande_C_description)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .execute('InsertDemandeClient').then((res,err) => {
                if (err) 
                    return 'CNID'
                    let Demand = {
                        demande_ID: res.output.DID,
                        demande_Date: res.output.DDATE,
                        type_demande: 'Demande client',
                        etat: 'Chef Departement',
                        motif: '',
                        seen: 0
                    }
                    io.emit('NewDemandCD'+O.D.structure+O.D.departement, Demand )
                    io.emit(O.D.UserID , Demand )
                })
            }
          //check from to 
           let Notif = {// notification Info 
                    userID : Demande.uID,
                    notification_ID : res.output.FID,
                    demande_ID: res.output.DID,
                    seen : 0,
                    description_notif : 'est effecuté(e) une nouvelle demande client',
                    icon:'devices'
           }
           io.emit(Demande.struct+"CD", Demand )//for reporting
           io.emit("NewNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
            console.log('Demande Inserted');
            sql.close();
            return  'DI' //Demand inserted
        } catch (error) {
            console.log('can not instert Demande');
            console.log(error);
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
            let res = await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('DeleteDemandeClient');
            sql.close();
            console.log(res);
            console.log("demande deleted");
            return (
                {
                    result :"DD",
                    typedelete : res.output.typedelete,
                    recevoir_ID :res.output.recevoir_ID
                }
            )

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
async function  updateDemandeClient(Demande , io){
    try {
        await sql.connect(config)
        try {
            console.log(Demande);
             await new sql.Request()
            .input('demande_C_ID', sql.Int, Demande.demande_C_ID)    
            .input('nature', sql.VarChar, Demande.nature)
            .input('objet', sql.VarChar, Demande.objet)
            .input('des', sql.VarChar, Demande.demande_C_description)
            .input('MED', sql.Bit, Demande.mise_disposition)
            .input('DMED', sql.Date, Demande.date_mise_dispostion)
            .input('achat', sql.Bit, Demande.achat)
            .input('nAchat', sql.Int, Demande.nAchat)
            .input('Dachat', sql.Date, Demande.date_achat)
            .input('oAchat', sql.VarChar, Demande.oAchats)
            .input('etat', sql.VarChar,Demande.etat)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .execute('updateDemandeClient').then((res , err)=>{
                if(err)return 'CNUD';
                let Notif = {// notification Info 
                    userID : Demande.uID,
                    notification_ID : res.output.NID,
                    demande_ID: Demande.demande_C_ID,
                    seen : 0,
                    description_notif : 'est modifé(e) la demande client numéro '+Demande.demande_C_ID,
                    icon:'devices'
                }
                io.emit("UpdateNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
            });
>
            console.log('Demande Updated');
            sql.close();
            return  'DU' //Demand updated
        } catch (error) {
            console.log(error);
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