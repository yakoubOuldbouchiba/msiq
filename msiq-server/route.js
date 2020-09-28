const express = require('express')

const login = require('./api/login/login.js');
const register = require('./api/register/register.js');
const team = require('./api/team/team.js');
const message = require('./api/messages/message.js');

var messages =[
    {
        sender_ID:'0' ,
        reciever_ID:'1' ,
        content :'bli blo bli blo bli',
        userName:'Yakoub Ould bouchiba',
        avatar:'/avatar1.jpg'
    }
]
var users =[
    {userName:'Yakoub Ould bouchiba',role:'Chef de parc',avatar:'/avatar1.jpg',password:'11'},
    {userName:'Yacine Lalmi',role:'Directeur',avatar:'/avatar2.jpg',password:'12'},
    {userName:'Riad Bouaicha',role:'Client',avatar:'/avatar3.png',password:'13'},
    {userName:'alex bun',role:'Chef de parc',avatar:'/avatar4.png',password:'14'}
]
const router = express.Router();

module.exports = (io)=>{
    
    io.on('connection', (socket)=>{
        console.log('someone is onligne');
    })
    router.use('/messages',message(messages , users,io));
    router.use('/team',team(users));
    router.use('/register',register(users));
    router.use('/login', login(users));
    return router
}