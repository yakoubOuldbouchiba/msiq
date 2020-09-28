const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (users)=>{
    router.post('/' , (req , res)=>{
        let user = (req.body);
        let index = users.push(user);
        let userId = index - 1;
        let token;
        token=jwt.sign(userId,'123');
        res.json(token);
    })
    return router;
}