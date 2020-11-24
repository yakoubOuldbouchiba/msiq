require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // set new message


function setDemandePriseEnCharge(_x, _x2) {
  return _setDemandePriseEnCharge.apply(this, arguments);
} // delete message


function _setDemandePriseEnCharge() {
  _setDemandePriseEnCharge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(Data, io) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sql.connect(config);

          case 3:
            _context.prev = 3;

            if (!(Data.UT == 'Chef departement')) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return new sql.Request().input('userID', sql.VarChar, Data.D.UserID).input('Col1_ID', sql.VarChar, typeof Data.D.Collegues[0] == 'undefined' ? null : Data.D.Collegues[0]).input('Col2_ID', sql.VarChar, typeof Data.D.Collegues[1] == 'undefined' ? null : Data.D.Collegues[1]).input('Col3_ID', sql.VarChar, typeof Data.D.Collegues[2] == 'undefined' ? null : Data.D.Collegues[2]).input('Col4_ID', sql.VarChar, typeof Data.D.Collegues[3] == 'undefined' ? null : Data.D.Collegues[3]).input('Col5_ID', sql.VarChar, typeof Data.D.Collegues[4] == 'undefined' ? null : Data.D.Collegues[4]).input('Dest', sql.VarChar, Data.D.destination).input('Objet', sql.VarChar, Data.D.objet_mission).input('SD', sql.DateTimeOffset, Data.D.startDate).input('ED', sql.DateTimeOffset, Data.D.EndDate).input('MDT', sql.VarChar, Data.D.moyen_transport).input('A', sql.VarChar, Data.D.aeroport).input('HV', sql.VarChar, Data.D.heureDeVol).output('DID', sql.Int).output('DDATE', sql.DateTime).output('FID', sql.Int) //For notif
            .output('recevoir_ID', sql.VarChar) //For notif
            .input('etat', sql.VarChar, 'Directeur').execute('InsertDemandePriseEnCharge').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande de prise en charge',
                etat: 'Directeur',
                motif: '',
                seen: 0
              }; // i have to check from to

              var Notif = {
                // notification Info 
                userID: Data.D.UserID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande de prise en charge',
                icon: 'flight',
                date_notification: res.output.DDATE
              };
              io.emit(Data.D.structure + "PD", Demand); //for reporting 

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandD' + Data.D.structure, Demand);
              io.emit(Data.D.UserID, Demand);
            });

          case 7:
            console.log('Demande Inserted');
            sql.close();
            return _context.abrupt("return", 'DI');

          case 12:
            if (!(Data.UT == 'Directeur')) {
              _context.next = 20;
              break;
            }

            _context.next = 15;
            return new sql.Request().input('userID', sql.VarChar, Data.D.UserID).input('Col1_ID', sql.VarChar, typeof Data.D.Collegues[0] == 'undefined' ? null : Data.D.Collegues[0]).input('Col2_ID', sql.VarChar, typeof Data.D.Collegues[1] == 'undefined' ? null : Data.D.Collegues[1]).input('Col3_ID', sql.VarChar, typeof Data.D.Collegues[2] == 'undefined' ? null : Data.D.Collegues[2]).input('Col4_ID', sql.VarChar, typeof Data.D.Collegues[3] == 'undefined' ? null : Data.D.Collegues[3]).input('Col5_ID', sql.VarChar, typeof Data.D.Collegues[4] == 'undefined' ? null : Data.D.Collegues[4]).input('Dest', sql.VarChar, Data.D.destination).input('Objet', sql.VarChar, Data.D.objet_mission).input('SD', sql.DateTimeOffset, Data.D.startDate).input('ED', sql.DateTimeOffset, Data.D.EndDate).input('MDT', sql.VarChar, Data.D.moyen_transport).input('A', sql.VarChar, Data.D.aeroport).input('HV', sql.VarChar, Data.D.heureDeVol).output('DID', sql.Int).output('FID', sql.Int) //For notif
            .output('recevoir_ID', sql.VarChar) //For notif
            .output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Acceptee').execute('InsertDemandePriseEnCharge').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande de prise en charge',
                etat: 'Acceptee',
                motif: '',
                seen: 0
              }; // i have to check from to

              var Notif = {
                // notification Info 
                userID: Data.D.UserID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande de prise en charge',
                icon: 'flight',
                date_notification: res.output.DDATE
              };
              io.emit(Data.structure + "PD", Demand); //for reporting 

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandRPEC', Demand);
              io.emit(Data.D.UserID, Demand);
            });

          case 15:
            console.log('Demande Inserted');
            sql.close();
            return _context.abrupt("return", 'DI');

          case 20:
            _context.next = 22;
            return new sql.Request().input('userID', sql.VarChar, Data.D.UserID).input('Col1_ID', sql.VarChar, typeof Data.D.Collegues[0] == 'undefined' ? null : Data.D.Collegues[0]).input('Col2_ID', sql.VarChar, typeof Data.D.Collegues[1] == 'undefined' ? null : Data.D.Collegues[1]).input('Col3_ID', sql.VarChar, typeof Data.D.Collegues[2] == 'undefined' ? null : Data.D.Collegues[2]).input('Col4_ID', sql.VarChar, typeof Data.D.Collegues[3] == 'undefined' ? null : Data.D.Collegues[3]).input('Col5_ID', sql.VarChar, typeof Data.D.Collegues[4] == 'undefined' ? null : Data.D.Collegues[4]).input('Dest', sql.VarChar, Data.D.destination).input('Objet', sql.VarChar, Data.D.objet_mission).input('SD', sql.DateTimeOffset, Data.D.startDate).input('ED', sql.DateTimeOffset, Data.D.EndDate).input('MDT', sql.VarChar, Data.D.moyen_transport).input('A', sql.VarChar, Data.D.aeroport).input('HV', sql.VarChar, Data.D.heureDeVol).output('DID', sql.Int).output('FID', sql.Int) //For notif
            .output('recevoir_ID', sql.VarChar) //For notif
            .output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Chef Departement').execute('InsertDemandePriseEnCharge').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande de prise en charge',
                etat: 'Chef Departement',
                motif: '',
                seen: 0
              }; // i have to check from to

              var Notif = {
                // notification Info 
                userID: Data.D.UserID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande de prise en charge',
                icon: 'flight',
                date_notification: res.output.DDATE
              };
              io.emit(Data.structure + "PD", Demand); //for reporting 

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandCD' + Data.D.structure + Data.D.departement, Demand);
              io.emit(Data.D.UserID, Demand);
            });

          case 22:
            console.log('Demande Inserted');
            sql.close();
            return _context.abrupt("return", 'DI');

          case 25:
            _context.next = 33;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](3);
            console.log('can not instert Demande');
            console.log(_context.t0);
            sql.close();
            return _context.abrupt("return", 'CNID');

          case 33:
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 35], [3, 27]]);
  }));
  return _setDemandePriseEnCharge.apply(this, arguments);
}

function deleteDemandePriseEnCharge(_x3) {
  return _deleteDemandePriseEnCharge.apply(this, arguments);
} //Get Demand


function _deleteDemandePriseEnCharge() {
  _deleteDemandePriseEnCharge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sql.connect(config);

          case 3:
            _context2.prev = 3;
            console.log(id);
            _context2.next = 7;
            return new sql.Request().input('id', sql.Int, id).output('typedelete', sql.Bit).output('recevoir_ID', sql.VarChar) //for notif
            .execute('DeleteDemandePEC');

          case 7:
            res = _context2.sent;
            sql.close();
            console.log("demande deleted");
            return _context2.abrupt("return", {
              result: "DD",
              typedelete: res.output.typedelete,
              recevoir_ID: res.output.recevoir_ID // for notif

            });

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](3);
            console.log('can not delete Demande');
            sql.close();
            return _context2.abrupt("return", 'CNDD');

          case 18:
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 20], [3, 13]]);
  }));
  return _deleteDemandePriseEnCharge.apply(this, arguments);
}

function GetDemandePriseEnCharge(_x4) {
  return _GetDemandePriseEnCharge.apply(this, arguments);
} //Get Demand


function _GetDemandePriseEnCharge() {
  _GetDemandePriseEnCharge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var Demande;
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
            return new sql.Request().input('id', sql.Int, id).execute('GetDemandePEC');

          case 6:
            Demande = _context3.sent;
            console.log('Your demande has been loaded');
            console.log(Demande.recordset[0]);
            return _context3.abrupt("return", Demande.recordset[0]);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            return _context3.abrupt("return", null);

          case 15:
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t1 = _context3["catch"](0);
            return _context3.abrupt("return", null);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 17], [3, 12]]);
  }));
  return _GetDemandePriseEnCharge.apply(this, arguments);
}

function UpdateDemandePriseEnCharge(_x5, _x6) {
  return _UpdateDemandePriseEnCharge.apply(this, arguments);
}

function _UpdateDemandePriseEnCharge() {
  _UpdateDemandePriseEnCharge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(Data, io) {
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
            return new sql.Request().input('id', sql.VarChar, Data.demande_P_ID).input('Col1_ID', sql.VarChar, typeof Data.Collegues[0] == 'undefined' ? null : Data.Collegues[0]).input('Col2_ID', sql.VarChar, typeof Data.Collegues[1] == 'undefined' ? null : Data.Collegues[1]).input('Col3_ID', sql.VarChar, typeof Data.Collegues[2] == 'undefined' ? null : Data.Collegues[2]).input('Col4_ID', sql.VarChar, typeof Data.Collegues[3] == 'undefined' ? null : Data.Collegues[3]).input('Col5_ID', sql.VarChar, typeof Data.Collegues[4] == 'undefined' ? null : Data.Collegues[4]).input('Dest', sql.VarChar, Data.destination).input('Objet', sql.VarChar, Data.objet_mission).input('SD', sql.DateTimeOffset, Data.startDate).input('ED', sql.DateTimeOffset, Data.EndDate).input('MDT', sql.VarChar, Data.moyen_transport).input('A', sql.VarChar, Data.aeroport).input('HV', sql.VarChar, Data.heureDeVol).output('NID', sql.Int) //for notif
            .output('recevoir_ID', sql.VarChar) // for notif
            .input('etat', sql.VarChar, Data.etat) // for notif
            .output('DDATE', sql.DateTime).execute('UpdateDemandePEC').then(function (res, err) {
              if (err) return 'CNUD';
              var Notif = {
                // notification Info 
                userID: Data.uID,
                notification_ID: res.output.NID,
                demande_ID: Data.demande_P_ID,
                seen: 0,
                description_notif: 'est modifé(e) la demande de prise en charge numéro ' + Data.demande_P_ID,
                icon: 'flight',
                date_notification: res.output.DDATE
              };
              io.emit("UpdateNotif" + res.output.recevoir_ID, Notif); //notifier le CD.
            });

          case 6:
            console.log('Demande Edited');
            return _context4.abrupt("return", 'DE');

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](3);
            console.log('Can not edite demande');
            console.log(_context4.t0);
            return _context4.abrupt("return", 'CNED');

          case 15:
            _context4.next = 21;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t1 = _context4["catch"](0);
            console.log('Can not connect');
            return _context4.abrupt("return", 'CNCTDB');

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 17], [3, 10]]);
  }));
  return _UpdateDemandePriseEnCharge.apply(this, arguments);
}

module.exports = {
  setDemandePriseEnCharge: setDemandePriseEnCharge,
  deleteDemandePriseEnCharge: deleteDemandePriseEnCharge,
  GetDemandePriseEnCharge: GetDemandePriseEnCharge,
  UpdateDemandePriseEnCharge: UpdateDemandePriseEnCharge
};