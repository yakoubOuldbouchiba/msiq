require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var jwt = require('jsonwebtoken');

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all vehicules.


function getVehicules() {
  return _getVehicules.apply(this, arguments);
} // getting all vehicules.


function _getVehicules() {
  _getVehicules = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
            return pool.request().query("GETVEHICULE");

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
  return _getVehicules.apply(this, arguments);
}

function getDispoVehicules(_x) {
  return _getDispoVehicules.apply(this, arguments);
} // get a single car.


function _getDispoVehicules() {
  _getDispoVehicules = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(date) {
    var pool, users;
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
            return pool.request().input('date_depart', sql.DateTime, date).query("GETDISPOVEHICULE");

          case 6:
            users = _context2.sent;
            return _context2.abrupt("return", users.recordsets);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _getDispoVehicules.apply(this, arguments);
}

function getVehicule(_x2) {
  return _getVehicule.apply(this, arguments);
} // set new Vehicule


function _getVehicule() {
  _getVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(matricule) {
    var pool, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context3.sent;
            _context3.next = 6;
            return pool.request().input("matricule", sql.VarChar, matricule).query("SELECT * FROM vehicule where matricule = @matricule");

          case 6:
            user = _context3.sent;
            return _context3.abrupt("return", user.recordsets);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", 0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _getVehicule.apply(this, arguments);
}

function setVehicule(_x3) {
  return _setVehicule.apply(this, arguments);
} //edit user


function _setVehicule() {
  _setVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(vehicule) {
    var pool;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(vehicule);
            _context4.prev = 1;
            _context4.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context4.sent;
            _context4.next = 7;
            return pool.request().input('matricule', sql.VarChar, vehicule.matricule).input('nom', sql.VarChar, vehicule.nom).input('annee', sql.Int, parseInt(vehicule.annee)).input('type_vehicule', sql.VarChar, vehicule.type_vehicule).execute("SETVEHICULE");

          case 7:
            console.log("we inserted");
            return _context4.abrupt("return", true);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            console.log("wrong");
            return _context4.abrupt("return", false);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 11]]);
  }));
  return _setVehicule.apply(this, arguments);
}

function editVehicule(_x4) {
  return _editVehicule.apply(this, arguments);
} // delete user


function _editVehicule() {
  _editVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(vehicule) {
    var pool;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context5.sent;
            _context5.next = 6;
            return pool.request().input('matricule', sql.VarChar, vehicule.matricule).input('nom', sql.VarChar, vehicule.nom).input('annee', sql.Int, parseInt(vehicule.annee)).input('type_vehicule', sql.VarChar, vehicule.type_vehicule).execute("UPDATEVEHICULE");

          case 6:
            console.log("we inserted");
            return _context5.abrupt("return", true);

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log("wrong");
            return _context5.abrupt("return", false);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return _editVehicule.apply(this, arguments);
}

function deleteVehicule(_x5) {
  return _deleteVehicule.apply(this, arguments);
}

function _deleteVehicule() {
  _deleteVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(matricule) {
    var pool, res;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            console.log(matricule);
            _context6.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context6.sent;
            _context6.next = 7;
            return pool.request().input("matricule", sql.VarChar, matricule).output('deleted', sql.Bit).execute("DELETEVEHICULE");

          case 7:
            res = _context6.sent;
            sql.close();
            return _context6.abrupt("return", res.output.deleted);

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", false);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return _deleteVehicule.apply(this, arguments);
}

module.exports = {
  getVehicules: getVehicules,
  getDispoVehicules: getDispoVehicules,
  getVehicule: getVehicule,
  setVehicule: setVehicule,
  editVehicule: editVehicule,
  deleteVehicule: deleteVehicule
};