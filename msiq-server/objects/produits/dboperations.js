var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all produits.
async function  getProduits(){
    try{
        let pool = await (sql.connect(config));
        let users = await (pool.request().query("SELECT * FROM produit"));
        return users.recordsets;
    }catch(error){
        console.log(error);
    }
}
// set new Produit
async function  setProduit(produit){
    try{
        console.log(produit);
        let pool = await (sql.connect(config));
        await pool.request()
        .input('cp', sql.VarChar, produit.code_produit)
        .input('desig', sql.VarChar, produit.designation)
        .input('qty', sql.VarChar, parseInt(produit.quantite))
        .query("INSERT INTO produit VALUES("+
                    "@cp,@desig,@qty);");
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
        .query("DELETE FROM produit where code_produit = @code_produit");
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