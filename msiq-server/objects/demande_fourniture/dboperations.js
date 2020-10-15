var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all demande.
async function  getDemandesFourniture(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
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
            .execute('InsertDemandeFourniture');
            let demande_id=objets.output.demande_id;//id of demande insert it 
            for(let i = 0 ; i <Demande.objetsDemande.length ; i++){
                let objet = Demande.objetsDemande[i]
                await new sql.Request()
                .input('demande_id',sql.Int,demande_id)
                .input('code_objet',sql.Int,objet.code_objet)
                .input('qty_demande',sql.Int,objet.qty)
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
async function  editDemandeFourniture(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
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
    getDemandesFourniture,
    setDemandeFourniture,
    editDemandeFourniture,
    deleteDemandeFourniture
}