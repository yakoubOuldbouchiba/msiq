require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all users.


function getUsers() {
  return _getUsers.apply(this, arguments);
} // set new user


function _getUsers() {
  _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var pool, users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context.sent;
            _context.next = 6;
            return pool.request().query("SELECT * FROM client");

          case 6:
            users = _context.sent;
            return _context.abrupt("return", users.recordsets);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _getUsers.apply(this, arguments);
}

function setUser() {
  try {
    var pool = sql.connect(config);
  } catch (error) {
    console.log(error);
  }
} // Login user


function Login() {
  try {//let pool =  sql.connect(config);
  } catch (error) {
    console.log(error);
  }
} //edit user


function editUser() {
  try {//let pool =  sql.connect(config);
  } catch (error) {
    console.log(error);
  }
} // delete user


function deleteUser() {
  try {//let pool =  sql.connect(config);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers: getUsers,
  setUser: setUser,
  editUser: editUser,
  deleteUser: deleteUser,
  Login: Login
};