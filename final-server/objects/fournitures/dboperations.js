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
    var objets;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sql.connect(config);

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return new sql.Request().execute("GETOBJETS");

          case 6:
            objets = _context.sent;
            sql.close();
            console.log(objets.recordset);
            return _context.abrupt("return", objets.recordset);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17], [3, 12]]);
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
            return pool.request().input('co', sql.VarChar, objet.code_object).input('desig', sql.VarChar, objet.designation).input('qty', sql.Int, parseInt(objet.quantite)).execute("SETOBJET");

          case 6:
            sql.close();
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
  return _setObject.apply(this, arguments);
}

function editObject(_x2) {
  return _editObject.apply(this, arguments);
} // delete message


function _editObject() {
  _editObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(objet) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return sql.connect(config);

          case 3:
            _context3.next = 5;
            return new sql.Request().input('co', sql.VarChar, objet.code_object).input('desig', sql.VarChar, objet.designation).input('qty', sql.Int, parseInt(objet.quantite)).execute("UPDATEOBJECT");

          case 5:
            sql.close();
            return _context3.abrupt("return", true);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", false);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _editObject.apply(this, arguments);
}

function deleteObject(_x3) {
  return _deleteObject.apply(this, arguments);
}

function _deleteObject() {
  _deleteObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(code_objet) {
    var res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return sql.connect(config);

          case 3:
            _context4.next = 5;
            return new sql.Request().input("code_objet", sql.VarChar, code_objet).output("deleted", sql.Bit).execute("DELETEOBJET");

          case 5:
            res = _context4.sent;
            sql.close();
            console.log(res.output.deleted);
            return _context4.abrupt("return", res.output.deleted);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", false);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _deleteObject.apply(this, arguments);
}

module.exports = {
  getObjects: getObjects,
  setObject: setObject,
  editObject: editObject,
  deleteObject: deleteObject
};