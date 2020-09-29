const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = (messages,users,io)=>{
    //send list messages
    router.get('/messages',(req , res)=>{
        res.send(messages);
    });
    //add new message
    router.post('/messages' , (req , res)=>{
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
    });
    // update a message
    router.put('/message/:id',(req , res)=>{
        res.send({title : 'new a message'})
    })
    // delete a message
    router.delete('message/:id',(req,res)=>{
        res.send({title:'delete a message'})
    })
    return router;
}
