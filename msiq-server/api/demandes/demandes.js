const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/demandes/dboperations');
const jwt = require('jsonwebtoken');
import * as auth from '../../services/auth-service.js'
module.exports=(io)=>{
    //get a list of demandes
    router.get('/demandes/:email',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.getDemandes(req.params.email)
        .then(result => {
            if(result.result ==='DG'){
                res.status(200).json({
                    demandes : result.demandes,
                    title: 'Voter demande client a été envoyée'
                })
            }else if (result ==='CNGD') {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                    error: 'CNIU'
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
    //update a demande
    router.put('/demande/:id',auth.requireLogin,(req , res)=>{ 
        res.send({method : 'update a demande'});
    });

    // delete a demande
    router.delete('/demande/:id',auth.requireLogin,(req , res)=>{ 
        dbOperationsDemandes.deleteDemande(req.params.id)
        .then(result => {
            if(result ==='DD'){
                res.status(200).json({
                    title: 'Votre demande a été supprimée',
                    
                })
            }else if (result ==='CNDD') {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                    error: 'CNIU'
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
    
    // Liste des demandes à traiter 
    router.get('/demandesATraiter/:UserType/:Depart/:Struct',auth.requireLogin,(req , res)=>{
        console.log(req.params);
        dbOperationsDemandes.getDemandesATraiter(req.params)
        .then(result => {
            if(!!result){
                res.status(200).json({
                    demandes : result,
                    title: 'Votre demandes ont chargée'
                })
            }else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
    
    //Update Demand state
    router.put('/UpdateDemandState/:id',auth.requireLogin,(req , res)=>{ 
        let DID = null
        if (req.body.typeD == 'Demande client') 
            DID = req.body.Demande.demande_C_ID
        else if (req.body.typeD == 'Demande véhicule') 
            DID = req.body.Demande.demande_V_ID
        else if (req.body.typeD == 'Demande fourniture') 
            DID = req.body.Demande.demande_F_ID
        else if (req.body.typeD == 'Demande de prise en charge') 
            DID = req.body.Demande.demande_P_ID
        else if (req.body.typeD == 'Demande de tirage') 
            DID = req.body.Demande.demande_T_ID
        else 
            DID = req.body.Demande.demande_R_ID
        
        let Demand = {
            demande_ID: DID,
            demande_Date: req.body.Demande.demande_Date,
            type_demande: req.body.typeD,
            etat: req.body.State,
            motif: req.body.Demande.motif,
            seen: 0,
        }
        dbOperationsDemandes.UpdateDemandState(req.params.id,req.body.State,req.body.Demande.motif)
        .then(result => {
            if(result==='DU'){
                res.status(200).json({
                    demandes : result.demandes,
                    title: 'L\'etat de la demande a été modifier'
                })
            }else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
        io.emit(req.body.Demande.email+'E', Demand )
        if (req.body.State == 'Directeur'){ 
            io.emit('NewDemandD', Demand )
            io.emit('RemoveDemandCD', Demand)
        }else if (req.body.State == 'DAM'){
            io.emit('NewDemandRD', Demand )  
            io.emit('RemoveDemandD', Demand )       
        }else if (req.body.State == 'Chef de parc') {
            io.emit('NewDemandCP', Demand )  
            io.emit('RemoveDemandD', Demand ) 
        }else if (req.body.State == 'Agent de Tirage'){
            io.emit('NewDemandAT', Demand )  
            io.emit('RemoveDemandD', Demand )       
        }else if (req.body.State == 'Agent de magasin') {
            io.emit('NewDemandAM', Demand )  
            io.emit('RemoveDemandRD', Demand ) 
        }else if (req.body.State == 'Acceptee') {
            if (req.body.typeD == 'Demande client'){
                io.emit('NewDemandAM', Demand )
                io.emit('RemoveDemandRD', Demand ) 
            }              
            else if (req.body.typeD == 'Demande véhicule') 
                io.emit('RemoveDemandCP', Demand ) 
            else if (req.body.typeD == 'Demande fourniture'){
                io.emit('NewDemandAM', Demand )
                io.emit('RemoveDemandRD', Demand ) 
            }  
            else if (req.body.typeD == 'Demande de prise en charge') 
                io.emit('RemoveDemandD', Demand ) 
            else if (req.body.typeD == 'Demande de tirage') 
                io.emit('RemoveDemandAT', Demand ) 
            else 
                io.emit('RemoveDemandD', Demand ) 
        }else{
            if (req.body.UT == 'Chef departement')
                io.emit('RemoveDemandCD', Demand)
            else if (req.body.UT == 'Directeur')
                io.emit('RemoveDemandD', Demand)
            else if (req.body.UT == 'Responsable DAM')
                io.emit('RemoveDemandRD', Demand)
            else if (req.body.UT == 'Agent de Tirage')
                io.emit('RemoveDemandAT', Demand)
            else if (req.body.UT == 'Agent de magasin')
                io.emit('RemoveDemandAM', Demand)
            else if (req.body.UT == 'Chef de parc')
                io.emit('RemoveDemandCP', Demand)
        }   
    });
    return router;
}
