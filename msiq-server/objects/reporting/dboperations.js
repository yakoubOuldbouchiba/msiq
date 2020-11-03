var config = require('../../config/dbconfig.js');
const sql = require('mssql');
// getting total 
async function  getTotal(struct){
    try{
        await sql.connect(config);
        try{
            let total = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .execute('Total')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 total : total.recordset
            }  
        }catch(error){
            console.log(error)
            console.log('can not get total');
            sql.close();
            return 'CNGT'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// getting total year
async function  getTotalYear(struct){
    try{
        await sql.connect(config);
        try{
            let totalYear = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .execute('TotalYear')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 total : totalYear.recordset
            }  
        }catch(error){
            console.log('can not get total');
            sql.close();
            return 'CNGT'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// getting total month
async function  getTotalMonth(struct){
    try{
        await sql.connect(config);
        try{
            let totalMonth = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .execute('TotalMonth')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 total : totalMonth.recordset
            }  
        }catch(error){
            console.log('can not get total');
            sql.close();
            return 'CNGT'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// getting total day 
async function  getTotalDay(struct){
    try{
        await sql.connect(config);
        try{
            let totalDay = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .execute('TotalDay')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 total : totalDay.recordset
            }  
        }catch(error){
            console.log('can not get total');
            sql.close();
            return 'CNGT'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}
// getting total By Demand 
async function  getTotalByDemand(struct , date){
    console.log(struct + " "+date);
    try{
        await sql.connect(config);
        try{
            let total = null;
            if(date == 'total'){
                 total = await new sql.Request()
                .input("struct", sql.VarChar, struct)
                .execute('TotalByDemand')
            }else if(date == 'year'){
                 total = await new sql.Request()
                .input("struct", sql.VarChar, struct)
                .execute('TotalByDemandInYear')
            }else if (date == 'month'){
                 total = await new sql.Request()
                .input("struct", sql.VarChar, struct)
                .execute('TotalByDemandInMonth')
            }else if(date == 'day'){
                total = await new sql.Request()
                .input("struct", sql.VarChar, struct)
                .execute('TotalByDemandInDay')
            }
            console.log(total.recordset);
            console.log('Total getted');
            sql.close();
            return {
                 result : 'TG' , //total getted
                 total : total.recordset
            }  
        }catch(error){
            console.log('can not get total');
            sql.close();
            return 'CNGT'; // can not get Demand
        }
    }catch(error){
        console.log('connection error');
        return 'CNCTDB';  //can not connect to database
    }
}

module.exports = {
    getTotal,
    getTotalYear,
    getTotalMonth,
    getTotalDay,
    getTotalByDemand
}