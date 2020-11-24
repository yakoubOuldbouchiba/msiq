require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting total 


function getTotal(_x) {
  return _getTotal.apply(this, arguments);
} // getting total year


function _getTotal() {
  _getTotal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(struct) {
    var total;
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
            return new sql.Request().input("struct", sql.VarChar, struct).execute('Total');

          case 6:
            total = _context.sent;
            sql.close();
            return _context.abrupt("return", {
              result: 'TG',
              //total getted
              total: total.recordset
            });

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            console.log('can not get total');
            sql.close();
            return _context.abrupt("return", 'CNGT');

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19], [3, 11]]);
  }));
  return _getTotal.apply(this, arguments);
}

function getTotalYear(_x2) {
  return _getTotalYear.apply(this, arguments);
} // getting total month


function _getTotalYear() {
  _getTotalYear = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(struct) {
    var totalYear;
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
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalYear');

          case 6:
            totalYear = _context2.sent;
            sql.close();
            return _context2.abrupt("return", {
              result: 'TG',
              //total getted
              total: totalYear.recordset
            });

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context2.abrupt("return", 'CNGT');

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18], [3, 11]]);
  }));
  return _getTotalYear.apply(this, arguments);
}

function getTotalMonth(_x3) {
  return _getTotalMonth.apply(this, arguments);
} // getting total day 


function _getTotalMonth() {
  _getTotalMonth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(struct) {
    var totalMonth;
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
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalMonth');

          case 6:
            totalMonth = _context3.sent;
            sql.close();
            return _context3.abrupt("return", {
              result: 'TG',
              //total getted
              total: totalMonth.recordset
            });

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context3.abrupt("return", 'CNGT');

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
  return _getTotalMonth.apply(this, arguments);
}

function getTotalDay(_x4) {
  return _getTotalDay.apply(this, arguments);
} // maxDep 


function _getTotalDay() {
  _getTotalDay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(struct) {
    var totalDay;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return sql.connect(config);

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalDay');

          case 6:
            totalDay = _context4.sent;
            sql.close();
            return _context4.abrupt("return", {
              result: 'TG',
              //total getted
              total: totalDay.recordset
            });

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context4.abrupt("return", 'CNGT');

          case 16:
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t1 = _context4["catch"](0);
            console.log('connection error');
            return _context4.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18], [3, 11]]);
  }));
  return _getTotalDay.apply(this, arguments);
}

function maxDep(_x5, _x6, _x7) {
  return _maxDep.apply(this, arguments);
} // maxUser


function _maxDep() {
  _maxDep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(struct, peroid, typeDemand) {
    var max;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return sql.connect(config);

          case 3:
            _context5.prev = 3;
            _context5.next = 6;
            return new sql.Request().input("struct", sql.VarChar, struct).input("typeDemand", sql.VarChar, typeDemand).input("peroidVarchar", sql.VarChar, peroid).execute('MaxDemandByDep');

          case 6:
            max = _context5.sent;
            sql.close();
            return _context5.abrupt("return", {
              result: 'TG',
              //total getted
              max: max.recordset
            });

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context5.abrupt("return", 'CNGT');

          case 16:
            _context5.next = 22;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t1 = _context5["catch"](0);
            console.log('connection error');
            return _context5.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 18], [3, 11]]);
  }));
  return _maxDep.apply(this, arguments);
}

function maxUser(_x8, _x9, _x10) {
  return _maxUser.apply(this, arguments);
} // AvgDep  


function _maxUser() {
  _maxUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(struct, peroid, typeDemand) {
    var max;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return sql.connect(config);

          case 3:
            _context6.prev = 3;
            _context6.next = 6;
            return new sql.Request().input("struct", sql.VarChar, struct).input("typeDemand", sql.VarChar, typeDemand).input("peroidVarchar", sql.VarChar, peroid).execute('MaxDemandByUser');

          case 6:
            max = _context6.sent;
            sql.close();
            return _context6.abrupt("return", {
              result: 'TG',
              //total getted
              max: max.recordset
            });

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context6.abrupt("return", 'CNGT');

          case 16:
            _context6.next = 22;
            break;

          case 18:
            _context6.prev = 18;
            _context6.t1 = _context6["catch"](0);
            console.log('connection error');
            return _context6.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 18], [3, 11]]);
  }));
  return _maxUser.apply(this, arguments);
}

function AvgDep(_x11, _x12, _x13) {
  return _AvgDep.apply(this, arguments);
} // AvgUser 


function _AvgDep() {
  _AvgDep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(struct, peroid, typeDemand) {
    var avg;
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
            return new sql.Request().input("struct", sql.VarChar, struct).input("typeDemand", sql.VarChar, typeDemand).input("peroidVarchar", sql.VarChar, peroid).execute('AvgDemandByDep');

          case 6:
            avg = _context7.sent;
            sql.close();
            return _context7.abrupt("return", {
              result: 'TG',
              //total getted
              avg: avg.recordset
            });

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context7.abrupt("return", 'CNGT');

          case 16:
            _context7.next = 22;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t1 = _context7["catch"](0);
            console.log('connection error');
            return _context7.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 18], [3, 11]]);
  }));
  return _AvgDep.apply(this, arguments);
}

function AvgUser(_x14, _x15, _x16) {
  return _AvgUser.apply(this, arguments);
} // getting total By Demand 


function _AvgUser() {
  _AvgUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(struct, peroid, typeDemand) {
    var avg;
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
            return new sql.Request().input("struct", sql.VarChar, struct).input("typeDemand", sql.VarChar, typeDemand).input("peroidVarchar", sql.VarChar, peroid).execute('AvgDemandByUser');

          case 6:
            avg = _context8.sent;
            sql.close();
            return _context8.abrupt("return", {
              result: 'TG',
              //total getted
              avg: avg.recordset
            });

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context8.abrupt("return", 'CNGT');

          case 16:
            _context8.next = 22;
            break;

          case 18:
            _context8.prev = 18;
            _context8.t1 = _context8["catch"](0);
            console.log('connection error');
            return _context8.abrupt("return", 'CNCTDB');

          case 22:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 18], [3, 11]]);
  }));
  return _AvgUser.apply(this, arguments);
}

function getTotalByDemand(_x17, _x18) {
  return _getTotalByDemand.apply(this, arguments);
}

function _getTotalByDemand() {
  _getTotalByDemand = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(struct, date) {
    var total;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return sql.connect(config);

          case 3:
            _context9.prev = 3;
            total = null;

            if (!(date == 'total')) {
              _context9.next = 11;
              break;
            }

            _context9.next = 8;
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalByDemand');

          case 8:
            total = _context9.sent;
            _context9.next = 27;
            break;

          case 11:
            if (!(date == 'year')) {
              _context9.next = 17;
              break;
            }

            _context9.next = 14;
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalByDemandInYear');

          case 14:
            total = _context9.sent;
            _context9.next = 27;
            break;

          case 17:
            if (!(date == 'month')) {
              _context9.next = 23;
              break;
            }

            _context9.next = 20;
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalByDemandInMonth');

          case 20:
            total = _context9.sent;
            _context9.next = 27;
            break;

          case 23:
            if (!(date == 'day')) {
              _context9.next = 27;
              break;
            }

            _context9.next = 26;
            return new sql.Request().input("struct", sql.VarChar, struct).execute('TotalByDemandInDay');

          case 26:
            total = _context9.sent;

          case 27:
            console.log('Total getted');
            sql.close();
            return _context9.abrupt("return", {
              result: 'TG',
              //total getted
              total: total.recordset
            });

          case 32:
            _context9.prev = 32;
            _context9.t0 = _context9["catch"](3);
            console.log('can not get total');
            sql.close();
            return _context9.abrupt("return", 'CNGT');

          case 37:
            _context9.next = 43;
            break;

          case 39:
            _context9.prev = 39;
            _context9.t1 = _context9["catch"](0);
            console.log('connection error');
            return _context9.abrupt("return", 'CNCTDB');

          case 43:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 39], [3, 32]]);
  }));
  return _getTotalByDemand.apply(this, arguments);
}

module.exports = {
  getTotal: getTotal,
  getTotalYear: getTotalYear,
  getTotalMonth: getTotalMonth,
  getTotalDay: getTotalDay,
  getTotalByDemand: getTotalByDemand,
  maxUser: maxUser,
  maxDep: maxDep,
  AvgDep: AvgDep,
  AvgUser: AvgUser
};