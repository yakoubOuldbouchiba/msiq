require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all demande.


function getDemandesRelex() {
  return _getDemandesRelex.apply(this, arguments);
} // get a demande client 


function _getDemandesRelex() {
  _getDemandesRelex = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
  return _getDemandesRelex.apply(this, arguments);
}

function getDemandeRelex(_x) {
  return _getDemandeRelex.apply(this, arguments);
} // set new demande


function _getDemandeRelex() {
  _getDemandeRelex = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var pool, demande;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context2.sent;
            _context2.prev = 4;
            _context2.next = 7;
            return pool.request().input("id", sql.VarChar, id).execute('GetDemandeRelex');

          case 7:
            demande = _context2.sent;
            console.log(demande.recordset[0]);
            console.log('Demande getted');
            sql.close();
            return _context2.abrupt("return", {
              result: 'DG',
              //Demand inserted
              demande: demande.recordset[0]
            });

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](4);
            console.log('can not Get Demande');
            sql.close();
            return _context2.abrupt("return", 'CNGD');

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 21], [4, 14]]);
  }));
  return _getDemandeRelex.apply(this, arguments);
}

function setDemandeRelex(_x2, _x3) {
  return _setDemandeRelex.apply(this, arguments);
} // edit new demande


function _setDemandeRelex() {
  _setDemandeRelex = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(Demande, io) {
    var date_depart, date_retour;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            date_depart = Demande.D.date_depart + " " + Demande.D.heure_depart;
            date_retour = Demande.D.date_retour + " " + Demande.D.heure_retour;
            _context3.next = 5;
            return sql.connect(config);

          case 5:
            console.log(Demande.D);
            _context3.prev = 6;

            if (!(Demande.UT == 'Chef departement')) {
              _context3.next = 13;
              break;
            }

            _context3.next = 10;
            return new sql.Request().input('userID', sql.VarChar, Demande.D.userID).input('destination', sql.VarChar, Demande.D.destination).input('objet_mission', sql.VarChar, Demande.D.objet_mission).input('date_depart', sql.DateTime, date_depart).input('date_retour', sql.DateTime, date_retour).input('prise_en_charge', sql.Bit, Demande.D.prise_en_charge).input('demande_V_ID', sql.Int, Demande.D.demande_V_ID).output('DID', sql.Int).output('DDATE', sql.DateTime).output('FID', sql.Int) //For notif
            .output('recevoir_ID', sql.VarChar) //For notif
            .input('etat', sql.VarChar, 'Directeur').execute('InsertDemandeRelex').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande activité relex',
                etat: 'Directeur',
                motif: '',
                seen: 0
              }; // i need check from to

              var Notif = {
                // notification Info 
                userID: Demande.D.userID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande activité relex',
                icon: 'hotel',
                date_notification: res.output.DID
              };
              io.emit(Demande.structure + "RD", Demand); //for repporting 

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandD' + Demande.D.structure, Demand);
              io.emit(Demande.D.userID, Demand);
            });

          case 10:
            console.log('Demande Inserted');
            sql.close();
            return _context3.abrupt("return", 'DI');

          case 13:
            if (!(Demande.UT == 'Directeur')) {
              _context3.next = 21;
              break;
            }

            _context3.next = 16;
            return new sql.Request().input('userID', sql.VarChar, Demande.D.userID).input('destination', sql.VarChar, Demande.D.destination).input('objet_mission', sql.VarChar, Demande.D.objet_mission).input('date_depart', sql.DateTime, date_depart).input('date_retour', sql.DateTime, date_retour).input('prise_en_charge', sql.Bit, Demande.D.prise_en_charge).input('demande_V_ID', sql.Int, Demande.D.demande_V_ID).output('DID', sql.Int).output('FID', sql.Int) //For notif
            .output('recevoir_ID', sql.VarChar) //For notif
            .output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Acceptee').execute('InsertDemandeRelex').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande activité relex',
                etat: 'Acceptee',
                motif: '',
                seen: 0
              }; // i need check from to

              var Notif = {
                // notification Info 
                userID: Demande.D.userID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande activité relex',
                icon: 'hotel',
                date_notification: res.output.DID
              };
              io.emit(Demande.structure + "RD", Demand); //for repporting 

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandRR', Demand);
              io.emit(Demande.D.userID, Demand);
            });

          case 16:
            console.log('Demande Inserted');
            sql.close();
            return _context3.abrupt("return", 'DI');

          case 21:
            _context3.next = 23;
            return new sql.Request().input('userID', sql.VarChar, Demande.D.userID).input('destination', sql.VarChar, Demande.D.destination).input('objet_mission', sql.VarChar, Demande.D.objet_mission).input('date_depart', sql.DateTime, date_depart).input('date_retour', sql.DateTime, date_retour).input('prise_en_charge', sql.Bit, Demande.D.prise_en_charge).input('demande_V_ID', sql.Int, Demande.D.demande_V_ID).output('DID', sql.Int).output('FID', sql.Int) //For notif
            .output('recevoir_ID', sql.VarChar) //For notif
            .output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Chef Departement').execute('InsertDemandeRelex').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande activité relex',
                etat: 'Chef Departement',
                motif: '',
                seen: 0
              }; // i need check from to

              var Notif = {
                // notification Info 
                userID: Demande.D.userID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande activité relex',
                icon: 'hotel',
                date_notification: res.output.DID
              };
              io.emit(Demande.structure + "RD", Demand); //for repporting 

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandCD' + Demande.D.structure + Demande.D.departement, Demand);
              io.emit(Demande.D.userID, Demand);
            });

          case 23:
            console.log('Demande Inserted');
            sql.close();
            return _context3.abrupt("return", 'DI');

          case 26:
            _context3.next = 34;
            break;

          case 28:
            _context3.prev = 28;
            _context3.t0 = _context3["catch"](6);
            console.log(_context3.t0);
            console.log('can not instert Demande');
            sql.close();
            return _context3.abrupt("return", 'CNID');

          case 34:
            _context3.next = 40;
            break;

          case 36:
            _context3.prev = 36;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 40:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 36], [6, 28]]);
  }));
  return _setDemandeRelex.apply(this, arguments);
}

function editDemandeRelex(_x4, _x5) {
  return _editDemandeRelex.apply(this, arguments);
} // delete demande


function _editDemandeRelex() {
  _editDemandeRelex = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(Demande, io) {
    var date_depart, date_retour;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            date_depart = Demande.date_depart + " " + Demande.heure_depart;
            date_retour = Demande.date_retour + " " + Demande.heure_retour;
            _context4.next = 5;
            return sql.connect(config);

          case 5:
            console.log(Demande);
            _context4.prev = 6;
            _context4.next = 9;
            return new sql.Request().input('destination', sql.VarChar, Demande.destination).input('objet_mission', sql.VarChar, Demande.objet_mission).input('date_depart', sql.DateTime, date_depart).input('date_retour', sql.DateTime, date_retour).input('prise_en_charge', sql.Bit, Demande.prise_en_charge).input('demande_R_ID', sql.Int, Demande.demande_R_ID).output('NID', sql.Int) //for notif
            .output('recevoir_ID', sql.VarChar) // for notif
            .input('etat', Demande.etat).output('DDATE', sql.DateTime).execute('UpdateDemandeRelex').then(function (res, err) {
              if (err) return 'CNUD';
              var Notif = {
                // notification Info 
                userID: Demande.uID,
                notification_ID: res.output.NID,
                demande_ID: Demande.demande_R_ID,
                seen: 0,
                description_notif: 'est modifé(e) la demande activité relex numéro ' + Demande.demande_R_ID,
                icon: 'hotel',
                date_notification: res.output.DDATE
              };
              io.emit("UpdateNotif" + res.output.recevoir_ID, Notif); //notifier le CD.
            });

          case 9:
            console.log('Demande updated');
            sql.close();
            return _context4.abrupt("return", 'DU');

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](6);
            console.log('can not update Demande');
            sql.close();
            return _context4.abrupt("return", 'CNUD');

          case 19:
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t1 = _context4["catch"](0);
            console.log('connection error');
            return _context4.abrupt("return", 'CNCTDB');

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 21], [6, 14]]);
  }));
  return _editDemandeRelex.apply(this, arguments);
}

function deleteDemandeRelex(_x6) {
  return _deleteDemandeRelex.apply(this, arguments);
}

function _deleteDemandeRelex() {
  _deleteDemandeRelex = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
    var res;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return sql.connect(config);

          case 3:
            _context5.prev = 3;
            console.log(id);
            _context5.next = 7;
            return new sql.Request().input('id', sql.Int, id).output('typedelete', sql.Bit).output('recevoir_ID', sql.VarChar) //for notif
            .execute('DeleteDemandeRelex');

          case 7:
            res = _context5.sent;
            sql.close();
            console.log(res);
            console.log("demande deleted");
            return _context5.abrupt("return", {
              result: "DD",
              typedelete: res.output.typedelete,
              recevoir_ID: res.output.recevoir_ID // for notif

            });

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](3);
            console.log('can not delete Demande');
            sql.close();
            return _context5.abrupt("return", 'CNDD');

          case 19:
            _context5.next = 25;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t1 = _context5["catch"](0);
            console.log('connection error');
            return _context5.abrupt("return", 'CNCTDB');

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 21], [3, 14]]);
  }));
  return _deleteDemandeRelex.apply(this, arguments);
}

module.exports = {
  getDemandesRelex: getDemandesRelex,
  getDemandeRelex: getDemandeRelex,
  setDemandeRelex: setDemandeRelex,
  editDemandeRelex: editDemandeRelex,
  deleteDemandeRelex: deleteDemandeRelex
};