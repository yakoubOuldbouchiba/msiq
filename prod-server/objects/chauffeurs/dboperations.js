require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yacin/Desktop/MyProjects/msiq/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all chauffeurs.


function getChauffeurs() {
  return _getChauffeurs.apply(this, arguments);
} // set new chauffeur


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
            return pool.request().query("SELECT * FROM chauffeur");

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
  return _getChauffeurs.apply(this, arguments);
}

function setChauffeur(_x) {
  return _setChauffeur.apply(this, arguments);
} //edit chauffeur


function _setChauffeur() {
  _setChauffeur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(chauffeur) {
    var pool, nouveau_chauffeur;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(chauffeur);
            _context2.prev = 1;
            _context2.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context2.sent;
            _context2.next = 7;
            return pool.request().input('nom', sql.VarChar, chauffeur.nom).input('prenom', sql.VarChar, chauffeur.prenom).input('type_permis', sql.VarChar, chauffeur.type_permis).input('telephone', sql.VarChar, chauffeur.telephone).input('email', sql.VarChar, chauffeur.email).query("INSERT  INTO chauffeur VALUES(" + "@nom,@prenom,@type_permis,@telephone,@email);");

          case 7:
            nouveau_chauffeur = _context2.sent;
            return _context2.abrupt("return", true);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            console.log("wrong");
            return _context2.abrupt("return", false);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 11]]);
  }));
  return _setChauffeur.apply(this, arguments);
}

function editChauffeur() {
  return _editChauffeur.apply(this, arguments);
} // delete chauffeur


function _editChauffeur() {
  _editChauffeur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var pool;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context3.sent;
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _editChauffeur.apply(this, arguments);
}

function deleteChauffeur(_x2) {
  return _deleteChauffeur.apply(this, arguments);
}

function _deleteChauffeur() {
  _deleteChauffeur = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(chauffeur_id) {
    var pool;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            console.log("chauffeur id : " + chauffeur_id);
            _context4.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context4.sent;
            _context4.next = 7;
            return pool.request().input("chauffeur_id", sql.VarChar, chauffeur_id).query("DELETE FROM chauffeur where chauffeur_id = @chauffeur_id");

          case 7:
            return _context4.abrupt("return", true);

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", false);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return _deleteChauffeur.apply(this, arguments);
}

module.exports = {
  getChauffeurs: getChauffeurs,
  setChauffeur: setChauffeur,
  editChauffeur: editChauffeur,
  deleteChauffeur: deleteChauffeur
};