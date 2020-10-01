const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbOperationsClient = require('../../objects/users/dboperations.js');
module.exports=(users)=>{
    //get a list of users
    router.get('/team',(req , res)=>{ 
        dbOperationsClient.getUsers().then(result=>{
            res.send(result[0]);
        }); 
        //res.send(users);
    });
    //add a new user
    router.post('/register' , (req , res)=>{
        //console.log('register');
        let user = (req.body);
        let index = users.push(user);
        let userId = index - 1;
        let token;
        token=jwt.sign(userId,'123');
        res.json(token);
    })
    //login user
    router.post('/login' , (req , res)=>{
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
    //update a user
    router.put('/:id',(req , res)=>{ 
        res.send({title : 'update a user'});
    });
    // delete a user
    router.delete('/:id',(req , res)=>{ 
        res.send({method : 'delete a user'});
    });
    return router;
}
