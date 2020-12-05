var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all demande.
async function  getDemandeFourniture(id){
    try{
        let pool = await (sql.connect(config));
        try{
            let demande = await pool.request()
            .input("demande_f_id", sql.Int, id)
            .execute('GetObjetOftDemandeFourniture')
            console.log('Demande getted');
            //sql.close();
            return {
                 result : 'DG' , //Demand inserted
                 demande : demande.recordset
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
// set new demande
async function  setDemandeFourniture(Demande , io){
    try {
        await sql.connect(config)
        try {
        if (Demande.UT == 'Chef departement') {
            let objets = await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .output('demande_id',sql.Int)
            .output('FID', sql.Int)
            .output('recevoir_ID', sql.VarChar)
            .output('DDATE',sql.DateTime)
            .input('etat', sql.VarChar,'Directeur')
            .execute('InsertDemandeFourniture');
            let demande_id=objets.output.demande_id;//id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                
                await new sql.Request()
                .input('demande_id',sql.Int,demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            let Demand = { //  for the WorkFlow
                demande_ID: objets.output.demande_id,
                demande_Date: objets.output.DDATE,
                type_demande: 'Demande fourniture',
                etat: 'Directeur',
                motif: '',
                seen: 0

            }
            io.emit(Demande.struct+"FD" , Demand )//for repporting 
            io.emit("NewNotif"+objets.output.recevoir_ID )//notifier le CD.
            io.emit(Demande.userID , Demand )
            io.emit('NewDemandD'+Demande.structure, Demand )
            console.log('Demande Inserted');
            //sql.close();
            return  'DI' //Demand inserted
        } if (Demande.UT == 'Directeur') {
            let objets = await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .output('demande_id',sql.Int)
            .output('FID', sql.Int)
            .output('recevoir_ID', sql.VarChar)
            .output('DDATE',sql.DateTime)
            .input('etat', sql.VarChar,'DAM')
            .execute('InsertDemandeFourniture');
            let demande_id=objets.output.demande_id;//id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                
                await new sql.Request()
                .input('demande_id',sql.Int,demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            let Demand = { //  for the WorkFlow
                demande_ID: objets.output.demande_id,
                demande_Date: objets.output.DDATE,
                type_demande: 'Demande fourniture',
                etat: 'DAM',
                motif: '',
                seen: 0

            }
            io.emit(Demande.struct+"FD" , Demand )//for repporting 
            io.emit("NewNotif"+objets.output.recevoir_ID )//notifier le CD.
            io.emit(Demande.userID , Demand )
            io.emit('NewDemandRD', Demand )
            console.log('Demande Inserted');
            //sql.close();
            return  'DI' //Demand inserted
        } else {
            
            let objets = await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .output('demande_id',sql.Int)
            .output('FID', sql.Int)
            .output('recevoir_ID', sql.VarChar)
            .output('DDATE',sql.DateTime)
            .input('etat', sql.VarChar,'Chef Departement')
            .execute('InsertDemandeFourniture');
            let demande_id=objets.output.demande_id;//id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                
                await new sql.Request()
                .input('demande_id',sql.Int,demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            let Demand = { //  for the WorkFlow
                demande_ID: objets.output.demande_id,
                demande_Date: objets.output.DDATE,
                type_demande: 'Demande fourniture',
                etat: 'Chef Departement',
                motif: '',
                seen: 0

            }
            
            io.emit(Demande.struct+"FD" , Demand )//for repporting 
            io.emit("NewNotif"+objets.output.recevoir_ID )//notifier le CD.
            io.emit(Demande.userID , Demand )
            io.emit('NewDemandCD'+Demande.structure+Demande.departement, Demand )
            console.log('Demande Inserted');
            //sql.close();
            return  'DI' //Demand inserted
        }

        } catch (error) {
            console.log(error);
            console.log('can not instert Demande');
            //sql.close();
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
            let res = await new sql.Request()
            .input('demande_id',sql.Int ,Demande.demande_id)//notifier le CD.)
            .output('NID',sql.Int)//for notif
            .output('recevoir_ID',sql.VarChar)// for notif
            .input('etat' ,sql.VarChar ,Demande.objetsDemande[0].etat)
            .execute('deleteObjetOftDemandeFourniture'); //id of demande insert it 
            io.emit("UpdateNotif"+res.output.recevoir_ID)//notifier le CD.
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                await new sql.Request()
                .input('demande_id',sql.Int,Demande.demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            console.log('Demande updated');
            //sql.close();
            return  'DU' //Demand updated
        } catch (error) {
            console.log(error)
            console.log('can not update Demande');
            //sql.close();
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
            let res = await new sql.Request()
            .input('id',sql.Int,id)
            .output('typedelete',sql.Bit)
            .output('recevoir_ID',sql.VarChar)//for notif
            .execute('deleteDemandeFourniture');
            //sql.close();
            console.log("demande deleted")
            return ({
                result :"DD" ,
                typedelete : res.output.typedelete,
                recevoir_ID :res.output.recevoir_ID
            })

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
module.exports = {
    getDemandeFourniture,
    setDemandeFourniture,
    editDemandeFourniture,
    deleteDemandeFourniture
}