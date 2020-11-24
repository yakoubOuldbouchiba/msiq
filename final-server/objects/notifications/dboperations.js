require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all notifications.


function getNotifactions(_x) {
  return _getNotifactions.apply(this, arguments);
} // seen notifications


function _getNotifactions() {
  _getNotifactions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log(email);
            _context.next = 4;
            return sql.connect(config);

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return new sql.Request().input('email', sql.VarChar, email).execute('GetNotification');

          case 7:
            res = _context.sent;
            sql.close();
            console.log("notifications getted");
            return _context.abrupt("return", {
              result: "NG",
              notifications: res.recordset
            });

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);
            console.log('can not get notifications');
            sql.close();
            return _context.abrupt("return", 'CNGN');

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 20], [4, 13]]);
  }));
  return _getNotifactions.apply(this, arguments);
}

function SeeNotifactions(_x2) {
  return _SeeNotifactions.apply(this, arguments);
} // unseen notifications


function _SeeNotifactions() {
  _SeeNotifactions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sql.connect(config);

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return new sql.Request().input('id', sql.Int, id).execute('SeenNotif');

          case 6:
            sql.close();
            return _context2.abrupt("return", {
              result: "SN"
            });

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);
            console.log('can not seen notification');
            sql.close();
            return _context2.abrupt("return", 'CNSN');

          case 15:
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17], [3, 10]]);
  }));
  return _SeeNotifactions.apply(this, arguments);
}

function UnSeeNotifactions(_x3) {
  return _UnSeeNotifactions.apply(this, arguments);
}

function _UnSeeNotifactions() {
  _UnSeeNotifactions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email) {
    var res;
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
            return new sql.Request().input('email', sql.VarChar, email).execute('UnSeenNotif');

          case 6:
            res = _context3.sent;
            sql.close();
            return _context3.abrupt("return", {
              result: "SN",
              UnSeenNotif: res.recordset
            });

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](3);
            console.log('can not seen notification');
            sql.close();
            return _context3.abrupt("return", 'CNSN');

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18], [3, 11]]);
  }));
  return _UnSeeNotifactions.apply(this, arguments);
}

module.exports = {
  getNotifactions: getNotifactions,
  SeeNotifactions: SeeNotifactions,
  UnSeeNotifactions: UnSeeNotifactions
};