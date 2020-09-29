const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports=(users)=>{
    //get a list of vehicules
    router.get('/team',(req , res)=>{ 
        res.send({title : 'List of vehicules'});
    });
    //add a new vehicule
    router.post('/vehicule' , (req , res)=>{
        res.send({title:'add a vehicule'});
    })
    //update a vehicule
    router.put('/vehicule/:id',(req , res)=>{ 
        res.send({method : 'update a vehicule'});
    });
    // delete a vehicule
    router.delete('/vehicule/:id',(req , res)=>{ 
        res.send({method : 'delete a vehicule'});
    });
    return router;
}
