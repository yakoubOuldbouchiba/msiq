require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var BCRYPT = require('bcrypt');

var saltRounds = 10;

var jwt = require('jsonwebtoken');

var config = require('../../config/dbconfig.js');

var sql = require('mssql');

var _require = require('../../services/auth-service.js'),
    generateJWT = _require.generateJWT; // getting all users.


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
            return pool.request().execute("GetUsers");

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
  _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
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
            return pool.request().input("email", sql.VarChar, email).execute("GetUser");

          case 6:
            user = _context2.sent;
            return _context2.abrupt("return", user.recordset[0]);

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
    var PW;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return sql.connect(config);

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return BCRYPT.hash(user.passWord, saltRounds);

          case 6:
            PW = _context3.sent;
            _context3.next = 9;
            return new sql.Request().input('pw', sql.NVarChar, PW).input('ln', sql.VarChar, user.nomUtilisateur).input('fn', sql.VarChar, user.prenomUtilisateur).input('bd', sql.DateTimeOffset, user.ddn).input('tu', sql.VarChar, user.typeUtilisateur).input('tel', sql.VarChar, user.mobile).input('email', sql.VarChar, user.email).input('job', sql.VarChar, user.fonction).input('struc', sql.VarChar, user.structure).input('pt', sql.VarChar, user.posteTelephonique).input('depart', sql.VarChar, user.departement).execute('setAccountDemand');

          case 9:
            console.log('User Inserted');
            sql.close();
            return _context3.abrupt("return", 'UI');

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            console.log('can not instert user');
            sql.close();
            return _context3.abrupt("return", 'CNIU');

          case 19:
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21], [3, 14]]);
  }));
  return _setUser.apply(this, arguments);
}

function Login(_x3) {
  return _Login.apply(this, arguments);
} //edit user


function _Login() {
  _Login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
    var pool, user_data, auth, userInfo;
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
            return pool.request().input("email", sql.VarChar, user.email).execute("LOGIN");

          case 6:
            user_data = _context4.sent;

            if (!(user_data.recordset.length == 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", {
              title: "Ce utilisateur n'exister pas ou le compte est désactivé par votre directeur",
              error: 'User not found'
            });

          case 11:
            _context4.next = 13;
            return BCRYPT.compare(user.password, user_data.recordset[0].userPassword);

          case 13:
            auth = _context4.sent;

            if (!auth) {
              _context4.next = 25;
              break;
            }

            if (!(user_data.recordset[0].typeUtilisateur == user.role)) {
              _context4.next = 22;
              break;
            }

            _context4.next = 18;
            return getUser(user.email);

          case 18:
            userInfo = _context4.sent;
            return _context4.abrupt("return", {
              title: 'User in',
              token: generateJWT(userInfo)
            });

          case 22:
            return _context4.abrupt("return", {
              title: 'verifiez votre type',
              error: 'Wrong Function'
            });

          case 23:
            _context4.next = 26;
            break;

          case 25:
            return _context4.abrupt("return", {
              title: 'Verifiez votre mot de passe',
              error: 'Wrong Password'
            });

          case 26:
            _context4.next = 31;
            break;

          case 28:
            _context4.prev = 28;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", {
              title: 'desolé, erreur de serveur',
              error: 'Something went wrong'
            });

          case 31:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 28]]);
  }));
  return _Login.apply(this, arguments);
}

function editUser(_x4) {
  return _editUser.apply(this, arguments);
} // delete user


function _editUser() {
  _editUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            console.log(user);
            _context5.next = 4;
            return sql.connect(config);

          case 4:
            _context5.prev = 4;
            _context5.next = 7;
            return new sql.Request().input('email', sql.VarChar, user.UserName).input('ln', sql.VarChar, user.LastName).input('fn', sql.VarChar, user.LastName).input('bd', sql.DateTimeOffset, user.dateNaissance).input('tel', sql.VarChar, user.Tel).input('job', sql.VarChar, user.Fonction).input('struc', sql.VarChar, user.Structure).input('depart', sql.VarChar, user.Departement).input('pt', sql.VarChar, user.PosteTelephonique).execute('UpdateUser');

          case 7:
            console.log('user updated');
            return _context5.abrupt("return", 'UU');

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](4);
            console.log(_context5.t0);
            return _context5.abrupt("return", 'CNUU');

          case 15:
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t1 = _context5["catch"](0);
            return _context5.abrupt("return", 'CNCTDB');

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 17], [4, 11]]);
  }));
  return _editUser.apply(this, arguments);
}

function deleteUser(_x5) {
  return _deleteUser.apply(this, arguments);
}

function _deleteUser() {
  _deleteUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email) {
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
            return pool.request().input("email", sql.VarChar, email).execute("DeleteUser");

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

function confirm(_x6) {
  return _confirm.apply(this, arguments);
}

function _confirm() {
  _confirm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user) {
    var result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return sql.connect(config);

          case 3:
            _context7.prev = 3;
            _context7.next = 6;
            return new sql.Request().input('email', sql.VarChar, user.UserName).execute('LOGIN');

          case 6:
            result = _context7.sent;
            _context7.next = 9;
            return BCRYPT.compare(user.PassWord, result.recordset[0].userPassword);

          case 9:
            if (!_context7.sent) {
              _context7.next = 13;
              break;
            }

            return _context7.abrupt("return", 'G');

          case 13:
            return _context7.abrupt("return", 'WP');

          case 14:
            _context7.next = 19;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](3);
            return _context7.abrupt("return", 'CNFU');

          case 19:
            _context7.next = 24;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t1 = _context7["catch"](0);
            return _context7.abrupt("return", 'CNCTDB');

          case 24:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 21], [3, 16]]);
  }));
  return _confirm.apply(this, arguments);
}

function changePW(_x7) {
  return _changePW.apply(this, arguments);
}

function _changePW() {
  _changePW = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user) {
    var PW;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return sql.connect(config);

          case 3:
            _context8.prev = 3;
            _context8.next = 6;
            return BCRYPT.hash(user.pw, saltRounds);

          case 6:
            PW = _context8.sent;
            _context8.next = 9;
            return new sql.Request().input('email', sql.VarChar, user.UserName).input('npw', sql.VarChar, PW).execute('UpdatePassword');

          case 9:
            return _context8.abrupt("return", 'G');

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](3);
            return _context8.abrupt("return", 'CIP');

          case 15:
            _context8.next = 20;
            break;

          case 17:
            _context8.prev = 17;
            _context8.t1 = _context8["catch"](0);
            return _context8.abrupt("return", 'CNCTDB');

          case 20:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 17], [3, 12]]);
  }));
  return _changePW.apply(this, arguments);
}

function TAccDemande(_x8, _x9) {
  return _TAccDemande.apply(this, arguments);
}

function _TAccDemande() {
  _TAccDemande = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(UserID, Msg) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return sql.connect(config);

          case 3:
            _context9.prev = 3;
            console.log(UserID + ' ' + Msg);
            _context9.next = 7;
            return new sql.Request().input('email', sql.VarChar, UserID).input('Msg', sql.VarChar, Msg).execute('TAccDemande');

          case 7:
            console.log('Accout has been ' + Msg + 'ed');
            return _context9.abrupt("return", Msg);

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](3);
            console.log(_context9.t0);
            console.log('Something went wrong');
            return _context9.abrupt("return", 'SomeThing went wrong');

          case 16:
            _context9.next = 21;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t1 = _context9["catch"](0);
            return _context9.abrupt("return", 'CNCTDB');

          case 21:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 18], [3, 11]]);
  }));
  return _TAccDemande.apply(this, arguments);
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  setUser: setUser,
  editUser: editUser,
  deleteUser: deleteUser,
  Login: Login,
  confirm: confirm,
  changePW: changePW,
  TAccDemande: TAccDemande
};