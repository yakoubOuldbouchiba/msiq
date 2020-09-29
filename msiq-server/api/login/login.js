const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (users)=>{
    router.get('/',(req,res)=>{
        res.send("hello");
    })
    router.post('/' , (req , res)=>{
        let loginData = (req.body);
        let dataUser = {}
        console.log(loginData);
        let userID = users.findIndex(user => user.userName ==loginData.userName);
        if(userID !='-1'&&users[userID].password==loginData.password && users[userID].role ==loginData.role ){
            dataUser.token = (jwt.sign(userID,'123'));
            dataUser.userName = users[userID].userName;
            dataUser.role = users[userID].role;
            dataUser.avatar = users[userID].avatar;
            res.json(dataUser);
        }
    })
    return router
}