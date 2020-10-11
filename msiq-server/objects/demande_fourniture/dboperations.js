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
            console.log(date_depart);
            console.log(date_retour);
             await new sql.Request()
            .execute('InsertDemandeFourniture');
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
async function  deleteDemandeFourniture(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getDemandesFourniture,
    setDemandeFourniture,
    editDemandeFourniture,
    deleteDemandeFourniture
}