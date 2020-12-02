var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all produits.
async function  getProduits(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().query("GETPRODUITS"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// set new Produit
async function  setProduit(produit){
    try{
        let pool = await (sql.connect(config));
        await pool.request()
        .input('cp', sql.VarChar, produit.code_produit)
        .input('desig', sql.VarChar, produit.designation)
        .input('qty', sql.Int, parseInt(produit.quantite))
        .execute("SETPRODUIT");
        return true;
    }catch(error){ 
        return false;
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
async function  deleteProduit(code_objet){
    try{
        let pool = await (sql.connect(config));
         await pool.request()
        .input("code_produit", sql.VarChar, code_objet)
        .execute("DELETEPRODUIT");
        return true;
    }catch(error){
        return false;
    }
}
module.exports = {
    getProduits,
    setProduit,
    editProduit,
    deleteProduit
}