const express = require("express");
const router = express.Router();
const dbOperationsVehicule = require ('../../objects/vehicules/dboperations')
import * as auth from '../../services/auth-service.js'
module.exports=(users)=>{
    //get a list of vehicules
    router.get('/vehicules',auth.requireLogin,(req , res)=>{ 
        dbOperationsVehicule.getVehicules().then(result=>{
            res.json(result[0]);
        })
    });
    //get a specific  vehicule
    router.get('/vehicule/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsVehicule.getVehicule(req.params.id).then(result=>{
            res.send(result[0]);
        }); 
    });
    //add a new vehicule
    router.post('/vehicule',auth.requireLogin , (req , res)=>{
        dbOperationsVehicule.setVehicule(req.body).then(result=>{
            res.json(result);
        })
    })
    //update a vehicule
    router.put('/vehicule/:id',auth.requireLogin,(req , res)=>{ 
        
    });
    // delete a vehicule
    router.delete('/vehicule/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsVehicule.deleteVehicule(req.params.id).then(result=>{
            res.json(result);
        })
    });
    return router;
}
