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
            console.log('Demande has been loaded');
            //sql.close();
            return {
                 result : 'DG' , //Demand inserted
                 demande : demande.recordset[0]
            }  
        }catch(error){
            console.log('can not Get Demande');
            //sql.close();
            return 'CNGD'; // can not get Demand
        }
    }catch(err){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}

// set new Demande Client
async function  setDemandeClient(O,io){
    try {
        await sql.connect(config)
        try {
            if (O.UT == 'Chef departement') {
                await new sql.Request()
                .input('userID', sql.VarChar, O.D.UserID)    
                .input('nature', sql.VarChar, O.D.nature)
                .input('objet', sql.VarChar, O.D.objet)
                .input('etat', sql.VarChar, 'Directeur')
                .input('description', sql.VarChar, O.D.demande_C_description)
                .input('destination', sql.VarChar, O.D.struct_id)
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
                        etat: 'Directeur',
                        motif: '',
                        seen: 0
                    }
                    io.emit(O.D.structure+"CD", Demand )//for reporting
                    io.emit("NewNotif"+res.output.recevoir_ID)//notifier le CD.
                    io.emit('NewDemandD'+O.D.structure, Demand )
                    io.emit(O.D.UserID , Demand )
                })
            }else if(O.UT == 'Directeur') {
                let tmpState=null
                if(O.D.destination_id==2){
                    tmpState='Directeur DAM';
                }else {
                    tmpState='Directeur Destination'
                }
                await new sql.Request()
                .input('userID', sql.VarChar, O.D.UserID)    
                .input('nature', sql.VarChar, O.D.nature)
                .input('objet', sql.VarChar, O.D.objet)
                .input('etat', sql.VarChar, tmpState)
                .input('description', sql.VarChar, O.D.demande_C_description)
                .input('destination', sql.VarChar, O.D.struct_id)
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
                        etat: tmpState,
                        motif: '',
                        seen: 0
                    }
                    io.emit(O.D.structure+"CD", Demand )//for reporting
                    io.emit("NewNotif"+res.output.recevoir_ID)//notifier le CD.
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
                .input('destination', sql.VarChar, O.D.struct_id)
                .output('DID', sql.Int)
                .output('DDATE', sql.DateTime)
                .output('FID', sql.Int)
                .output('recevoir_ID', sql.VarChar)
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
                    io.emit(O.D.structure+"CD", Demand )//for reporting
                    io.emit("NewNotif"+res.output.recevoir_ID )//notifier le CD.
                    io.emit('NewDemandCD'+O.D.structure+O.D.departement, Demand )
                    io.emit(O.D.UserID , Demand )
                })
            }
            console.log('Demande Inserted');
            //sql.close();
            return  'DI' //Demand inserted
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
async function  deleteDemandeClient(id){
    try{
        await sql.connect(config);
        try{
            let res = await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('DeleteDemandeClient');
            //sql.close();
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
            //sql.close();
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
            .input('destination_id', sql.VarChar, Demande.destination_id)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .output('DDATE', sql.DateTime)
            .execute('updateDemandeClient').then((res , err)=>{
                if(err)return 'CNUD';
                io.emit("UpdateNotif"+res.output.recevoir_ID)//notifier le CD.
            });

            console.log('Demande Updated');
            //sql.close();
            return  'DU' //Demand updated
        } catch (error) {
            console.log(error);
            console.log('can not update Demande');
            //sql.close();
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