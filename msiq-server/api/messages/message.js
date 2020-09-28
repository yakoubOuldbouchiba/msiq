const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = (messages,users,io)=>{
    router.get('/',(req , res)=>{
        res.send(messages);
    });
    
    router.post('/' , (req , res)=>{
        let msg = {};
        msg=req.body;
        let token = req.header('Authorization')
        let id = jwt.decode(token , '123')
        msg.sender_ID = id;
        msg.userName = users[msg.reciever_ID].userName;
        msg.avatar = users[msg.reciever_ID].avatar;
        messages.push(msg);
        io.emit('message',req.body);
        res.sendStatus(200); 
    })

    return router;
}
