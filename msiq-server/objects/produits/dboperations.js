var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all produits.
async function  getProduits(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// set new Produit
async function  setProduit(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
//edit Produit
async function  editProduit(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
// delete Produit
async function  deleteProduit(){
    try{
        let pool = await sql.connect(config);
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getProduits,
    setProduit,
    editProduit,
    deleteProduit
}