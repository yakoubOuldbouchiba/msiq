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
// maxDep 
async function  maxDep (struct , peroid , typeDemand){
    try{
        await sql.connect(config);
        try{
            let max = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .input("typeDemand", sql.VarChar, typeDemand)
            .input("peroidVarchar", sql.VarChar, peroid)
            .execute('MaxDemandByDep')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 max : max.recordset
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
// maxUser
async function  maxUser(struct ,peroid , typeDemand){
    try{
        await sql.connect(config);
        try{
            let max = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .input("typeDemand", sql.VarChar, typeDemand)
            .input("peroidVarchar", sql.VarChar, peroid)
            .execute('MaxDemandByUser')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 max : max.recordset
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
// AvgDep  
async function  AvgDep (struct ,peroid , typeDemand){
    try{
        await sql.connect(config);
        try{
            let avg = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .input("typeDemand", sql.VarChar, typeDemand)
            .input("peroidVarchar", sql.VarChar, peroid)
            .execute('AvgDemandByDep')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 avg : avg.recordset
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
// AvgUser 
async function  AvgUser (struct ,peroid , typeDemand){
    try{
        await sql.connect(config);
        try{
            let avg = await new sql.Request()
            .input("struct", sql.VarChar, struct)
            .input("typeDemand", sql.VarChar, typeDemand)
            .input("peroidVarchar", sql.VarChar, peroid)
            .execute('AvgDemandByUser')
            sql.close();
            return {
                 result : 'TG' , //total getted
                 avg : avg.recordset
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
    getTotalByDemand,
    maxUser,
    maxDep,
    AvgDep,
    AvgUser
}