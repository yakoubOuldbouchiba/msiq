require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var jwt = require('jsonwebtoken');

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all vehicules.


function getVehicules() {
  return _getVehicules.apply(this, arguments);
} // get a single car.


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
            return pool.request().query("SELECT * FROM vehicule");

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

function getVehicule(_x) {
  return _getVehicule.apply(this, arguments);
} // set new Vehicule


function _getVehicule() {
  _getVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(matricule) {
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
            return pool.request().input("matricule", sql.VarChar, matricule).query("SELECT * FROM vehicule where matricule = @matricule");

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
  return _getVehicule.apply(this, arguments);
}

function setVehicule(_x2) {
  return _setVehicule.apply(this, arguments);
} //edit user


function _setVehicule() {
  _setVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(vehicule) {
    var pool;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(vehicule);
            _context3.prev = 1;
            _context3.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context3.sent;
            _context3.next = 7;
            return pool.request().input('matricule', sql.VarChar, vehicule.matricule).input('nom', sql.VarChar, vehicule.nom).input('annee', sql.Int, parseInt(vehicule.annee)).input('type_vehicule', sql.VarChar, vehicule.type_vehicule).query("INSERT INTO vehicule VALUES(" + "@matricule,@nom,@annee,@type_vehicule);");

          case 7:
            console.log("we inserted");
            return _context3.abrupt("return", true);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            console.log("wrong");
            return _context3.abrupt("return", false);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));
  return _setVehicule.apply(this, arguments);
}

function editVehicule() {
  return _editVehicule.apply(this, arguments);
} // delete user


function _editVehicule() {
  _editVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {//let pool =  sql.connect(config);
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _editVehicule.apply(this, arguments);
}

function deleteVehicule(_x3) {
  return _deleteVehicule.apply(this, arguments);
}

function _deleteVehicule() {
  _deleteVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(matricule) {
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
            return pool.request().input("matricule", sql.VarChar, matricule).query("DELETE FROM vehicule where matricule = @matricule");

          case 6:
            return _context5.abrupt("return", true);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", false);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return _deleteVehicule.apply(this, arguments);
}

module.exports = {
  getVehicules: getVehicules,
  getVehicule: getVehicule,
  setVehicule: setVehicule,
  editVehicule: editVehicule,
  deleteVehicule: deleteVehicule
};