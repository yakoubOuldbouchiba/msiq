const express = require("express");
const router = express.Router();
const dbOperationsNotifications= require('../../objects/notifications/dboperations.js');
import * as auth from '../../services/auth-service.js'
module.exports=(io)=>{
        // get all notification
        router.get('/Notification/:email',auth.requireLogin,(req , res)=>{ 
            dbOperationsNotifications.getNotifactions(req.params.email)
            .then(result => {
                if(result.result ==='NG'){
                    res.status(200).json({
                        title: 'notifications get',
                        notifications : result.notifications
                    })
                }else if (result ==='CNGN') {
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
        // get unseen notification
        router.get('/UnSeenNotification/:email',auth.requireLogin,(req , res)=>{ 
            dbOperationsNotifications.UnSeeNotifactions(req.params.email)
            .then(result => {
                if(result.result ==='SN'){
                    res.status(200).json({
                        title: 'un seen notifications get',
                        UnSeenNotif : result.UnSeenNotif[0].unseen
                    })
                }else if (result ==='CNSN') {
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
        // seen notification
        router.put('/Notification/:id/:email',auth.requireLogin,(req , res)=>{ 
            dbOperationsNotifications.SeeNotifactions(req.params.id)
            .then(result => {
                if(result.result ==='SN'){
                    io.emit('seen'+req.params.email , req.params.id )
                    res.status(200).json({
                        title: 'notification seen'
                    })
                }else if (result ==='CNSN') {
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
    return router;
}
