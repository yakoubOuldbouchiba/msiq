var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// set new message
async function  setDemandePriseEnCharge(Data,io){
    try {
        await sql.connect(config)
        try {
             await new sql.Request()
            .input('userID', sql.VarChar, Data.UserID)    
            .input('Col1_ID', sql.VarChar, typeof Data.Collegues[0] == 'undefined' ? null : Data.Collegues[0])
            .input('Col2_ID', sql.VarChar, typeof Data.Collegues[1] == 'undefined' ? null : Data.Collegues[1])
            .input('Col3_ID', sql.VarChar, typeof Data.Collegues[2] == 'undefined' ? null : Data.Collegues[2])
            .input('Col4_ID', sql.VarChar, typeof Data.Collegues[3] == 'undefined' ? null : Data.Collegues[3])
            .input('Col5_ID', sql.VarChar, typeof Data.Collegues[4] == 'undefined' ? null : Data.Collegues[4])
            .input('Dest', sql.VarChar, Data.Destination)
            .input('Objet', sql.VarChar, Data.Objet)
            .input('SD', sql.DateTimeOffset, Data.StartDate)
            .input('ED', sql.DateTimeOffset, Data.EndDate)
            .input('MDT', sql.VarChar, Data.MoyDeTrans)
            .input('A', sql.VarChar, Data.Aeroport)
            .input('HV', sql.VarChar, Data.HeureDeVol)
            .output('DID', sql.Int)
            .output('FID', sql.Int)//For notif
            .output('recevoir_ID', sql.VarChar)//For notif
            .output('DDATE', sql.DateTime)
            .execute('InsertDemandePriseEnCharge').then((res,err) => {
                if (err) 
                    return 'CNID'
                let Demand = {
                     demande_ID: res.output.DID,
                     demande_Date: res.output.DDATE,
                     type_demande: 'Demande de prise en charge',
                     etat: 'Chef Departement',
                     motif: '',
                     seen: 0,
                 }
                 let Notif = {// notification Info 
                    userID : Data.UserID,
                    notification_ID : res.output.FID,
                    demande_ID: res.output.DID,
                    seen : 0,
                    description_notif : 'est effecuté(e) une nouvelle demande activité relex',
                    icon:'hotel'
                }
                 io.emit('NewDemandCD', Demand )
                 io.emit(Data.UserID , Demand )
                 io.emit(Data.struct+"PD" , Demand )//for reporting 
                 io.emit("NewNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
             });
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
async function  deleteDemandePriseEnCharge(id){
    try{
        await sql.connect(config);
        try{
            console.log(id);
           let res = await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('DeleteDemandePEC');
            sql.close();
            console.log("demande deleted")
            return ({
                result : "DD",
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

//Get Demand
async function  GetDemandePriseEnCharge(id){
    try{
        await sql.connect(config);
        try{
            let Demande = await new sql.Request()
            .input('id',sql.Int,id)
            .execute('GetDemandePEC');
            console.log('Your demande has been loaded');
            console.log( Demande.recordset[0]);
            return Demande.recordset[0]
        }catch(error){
            return  null; // can not delete Demand
        }
    }catch (error) {
        return null;  //can not connect to database
    }         
}

//Get Demand
async function  UpdateDemandePriseEnCharge(Data , io){
    try{
        await sql.connect(config);
        try{
            await new sql.Request()
            .input('id', sql.VarChar, Data.demande_P_ID)    
            .input('Col1_ID', sql.VarChar, typeof Data.Collegues[0] == 'undefined' ? null : Data.Collegues[0])
            .input('Col2_ID', sql.VarChar, typeof Data.Collegues[1] == 'undefined' ? null : Data.Collegues[1])
            .input('Col3_ID', sql.VarChar, typeof Data.Collegues[2] == 'undefined' ? null : Data.Collegues[2])
            .input('Col4_ID', sql.VarChar, typeof Data.Collegues[3] == 'undefined' ? null : Data.Collegues[3])
            .input('Col5_ID', sql.VarChar, typeof Data.Collegues[4] == 'undefined' ? null : Data.Collegues[4])
            .input('Dest', sql.VarChar, Data.destination)
            .input('Objet', sql.VarChar, Data.objet_mission)
            .input('SD', sql.DateTimeOffset, Data.startDate)
            .input('ED', sql.DateTimeOffset, Data.EndDate)
            .input('MDT', sql.VarChar, Data.moyen_transport)
            .input('A', sql.VarChar, Data.aeroport)
            .input('HV', sql.VarChar, Data.heureDeVol)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .execute('UpdateDemandePEC').then((res , err)=>{
                if(err)return 'CNUD';
                let Notif = {// notification Info 
                    userID : Data.uID,
                    notification_ID : res.output.NID,
                    demande_ID: Data.demande_P_ID,
                    seen : 0,
                    description_notif : 'est modifé(e) la demande de prise en charge numéro ' +Data.demande_P_ID,
                    icon:'flight'
                }
                io.emit("UpdateNotif"+res.output.recevoir_ID , Notif)//notifier le CD.
            });
            console.log('Demande Edited');
            return 'DE'
        }catch(error){
            console.log('Can not edite demande');
            console.log(error);
            return  'CNED'; // can not delete Demand
        }
    }catch (error) {
        console.log('Can not connect');
        return 'CNCTDB';  //can not connect to database
    }         
}

module.exports = {
    setDemandePriseEnCharge,
    deleteDemandePriseEnCharge,
    GetDemandePriseEnCharge,
    UpdateDemandePriseEnCharge
}