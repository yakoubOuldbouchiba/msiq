'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hello = hello;
exports.login = login;
function hello(rep, res) {
    res.send("hello");
}
function login(req, res) {
    var loginData = req.body;
    var dataUser = {};
    console.log(loginData);
    var userID = users.findIndex(function (user) {
        return user.userName == loginData.userName;
    });
    if (userID != '-1' && users[userID].password == loginData.password && users[userID].role == loginData.role) {
        dataUser.token = jwt.sign(userID, '123');
        dataUser.userName = users[userID].userName;
        dataUser.role = users[userID].role;
        dataUser.avatar = users[userID].avatar;
        /*token=jwt.sign(userID,'123');*/
        res.json(dataUser);
    }
};