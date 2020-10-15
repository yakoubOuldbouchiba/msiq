
const express = require("express");
const router = express.Router();
const multer = require('multer');
const dbOperationsDemandeTirage = require('../../objects/DemandeTirage/dboperations');

const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
    dest : './FilesTirage/'
});
module.exports=()=>{
   //this part the get the fie 
        router.post('/DemandeTirage', upload.single('FileData'), (req , res)=>{
            jwt.verify((req.headers.authorization || req.headers['Authorization']),'TMPK3Y',
            async (err,decoded) => {
                if (err) {
                    res.status(500).json({
                        title: 'Quelque chose s\'est mal passé dans le serveur',
                        error: 'CNCTDB' 
                    })
                };
                let infoToSend = {
                    userID: decoded.user.email,
                    OriginalFileName: req.file.originalname,
                    StoringName: req.file.filename,
                    TypeOfFile: req.file.mimetype,
                    DocTyp: req.body.DocType.substring(1,req.body.DocType.length-1),
                    AutreDes: req.body.AutreDes.substring(1,req.body.AutreDes.length-1),
                    NombreFeu: req.body.NombreFeuilles.substring(1,req.body.NombreFeuilles.length-1),
                    NombreCop: req.body.NombreCopies.substring(1,req.body.NombreCopies.length-1),
                    NombreTot: req.body.NombreTotal,
                };
                await dbOperationsDemandeTirage.setDemandeTirage(infoToSend)
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
                });
            })
        })
        // delete a demande
        router.delete('/DemandeTirage/:id',(req , res)=>{
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
                        if(result ==='DD'){
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
    return router;
}