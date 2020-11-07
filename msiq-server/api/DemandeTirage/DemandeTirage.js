
const express = require("express");
const router = express.Router();
const multer = require('multer');
const dbOperationsDemandeTirage = require('../../objects/DemandeTirage/dboperations');

const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null, './FilesTirage/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().split(':').join('_') +file.originalname)
    }
})

const upload = multer({storage: storage});
module.exports=(io)=>{
   //this part the get the fie 
    router.post('/DemandeTirage', upload.single('FileData'), (req , res)=>{
            console.log(req.file);
           let infoToSend = {
                userID: req.body.UserID,
                OriginalFileName: req.file.originalname,
                StoringName: req.file.filename,
                TypeOfFile: req.file.mimetype,
                DocTyp: req.body.DocType,
                AutreDes: req.body.AutreDes,
                NombreFeu: req.body.NombreFeuilles.substring(1,req.body.NombreFeuilles.length-1),
                NombreCop: req.body.NombreCopies.substring(1,req.body.NombreCopies.length-1),
                NombreTot: req.body.NombreTot,
                UT: req.body.UT,
                departement:req.body.departement,
                structure: req.body.structure,
            };
            console.log(infoToSend);
            dbOperationsDemandeTirage.setDemandeTirage(infoToSend,io)
            .then(result => {
                if(result ==='DI'){
                    res.status(200).json({
                        title: 'Voter demande de tirage a été envoyée'
                    })
                }
                else if (result ==='CNID') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNID'
                    })
                } 
                else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
    })
    // delete a demande
    router.delete('/DemandeTirage/:id/:struct',(req , res)=>{
            jwt.verify((req.headers.authorization || req.headers['Authorization']),'TMPK3Y',
            async (err,decoded) => {
                if (err) {
                    res.status(500).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                };
                dbOperationsDemandeTirage.deleteDemandeTirage(req.params.id)
                    .then(result => {
                        if(result.result ==='DD'){
                            if(result.typedelete){
                                io.emit(req.params.struct+"DTD")
                            }
                            res.status(200).json({
                                title: 'Votre demande tirage a été supprimée'
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
    })
    
    //Get a demand
    router.get('/DemandeTirage/:id',(req , res)=>{
        dbOperationsDemandeTirage.GetDemandeTirage(req.params.id)
        .then(result => {
            if(!!result){
                res.status(200).json({
                    title: 'Votre demande tirage a été chargée',
                    demande: result
                })
            } else {
                res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB' 
                })
            }
        })
    });
     
    //update demand
    
    router.post('/UpdateDemandeTirage', async (req , res)=>{
        await dbOperationsDemandeTirage.upDemandeTirage(req.body)
            .then(result => {
                if(result ==='DE'){
                    res.status(200).json({
                        title: 'Voter demande de tirage a été modifier'
                    })
                }
                else if (result ==='CNED') {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                        error: 'CNED'
                    })
                } 
                else {
                    res.status(401).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                }
            })
    });
    
    router.get('/DownloadFile', async (req , res)=>{
        //console.log(req);
    })
    return router;
}