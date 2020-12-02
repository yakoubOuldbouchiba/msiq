var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting all notifications.
async function  getNotifactions(email){
    try{
        await sql.connect(config);
        try{
            let res = await new sql.Request()
            .input('email',sql.VarChar,email)
            .execute('GetNotification');
            sql.close();
            console.log("notifications getted")
            return (
                {
                    result :"NG",
                    notifications : res.recordset
                }
            )
        }catch(error){
            console.log('can not get notifications');
            sql.close();
            return 'CNGN'; // can not get notifications
        }
    }catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// seen notifications
async function  SeeNotifactions(id){
    try{
        await sql.connect(config);
        try{
            await new sql.Request()
            .input('id',sql.Int,id)
            .execute('SeenNotif');
            sql.close();
            return (
                {
                    result :"SN",
                }
            )
        }catch(error){
            console.log('can not seen notification');
            sql.close();
            return 'CNSN'; // can not get notifications
        }
    }catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// unseen notifications
async function  UnSeeNotifactions(email){
    try{
        await sql.connect(config);
        try{
            let res = await new sql.Request()
            .input('email',sql.VarChar,email)
            .execute('UnSeenNotif');
            sql.close();
            return (
                {
                    result :"SN",
                    UnSeenNotif : res.recordset
                }
            )
        }catch(error){
            console.log('can not seen notification');
            sql.close();
            return 'CNSN'; // can not get notifications
        }
    }catch (error) {
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
module.exports = {
    getNotifactions,
    SeeNotifactions,
    UnSeeNotifactions
}