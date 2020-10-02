require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

/**
 * we using objet table
 */
var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all ojects.


function getObjects() {
  return _getObjects.apply(this, arguments);
} // set new object


function _getObjects() {
  _getObjects = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
            return pool.request().query("SELECT * FROM objet");

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
  return _getObjects.apply(this, arguments);
}

function setObject(_x) {
  return _setObject.apply(this, arguments);
} //edit object


function _setObject() {
  _setObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(objet) {
    var pool;
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
            return pool.request().input('co', sql.VarChar, objet.code_objet).input('desig', sql.VarChar, objet.designation).input('qty', sql.VarChar, parseInt(objet.quantite)).query("INSERT INTO objet VALUES(" + "@co,@desig,@qty);");

          case 6:
            return _context2.abrupt("return", true);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _setObject.apply(this, arguments);
}

function editObject() {
  return _editObject.apply(this, arguments);
} // delete message


function _editObject() {
  _editObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
  return _editObject.apply(this, arguments);
}

function deleteObject(_x2) {
  return _deleteObject.apply(this, arguments);
}

function _deleteObject() {
  _deleteObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(code_objet) {
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
            return pool.request().input("code_objet", sql.VarChar, code_objet).query("DELETE FROM objet where code_objet = @code_objet");

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
  return _deleteObject.apply(this, arguments);
}

module.exports = {
  getObjects: getObjects,
  setObject: setObject,
  editObject: editObject,
  deleteObject: deleteObject
};