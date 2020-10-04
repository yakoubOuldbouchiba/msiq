require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yacin/Desktop/MyProjects/msiq/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all messages.


function getMessages() {
  return _getMessages.apply(this, arguments);
} // set new message


function _getMessages() {
  _getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var pool;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _getMessages.apply(this, arguments);
}

function setMessage() {
  return _setMessage.apply(this, arguments);
} //edit message


function _setMessage() {
  _setMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _setMessage.apply(this, arguments);
}

function editMessage() {
  return _editMessage.apply(this, arguments);
} // delete message


function _editMessage() {
  _editMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
  return _editMessage.apply(this, arguments);
}

function deleteMessage() {
  return _deleteMessage.apply(this, arguments);
}

function _deleteMessage() {
  _deleteMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return _deleteMessage.apply(this, arguments);
}

module.exports = {
  getMessages: getMessages,
  setMessage: setMessage,
  editMessage: editMessage,
  deleteMessage: deleteMessage
};