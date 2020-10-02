const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbOperationsVehicule = require ('../../objects/vehicules/dboperations')
module.exports=(users)=>{
    //get a list of vehicules
    router.get('/vehicules',(req , res)=>{ 
        dbOperationsVehicule.getVehicules().then(result=>{
            res.json(result[0]);
        })
    });
    //get a specific  vehicule
    router.get('/vehicule/:id',(req , res)=>{ 
        dbOperationsVehicule.getVehicule(req.params.id).then(result=>{
            res.send(result[0]);
        }); 
    });
    //add a new vehicule
    router.post('/vehicule' , (req , res)=>{
        dbOperationsVehicule.setVehicule(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a vehicule
    router.put('/vehicule/:id',(req , res)=>{ 
        
    });
    // delete a vehicule
    router.delete('/vehicule/:id',(req , res)=>{ 
        dbOperationsVehicule.deleteVehicule(req.params.id).then(result=>{
            res.json(result);
        })
    });
    return router;
}
