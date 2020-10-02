require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all produits.


function getProduits() {
  return _getProduits.apply(this, arguments);
} // set new Produit


function _getProduits() {
  _getProduits = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
            return pool.request().query("SELECT * FROM produit");

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
  return _getProduits.apply(this, arguments);
}

function setProduit(_x) {
  return _setProduit.apply(this, arguments);
} //edit Produit


function _setProduit() {
  _setProduit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(produit) {
    var pool;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(produit);
            _context2.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context2.sent;
            _context2.next = 7;
            return pool.request().input('cp', sql.VarChar, produit.code_produit).input('desig', sql.VarChar, produit.designation).input('qty', sql.VarChar, parseInt(produit.quantite)).query("INSERT INTO produit VALUES(" + "@cp,@desig,@qty);");

          case 7:
            return _context2.abrupt("return", true);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _setProduit.apply(this, arguments);
}

function editProduit() {
  return _editProduit.apply(this, arguments);
} // delete Produit


function _editProduit() {
  _editProduit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
  return _editProduit.apply(this, arguments);
}

function deleteProduit(_x2) {
  return _deleteProduit.apply(this, arguments);
}

function _deleteProduit() {
  _deleteProduit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(code_objet) {
    var pool;
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
            return pool.request().input("code_produit", sql.VarChar, code_objet).query("DELETE FROM produit where code_produit = @code_produit");

          case 6:
            return _context4.abrupt("return", true);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", false);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return _deleteProduit.apply(this, arguments);
}

module.exports = {
  getProduits: getProduits,
  setProduit: setProduit,
  editProduit: editProduit,
  deleteProduit: deleteProduit
};