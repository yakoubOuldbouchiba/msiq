require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all chauffeurs.


function getChauffeurs() {
  return _getChauffeurs.apply(this, arguments);
} // getting all chauffeurs.


function _getChauffeurs() {
  _getChauffeurs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
            return pool.request().execute("GETCHAUFFEURS");

          case 6:
            users = _context.sent;
            sql.close();
            return _context.abrupt("return", users.recordsets);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _getChauffeurs.apply(this, arguments);
}

function getDispoChauffeurs(_x) {
  return _getDispoChauffeurs.apply(this, arguments);
} // set new chauffeur


function _getDispoChauffeurs() {
  _getDispoChauffeurs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(date) {
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
            return pool.request().input('date_depart', sql.DateTime, date).execute("GETDISPOCHAUFFEURS");

          case 6:
            users = _context2.sent;
            sql.close();
            return _context2.abrupt("return", users.recordsets);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _getDispoChauffeurs.apply(this, arguments);
}

function setChauffeur(_x2) {
  return _setChauffeur.apply(this, arguments);
} //edit chauffeur


function _setChauffeur() {
  _setChauffeur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chauffeur) {
    var pool;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(chauffeur);
            _context3.prev = 1;
            _context3.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context3.sent;
            _context3.next = 7;
            return pool.request().input('nom', sql.VarChar, chauffeur.nom).input('prenom', sql.VarChar, chauffeur.prenom).input('type_permis', sql.VarChar, chauffeur.type_permis).input('telephone', sql.VarChar, chauffeur.telephone).input('email', sql.VarChar, chauffeur.email).execute("SETCHAUFFEUR");

          case 7:
            sql.close();
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
  return _setChauffeur.apply(this, arguments);
}

function editChauffeur(_x3, _x4) {
  return _editChauffeur.apply(this, arguments);
} // delete chauffeur


function _editChauffeur() {
  _editChauffeur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, chauffeur) {
    var pool;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            console.log(id);
            _context4.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context4.sent;
            _context4.next = 7;
            return pool.request().input('chauffeur_id', sql.Int, chauffeur.chauffeur_id).input('nom', sql.VarChar, chauffeur.nom).input('prenom', sql.VarChar, chauffeur.prenom).input('type_permis', sql.VarChar, chauffeur.type_permis).input('telephone', sql.VarChar, chauffeur.telephone).input('email', sql.VarChar, chauffeur.email).execute("UPDATECHAUFFEUR");

          case 7:
            sql.close();
            return _context4.abrupt("return", true);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _editChauffeur.apply(this, arguments);
}

function deleteChauffeur(_x5) {
  return _deleteChauffeur.apply(this, arguments);
}

function _deleteChauffeur() {
  _deleteChauffeur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(chauffeur_id) {
    var pool, res;
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
            return pool.request().input("chauffeur_id", sql.VarChar, chauffeur_id).output('deleted', sql.Bit).execute("DELETECHAUFFEUR");

          case 6:
            res = _context5.sent;
            sql.close();
            return _context5.abrupt("return", res.output.deleted);

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", false);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return _deleteChauffeur.apply(this, arguments);
}

module.exports = {
  getChauffeurs: getChauffeurs,
  getDispoChauffeurs: getDispoChauffeurs,
  setChauffeur: setChauffeur,
  editChauffeur: editChauffeur,
  deleteChauffeur: deleteChauffeur
};