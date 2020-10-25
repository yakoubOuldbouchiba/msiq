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
async function  setDemandeFourniture(Demande){
    try {
        console.log(Demande)
        await sql.connect(config)
        try {
            let objets = await new sql.Request()
            .input('userID',sql.VarChar,Demande.userID)
            .output('demande_id',sql.Int)
            .output('DDATE',sql.DateTime)
            .execute('InsertDemandeFourniture');
            let demande_id=objets.output.demande_id;//id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                console.log(demande_id);
                await new sql.Request()
                .input('demande_id',sql.Int,demande_id)
                .input('code_objet',sql.VarChar,objet.code_object)
                .input('qty_demande',sql.Int,objet.qty_demande)
                .execute('InserObjetOftDemandeFourniture')
            }
            console.log('Demande Inserted');
            sql.close();
            return  'DI' //Demand inserted
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
//edit demande
async function  editDemandeFourniture(Demande){
    try {
        console.log(Demande)
        await sql.connect(config)
        try {
            let objets = await new sql.Request()
            .input('demande_id',sql.Int , Demande.demande_id)
            .execute('deleteObjetOftDemandeFourniture'); //id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                console.log(objet)
                console.log(Demande.demande_id)
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
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('DeleteDemandeFourniture');
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
module.exports = {
    getDemandeFourniture,
    setDemandeFourniture,
    editDemandeFourniture,
    deleteDemandeFourniture
}