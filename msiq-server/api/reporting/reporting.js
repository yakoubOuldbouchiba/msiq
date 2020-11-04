const express = require("express");
const router = express.Router();
const dbOperationsDemandes = require('../../objects/reporting/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=()=>{
        // get a total
        router.get('/Total/:struct',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.getTotal(req.params.struct)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        total : result.total
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a total year
        router.get('/TotalYear/:struct',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.getTotalYear(req.params.struct)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        total : result.total
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a total month
        router.get('/TotalMonth/:struct',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.getTotalMonth(req.params.struct)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        total : result.total
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a total day
        router.get('/TotalDay/:struct',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.getTotalDay(req.params.struct)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        total : result.total
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a total by demand
        router.get('/TotalByDemand/:struct/:date',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.getTotalByDemand(req.params.struct , req.params.date)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        total : result.total
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a max user by demand
        router.get('/MaxByUser/:struct/:date/:typeDemand',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.maxUser(req.params.struct , req.params.date , req.params.typeDemand)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        max : result.max
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a max dep by demand
        router.get('/MaxByDep/:struct/:date/:typeDemand',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.maxDep(req.params.struct , req.params.date , req.params.typeDemand)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        max : result.max
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get a avg dep by demand
        router.get('/AvgByDep/:struct/:date/:typeDemand',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.AvgDep(req.params.struct , req.params.date , req.params.typeDemand)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        avg : result.avg
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });
        // get avg user by demand
        router.get('/AvgByUser/:struct/:date/:typeDemand',auth.requireLogin,(req , res)=>{ 
            dbOperationsDemandes.AvgUser(req.params.struct , req.params.date , req.params.typeDemand)
            .then(result => {
                if(result.result ==='TG'){
                    res.status(200).json({
                        title: 'total  counted',
                        avg : result.avg
                    })
                }else if (result ==='CNGT') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNGT'
                    })
                } else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
        });

    return router;
}
