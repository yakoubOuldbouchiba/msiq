require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all messages.


function getDemandes(_x) {
  return _getDemandes.apply(this, arguments);
} //edit message


function _getDemandes() {
  _getDemandes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
    var demandes;
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
            return new sql.Request().input('email', sql.VarChar, email).execute('getDemandes');

          case 6:
            demandes = _context.sent;
            console.log(demandes.recordset);
            return _context.abrupt("return", {
              result: 'DG',
              demandes: demandes.recordset
            });

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.log('can not get Demandes dashboard');
            console.log(_context.t0);
            sql.close();
            return _context.abrupt("return", 'CNGD');

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
  return _getDemandes.apply(this, arguments);
}

function editDemande() {
  return _editDemande.apply(this, arguments);
} // get Demand


function _editDemande() {
  _editDemande = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
  return _editDemande.apply(this, arguments);
}

function getDemande(_x2) {
  return _getDemande.apply(this, arguments);
} // delete message


function _getDemande() {
  _getDemande = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
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
            console.log(id);
            _context3.next = 7;
            return new sql.Request().input('id', sql.Int, id).execute('GetDemande');

          case 7:
            res = _context3.sent;
            sql.close();
            console.log("demand get it");
            return _context3.abrupt("return", {
              result: "DG",
              demande: res.recordset[0]
            });

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            console.log('can not get Demande');
            sql.close();
            return _context3.abrupt("return", 'CNGD');

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 20], [3, 13]]);
  }));
  return _getDemande.apply(this, arguments);
}

function deleteDemande(_x3) {
  return _deleteDemande.apply(this, arguments);
} // Getting all Demandes a traiter.


function _deleteDemande() {
  _deleteDemande = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return sql.connect(config);

          case 3:
            _context4.prev = 3;
            console.log(id);
            _context4.next = 7;
            return new sql.Request().input('id', sql.Int, id).execute('DeleteDemande');

          case 7:
            sql.close();
            console.log("demande deleted");
            return _context4.abrupt("return", "DD");

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](3);
            console.log('can not delete Demande');
            sql.close();
            return _context4.abrupt("return", 'CNDD');

          case 17:
            _context4.next = 23;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t1 = _context4["catch"](0);
            console.log('connection error');
            return _context4.abrupt("return", 'CNCTDB');

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 19], [3, 12]]);
  }));
  return _deleteDemande.apply(this, arguments);
}

function getDemandesATraiter(_x4) {
  return _getDemandesATraiter.apply(this, arguments);
} // Update demand State.


function _getDemandesATraiter() {
  _getDemandesATraiter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(Params) {
    var demandes;
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
            return new sql.Request().input('UserType', sql.VarChar, Params.UserType).input('Depart', sql.VarChar, Params.Depart).input('Struct', sql.VarChar, Params.Struct).execute('getDemandeATraiter');

          case 6:
            demandes = _context5.sent;
            console.log(demandes.recordsets);
            return _context5.abrupt("return", demandes.recordsets);

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](3);
            console.log(_context5.t0);
            console.log('can not get the demandes');
            sql.close();
            return _context5.abrupt("return", null);

          case 17:
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t1 = _context5["catch"](0);
            console.log('connection error');
            return _context5.abrupt("return", null);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 19], [3, 11]]);
  }));
  return _getDemandesATraiter.apply(this, arguments);
}

function UpdateDemandState(_x5, _x6, _x7, _x8, _x9, _x10, _x11) {
  return _UpdateDemandState.apply(this, arguments);
}

function _UpdateDemandState() {
  _UpdateDemandState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(DemandeID, state, motif, valider, typeD, UT, io) {
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
            return new sql.Request().input('Demand_ID', sql.VarChar, DemandeID).input('motif', sql.VarChar, motif).input('State', sql.VarChar, state).output('userID', sql.VarChar) // for notif
            .output('NID', sql.Int) // for notif
            .output('desc', sql.VarChar) //for notif
            .output('desc_C', sql.VarChar) //for notif
            .output('userID_C', sql.VarChar) // for notif
            .input('DT', sql.VarChar, typeD).input('UT', sql.VarChar, UT).output('DDATE', sql.DateTime).execute('UpdateDemandState').then(function (res, err) {
              if (err) console.log(err);
              var Notif = {
                // notification Info 
                userID: res.output.userID,
                notification_ID: res.output.NID,
                demande_ID: DemandeID,
                seen: 0,
                description_notif: res.output.desc,
                date_notification: res.output.DDATE
              };
              var Notif2 = {
                // notification Info 
                userID: res.output.userID_C,
                notification_ID: res.output.NID,
                demande_ID: DemandeID,
                seen: 0,
                description_notif: res.output.desc_C,
                date_notification: res.output.DDATE
              };

              if (typeD == 'Demande client') {
                Notif.icon = 'devices';
                Notif2.icon = 'devices';
              } else if (typeD == 'Demande véhicule') {
                Notif.icon = 'commute';
                Notif2.icon = 'commute';
              } else if (typeD == 'Demande fourniture') {
                Notif.icon = 'edit';
                Notif2.icon = 'edit';
              } else if (typeD == 'Demande de prise en charge') {
                Notif.icon = 'flight';
                Notif2.icon = 'flight';
              } else if (typeD == 'Demande de tirage') {
                Notif.icon = 'print';
                Notif2.icon = 'print';
              } else {
                Notif.icon = 'hotel';
                Notif2.icon = 'hotel';
              }

              io.emit("addNotif" + res.output.userID_C, Notif2); //notifier le C.       

              io.emit("addNotif" + res.output.userID, Notif); //notifier le C.

              io.emit("DeleteNofit" + valider, DemandeID); //notifier le valideur.
            });

          case 6:
            return _context6.abrupt("return", 'DU');

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](3);
            console.log(_context6.t0);
            console.log('can not Edit demande');
            sql.close();
            return _context6.abrupt("return", 'CNED');

          case 15:
            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t1 = _context6["catch"](0);
            console.log('connection error');
            return _context6.abrupt("return", 'CNCTDB');

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 17], [3, 9]]);
  }));
  return _UpdateDemandState.apply(this, arguments);
}

module.exports = {
  getDemandes: getDemandes,
  getDemande: getDemande,
  editDemande: editDemande,
  deleteDemande: deleteDemande,
  getDemandesATraiter: getDemandesATraiter,
  UpdateDemandState: UpdateDemandState
};