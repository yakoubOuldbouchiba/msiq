require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yacin/Desktop/MyProjects/msiq/node_modules/@babel/runtime/helpers/asyncToGenerator");

var jwt = require('jsonwebtoken');

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all users.


function getUsers() {
  return _getUsers.apply(this, arguments);
} // get a single user.


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

function getUser(_x) {
  return _getUser.apply(this, arguments);
} // set new user


function _getUser() {
  _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userID) {
    var pool, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context2.sent;
            _context2.next = 6;
            return pool.request().input("user_name", sql.VarChar, userID).query("SELECT * FROM client where userName = @user_name");

          case 6:
            user = _context2.sent;
            return _context2.abrupt("return", user.recordsets);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", 0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _getUser.apply(this, arguments);
}

function setUser(_x2) {
  return _setUser.apply(this, arguments);
} // Login user


function _setUser() {
  _setUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
    var pool, insertUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(user);
            _context3.prev = 1;
            _context3.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context3.sent;
            _context3.next = 7;
            return pool.request().input('un', sql.VarChar, user.userName).input('pw', sql.VarChar, user.passWord).input('ln', sql.VarChar, user.lastName).input('fn', sql.VarChar, user.firstName).input('bd', sql.DateTimeOffset, user.ddn).input('tel', sql.VarChar, user.mobile).input('email', sql.VarChar, user.email).input('job', sql.VarChar, user.fonction).input('struc', sql.VarChar, user.structure).input('depart', sql.VarChar, user.departement).query("INSERT INTO client VALUES(" + "@un,@pw,@ln,@fn,@bd,@tel,@email,@job,@struc,@depart);");

          case 7:
            insertUser = _context3.sent;
            return _context3.abrupt("return", insertUser.recordsets);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", 0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));
  return _setUser.apply(this, arguments);
}

function Login(_x3) {
  return _Login.apply(this, arguments);
} //edit user


function _Login() {
  _Login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
    var pool, user_data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context4.sent;
            _context4.next = 6;
            return pool.request().input("user_name", sql.VarChar, user.userName).query("SELECT userPassword , fonction FROM client where userName = @user_name");

          case 6:
            user_data = _context4.sent;

            if (!(user_data.recordset.length == 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", {
              title: 'User not found',
              error: 'User not found'
            });

          case 11:
            if (!(user_data.recordset[0].userPassword == user.password)) {
              _context4.next = 19;
              break;
            }

            if (!(user_data.recordset[0].fonction == user.role)) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", {
              title: 'User in',
              token: jwt.sign(user.userName, 'TMPK3Y')
            });

          case 16:
            return _context4.abrupt("return", {
              title: 'Wrong Function',
              error: 'Wrong Function'
            });

          case 17:
            _context4.next = 20;
            break;

          case 19:
            return _context4.abrupt("return", {
              title: 'Wrong Password',
              error: 'Wrong Password'
            });

          case 20:
            console.log("request done");
            _context4.next = 26;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", {
              title: 'Something went wrong',
              error: 'Something went wrong'
            });

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return _Login.apply(this, arguments);
}

function editUser() {
  return _editUser.apply(this, arguments);
} // delete user


function _editUser() {
  _editUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {//let pool =  sql.connect(config);
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _editUser.apply(this, arguments);
}

function deleteUser(_x4) {
  return _deleteUser.apply(this, arguments);
}

function _deleteUser() {
  _deleteUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userName) {
    var pool;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context6.sent;
            _context6.next = 6;
            return pool.request().input("user_name", sql.VarChar, userName).query("DELETE FROM client where userName = @user_name");

          case 6:
            return _context6.abrupt("return", true);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", false);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return _deleteUser.apply(this, arguments);
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  setUser: setUser,
  editUser: editUser,
  deleteUser: deleteUser,
  Login: Login
};