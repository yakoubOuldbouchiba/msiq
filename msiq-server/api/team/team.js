const express = require("express");
const router = express.Router();

module.exports=(users)=>{
    router.get('/',(req , res)=>{ 
        res.send(users);
    });
    return router;
}