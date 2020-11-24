require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // set new message


function setDemandeTirage(_x, _x2) {
  return _setDemandeTirage.apply(this, arguments);
} // delete message


function _setDemandeTirage() {
  _setDemandeTirage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(Data, io) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sql.connect(config);

          case 3:
            _context.prev = 3;
            console.log(Data);

            if (!(Data.UT == 'Chef departement')) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return new sql.Request().input('userID', sql.VarChar, Data.userID).input('FN', sql.VarChar, Data.OriginalFileName).input('NF', sql.Int, Data.NombreFeu).input('NE', sql.Int, Data.NombreCop).input('NTF', sql.Int, Data.NombreTot).input('TF', sql.VarChar, Data.DocTyp).input('A', sql.VarChar, Data.AutreDes).input('SFN', sql.VarChar, Data.StoringName).input('FF', sql.VarChar, Data.TypeOfFile).output('DID', sql.Int).output('DDATE', sql.DateTime).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).input('etat', sql.VarChar, 'Directeur').execute('InsertDemandeTirage').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande de tirage',
                etat: 'Directeur',
                motif: '',
                seen: 0
              }; // need to check from to

              var Notif = {
                // notification Info 
                userID: Data.userID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande de tirage',
                icon: 'print',
                date_notification: res.output.DDATE
              };
              io.emit(Data.structure + "TD", Demand); // for notification

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandD' + Data.structure, Demand);
              io.emit(Data.userID, Demand);
            });

          case 8:
            console.log('Demande Inserted');
            sql.close();
            return _context.abrupt("return", 'DI');

          case 11:
            if (!(Data.UT == 'Directeur')) {
              _context.next = 19;
              break;
            }

            _context.next = 14;
            return new sql.Request().input('userID', sql.VarChar, Data.userID).input('FN', sql.VarChar, Data.OriginalFileName).input('NF', sql.Int, Data.NombreFeu).input('NE', sql.Int, Data.NombreCop).input('NTF', sql.Int, Data.NombreTot).input('TF', sql.VarChar, Data.DocTyp).input('A', sql.VarChar, Data.AutreDes).input('SFN', sql.VarChar, Data.StoringName).input('FF', sql.VarChar, Data.TypeOfFile).output('DID', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Acceptee').execute('InsertDemandeTirage').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande de tirage',
                etat: 'Acceptee',
                motif: '',
                seen: 0
              };
              var Notif = {
                // notification Info 
                userID: Data.userID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande de tirage',
                icon: 'print',
                date_notification: res.output.DDATE
              };
              io.emit(Data.structure + "TD", Demand); // for notification

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandAT', Demand);
              io.emit(Data.userID, Demand);
            });

          case 14:
            console.log('Demande Inserted');
            sql.close();
            return _context.abrupt("return", 'DI');

          case 19:
            _context.next = 21;
            return new sql.Request().input('userID', sql.VarChar, Data.userID).input('FN', sql.VarChar, Data.OriginalFileName).input('NF', sql.Int, Data.NombreFeu).input('NE', sql.Int, Data.NombreCop).input('NTF', sql.Int, Data.NombreTot).input('TF', sql.VarChar, Data.DocTyp).input('A', sql.VarChar, Data.AutreDes).input('SFN', sql.VarChar, Data.StoringName).input('FF', sql.VarChar, Data.TypeOfFile).output('DID', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Chef Departement').execute('InsertDemandeTirage').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande de tirage',
                etat: 'Chef Departement',
                motif: '',
                seen: 0
              };
              var Notif = {
                // notification Info 
                userID: Data.userID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande de tirage',
                icon: 'print',
                date_notification: res.output.DDATE
              };
              io.emit(Data.structure + "TD", Demand); // for notification

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandCD' + Data.structure + Data.departement, Demand);
              io.emit(Data.userID, Demand);
            });

          case 21:
            console.log('Demande Inserted');
            sql.close();
            return _context.abrupt("return", 'DI');

          case 24:
            _context.next = 32;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](3);
            console.log('can not instert Demande');
            console.log(_context.t0);
            sql.close();
            return _context.abrupt("return", 'CNID');

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 34], [3, 26]]);
  }));
  return _setDemandeTirage.apply(this, arguments);
}

function deleteDemandeTirage(_x3) {
  return _deleteDemandeTirage.apply(this, arguments);
} // Get a demand


function _deleteDemandeTirage() {
  _deleteDemandeTirage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
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
            _context2.next = 6;
            return new sql.Request().input('id', sql.Int, id).output('typedelete', sql.Bit).output('recevoir_ID', sql.VarChar) //for notif
            .execute('DeleteDemandeTirage');

          case 6:
            res = _context2.sent;
            sql.close();
            console.log("demande deleted");
            return _context2.abrupt("return", {
              result: "DD",
              typedelete: res.output.typedelete,
              recevoir_ID: res.output.recevoir_ID // for notif

            });

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);
            console.log('can not delete Demande');
            sql.close();
            return _context2.abrupt("return", 'CNDD');

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19], [3, 12]]);
  }));
  return _deleteDemandeTirage.apply(this, arguments);
}

function GetDemandeTirage(_x4) {
  return _GetDemandeTirage.apply(this, arguments);
} // Edit a demand


function _GetDemandeTirage() {
  _GetDemandeTirage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var demande;
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
            return new sql.Request().input('id', sql.Int, id).execute('GetDemandeTirage');

          case 6:
            demande = _context3.sent;
            console.log("demande has been loaded");
            console.log(demande.recordset[0]);
            return _context3.abrupt("return", demande.recordset[0]);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            console.log('can not delete Demande');
            return _context3.abrupt("return", null);

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", null);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18], [3, 12]]);
  }));
  return _GetDemandeTirage.apply(this, arguments);
}

function upDemandeTirage(_x5, _x6) {
  return _upDemandeTirage.apply(this, arguments);
}

function _upDemandeTirage() {
  _upDemandeTirage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(Data, io) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            console.log(Data);
            _context4.next = 4;
            return sql.connect(config);

          case 4:
            _context4.prev = 4;
            _context4.next = 7;
            return new sql.Request().input('id', sql.Int, Data.demande_T_ID).input('NF', sql.Int, Data.nombre_feuille).input('NE', sql.Int, Data.nombre_exemplaire).input('NTF', sql.Int, Data.nombre_exemplaire * Data.nombre_feuille).input('TF', sql.VarChar, Data.type_document).input('A', sql.VarChar, Data.autre).output('NID', sql.Int) //for notif
            .output('recevoir_ID', sql.VarChar) // for notif
            .input('NO', sql.Int, Data.numero_ordre).input('DP', sql.Date, Data.date_prestation).input('etat', sql.VarChar, Data.etat).output('describ', sql.VarChar) // for notif
            .output('DDATE', sql.DateTime).execute('UpdatetDemandeTirage').then(function (res, err) {
              if (err) return 'CNUD';
              var Notif = {
                // notification Info 
                userID: Data.uID,
                notification_ID: res.output.NID,
                demande_ID: Data.demande_T_ID,
                seen: 0,
                description_notif: res.output.describ,
                icon: 'print',
                date_notification: res.output.DDATE
              };
              console.log(res);
              io.emit("UpdateNotif" + res.output.recevoir_ID, Notif); //notifier le CD.
            });

          case 7:
            console.log('Demande Inserted');
            sql.close();
            return _context4.abrupt("return", 'DE');

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](4);
            console.log('can not Edit Demande');
            console.log(_context4.t0);
            sql.close();
            return _context4.abrupt("return", 'CNED');

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t1 = _context4["catch"](0);
            console.log('connection error');
            return _context4.abrupt("return", 'CNCTDB');

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 20], [4, 12]]);
  }));
  return _upDemandeTirage.apply(this, arguments);
}

module.exports = {
  setDemandeTirage: setDemandeTirage,
  deleteDemandeTirage: deleteDemandeTirage,
  GetDemandeTirage: GetDemandeTirage,
  upDemandeTirage: upDemandeTirage
};