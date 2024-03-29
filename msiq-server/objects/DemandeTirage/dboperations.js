var config = require('../../config/dbconfig.js');
const sql = require('mssql');

// set new message
async function  setDemandeTirage(Data,io){
    try {
        await sql.connect(config)
        try {
             if (Data.UT == 'Chef departement') {
                await new sql.Request()
                .input('userID', sql.VarChar, Data.userID)    
                .input('FN', sql.VarChar, Data.OriginalFileName)
                .input('NF', sql.Int, Data.NombreFeu)
                .input('NE', sql.Int, Data.NombreCop)
                .input('NTF', sql.Int, Data.NombreTot)
                .input('TF', sql.VarChar, Data.DocTyp)
                .input('A', sql.VarChar, Data.AutreDes)
                .input('SFN', sql.VarChar, Data.StoringName)
                .input('FF', sql.VarChar, Data.TypeOfFile)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .output('FID', sql.Int)
                .output('recevoir_ID', sql.VarChar)
                .input('etat', sql.VarChar, 'Directeur')
                .execute('InsertDemandeTirage').then((res,err) => {
                    if (err) 
                        return 'CNID'
                    let Demand = {
                         demande_ID: res.output.DID,
                         demande_Date: res.output.DDATE,
                         type_demande: 'Demande de tirage',
                         etat: 'Directeur',
                         motif: '',
                         seen: 0,
                     }
                    io.emit(Data.structure+"TD" , Demand )// for notification
                      io.emit("NewNotif"+res.output.recevoir_ID )//notifier le CD.
                     io.emit('NewDemandD'+Data.structure, Demand)
                     io.emit(Data.userID , Demand)
                     
                 });
                console.log('Demande Inserted');
                //sql.close();
                return  'DI' //Demand inserted
             } if (Data.UT == 'Directeur') {
                await new sql.Request()
                .input('userID', sql.VarChar, Data.userID)    
                .input('FN', sql.VarChar, Data.OriginalFileName)
                .input('NF', sql.Int, Data.NombreFeu)
                .input('NE', sql.Int, Data.NombreCop)
                .input('NTF', sql.Int, Data.NombreTot)
                .input('TF', sql.VarChar, Data.DocTyp)
                .input('A', sql.VarChar, Data.AutreDes)
                .input('SFN', sql.VarChar, Data.StoringName)
                .input('FF', sql.VarChar, Data.TypeOfFile)
                .output('DID', sql.Int)
                .output('FID', sql.Int)
                .output('recevoir_ID', sql.VarChar)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar, 'Acceptee')
                .execute('InsertDemandeTirage').then((res,err) => {
                    if (err) 
                        return 'CNID'
                    let Demand = {
                         demande_ID: res.output.DID,
                         demande_Date: res.output.DDATE,
                         type_demande: 'Demande de tirage',
                         etat: 'Acceptee',
                         motif: '',
                         seen: 0,
                     }
                      io.emit(Data.structure+"TD" , Demand )// for notification
                      io.emit("NewNotif"+res.output.recevoir_ID)//notifier le CD.
                     io.emit('NewDemandAT', Demand)
                     io.emit(Data.userID , Demand)
                 });
                console.log('Demande Inserted');
                //sql.close();
                return  'DI' //Demand inserted
             } else {
                await new sql.Request()
                .input('userID', sql.VarChar, Data.userID)    
                .input('FN', sql.VarChar, Data.OriginalFileName)
                .input('NF', sql.Int, Data.NombreFeu)
                .input('NE', sql.Int, Data.NombreCop)
                .input('NTF', sql.Int, Data.NombreTot)
                .input('TF', sql.VarChar, Data.DocTyp)
                .input('A', sql.VarChar, Data.AutreDes)
                .input('SFN', sql.VarChar, Data.StoringName)
                .input('FF', sql.VarChar, Data.TypeOfFile)
                .output('DID', sql.Int)
                .output('FID', sql.Int)
                .output('recevoir_ID', sql.VarChar)
                .output('DDATE', sql.DateTime)
                .input('etat', sql.VarChar, 'Chef Departement')
                .execute('InsertDemandeTirage').then((res,err) => {
                    if (err) 
                        return 'CNID'
                    let Demand = {
                         demande_ID: res.output.DID,
                         demande_Date: res.output.DDATE,
                         type_demande: 'Demande de tirage',
                         etat: 'Chef Departement',
                         motif: '',
                         seen: 0,
                     }
                      io.emit(Data.structure+"TD" , Demand )// for notification
                     io.emit("NewNotif"+res.output.recevoir_ID)//notifier le CD.
                     io.emit('NewDemandCD'+Data.structure+Data.departement, Demand)
                     io.emit(Data.userID , Demand)
                 });
                console.log('Demande Inserted');
                //sql.close();
                return  'DI' //Demand inserted
             }
        } catch (error) {
            console.log('can not instert Demande');
            console.log(error);
            //sql.close();
            return 'CNID'; // can not insert Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// delete message
async function  deleteDemandeTirage(id){
    try{
        await sql.connect(config);
        try{
            let res = await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('DeleteDemandeTirage');
            //sql.close();
            console.log("demande deleted")
            return (
                {
                    result : "DD",
                    typedelete :res.output.typedelete,
                    recevoir_ID :res.output.recevoir_ID// for notif
                }
            )

        }catch(error){
            console.log('can not delete Demande');
            //sql.close();
            return 'CNDD'; // can not delete Demand
        }
    }catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}

// Get a demand
async function  GetDemandeTirage(id){
    try{
        await sql.connect(config);
        try{
            let demande = await new sql.Request()
            .input('id',sql.Int,id)
            .execute('GetDemandeTirage');
            console.log("demande has been loaded")
            return demande.recordset[0]

        }catch(error){
            console.log('can not delete Demande');
            return null; // can not delete Demand
        }
    }catch (error) {
        console.log('connection error');
        return null;  //can not connect to database
    }
}

// Edit a demand
async function  upDemandeTirage(Data , io){
    try {
        await sql.connect(config)
        try {
             await new sql.Request()
            .input('id', sql.Int, Data.demande_T_ID)
            .input('NF', sql.Int, Data.nombre_feuille)
            .input('NE', sql.Int, Data.nombre_exemplaire)
            .input('NTF', sql.Int, Data.nombre_exemplaire*Data.nombre_feuille)
            .input('TF', sql.VarChar, Data.type_document)
            .input('A', sql.VarChar, Data.autre)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .input('NO', sql.Int, Data.numero_ordre)
            .input('DP', sql.Date, Data.date_prestation)
            .input('etat',sql.VarChar, Data.etat)
            .output('describ',sql.VarChar)// for notif
            .output('DDATE', sql.DateTime)
            .execute('UpdatetDemandeTirage')
            .then((res , err)=>{
                if(err)return 'CNUD';
                io.emit("UpdateNotif"+res.output.recevoir_ID)//notifier le CD.
            })
            console.log('Demande Inserted');
            //sql.close();
            return  'DE' //Demand inserted
        } catch (error) {
            console.log('can not Edit Demande');
            console.log(error);
            //sql.close();
            return 'CNED'; // can not insert Demand
        }
    } catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    setDemandeTirage,
    deleteDemandeTirage,
    GetDemandeTirage,
    upDemandeTirage
}