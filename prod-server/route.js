'use strict';

var express = require('express');

var login = require('./api/login/login.js');
var register = require('./api/register/register.js');
var team = require('./api/team/team.js');
var message = require('./api/messages/message.js');

var messages = [{
    sender_ID: '0',
    reciever_ID: '1',
    content: 'bli blo bli blo bli',
    userName: 'Yakoub Ould bouchiba',
    avatar: '/avatar1.jpg'
}];
var users = [{ userName: 'Yakoub Ould bouchiba', role: 'Chef de parc', avatar: '/avatar1.jpg', password: '11' }, { userName: 'Yacine Lalmi', role: 'Directeur', avatar: '/avatar2.jpg', password: '12' }, { userName: 'Riad Bouaicha', role: 'Client', avatar: '/avatar3.png', password: '13' }, { userName: 'alex bun', role: 'Chef de parc', avatar: '/avatar4.png', password: '14' }, { userName: 'Youpi', role: 'Agent de magasin', avatar: '/avatar4.png', password: '15' }];
var router = express.Router();

module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log('someone is onligne');
    });
    router.use('/messages', message(messages, users, io));
    router.use('/team', team(users));
    router.use('/register', register(users));
    router.use('/login', login(users));
    return router;
};