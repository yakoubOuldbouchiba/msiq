require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // get a Demande client 


function getDemandeClient(_x) {
  return _getDemandeClient.apply(this, arguments);
} // set new message


function _getDemandeClient() {
  _getDemandeClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var pool, demande;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return sql.connect(config);

          case 3:
            pool = _context.sent;
            _context.prev = 4;
            _context.next = 7;
            return pool.request().input("id", sql.VarChar, id).execute('GetDemandeClient');

          case 7:
            demande = _context.sent;
            console.log(demande.recordset[0]);
            console.log('Demande has been loaded');
            sql.close();
            return _context.abrupt("return", {
              result: 'DG',
              //Demand inserted
              demande: demande.recordset[0]
            });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](4);
            console.log('can not Get Demande');
            sql.close();
            return _context.abrupt("return", 'CNGD');

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21], [4, 14]]);
  }));
  return _getDemandeClient.apply(this, arguments);
}

function setDemandeClient(_x2, _x3) {
  return _setDemandeClient.apply(this, arguments);
} // delete message


function _setDemandeClient() {
  _setDemandeClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(O, io) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(O);
            _context2.next = 4;
            return sql.connect(config);

          case 4:
            _context2.prev = 4;
            console.log(O.D);

            if (!(O.UT == 'Chef departement')) {
              _context2.next = 11;
              break;
            }

            _context2.next = 9;
            return new sql.Request().input('userID', sql.VarChar, O.D.UserID).input('nature', sql.VarChar, O.D.nature).input('objet', sql.VarChar, O.D.objet).input('etat', sql.VarChar, 'Directeur').input('description', sql.VarChar, O.D.demande_C_description).output('DID', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).execute('InsertDemandeClient').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande client',
                etat: 'Directeur',
                motif: '',
                seen: 0
              }; //check from to 

              var Notif = {
                // notification Info 
                userID: O.D.UserID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande client',
                icon: 'devices',
                date_notification: res.output.DDATE
              };
              io.emit(O.D.structure + "CD", Demand); //for reporting

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandD' + O.D.structure, Demand);
              io.emit(O.D.UserID, Demand);
            });

          case 9:
            _context2.next = 18;
            break;

          case 11:
            if (!(O.UT == 'Directeur')) {
              _context2.next = 16;
              break;
            }

            _context2.next = 14;
            return new sql.Request().input('userID', sql.VarChar, O.D.UserID).input('nature', sql.VarChar, O.D.nature).input('objet', sql.VarChar, O.D.objet).input('etat', sql.VarChar, 'DAM').input('description', sql.VarChar, O.D.demande_C_description).output('DID', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).execute('InsertDemandeClient').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande client',
                etat: 'DAM',
                motif: '',
                seen: 0
              }; //check from to 

              var Notif = {
                // notification Info 
                userID: O.D.UserID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande client',
                icon: 'devices',
                date_notification: res.output.DDATE
              };
              io.emit(O.D.structure + "CD", Demand); //for reporting

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandRD', Demand);
              io.emit(O.D.UserID, Demand);
            });

          case 14:
            _context2.next = 18;
            break;

          case 16:
            _context2.next = 18;
            return new sql.Request().input('userID', sql.VarChar, O.D.UserID).input('nature', sql.VarChar, O.D.nature).input('objet', sql.VarChar, O.D.objet).input('etat', sql.VarChar, 'Chef Departement').input('description', sql.VarChar, O.D.demande_C_description).output('DID', sql.Int).output('DDATE', sql.DateTime).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).execute('InsertDemandeClient').then(function (res, err) {
              if (err) return 'CNID';
              var Demand = {
                demande_ID: res.output.DID,
                demande_Date: res.output.DDATE,
                type_demande: 'Demande client',
                etat: 'Chef Departement',
                motif: '',
                seen: 0
              }; //check from to 

              var Notif = {
                // notification Info 
                userID: O.D.UserID,
                notification_ID: res.output.FID,
                demande_ID: res.output.DID,
                seen: 0,
                description_notif: 'est effecuté(e) une nouvelle demande client',
                icon: 'devices',
                date_notification: res.output.DDATE
              };
              io.emit(O.D.structure + "CD", Demand); //for reporting

              io.emit("NewNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

              io.emit('NewDemandCD' + O.D.structure + O.D.departement, Demand);
              io.emit(O.D.UserID, Demand);
            });

          case 18:
            console.log('Demande Inserted');
            sql.close();
            return _context2.abrupt("return", 'DI');

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](4);
            console.log('can not instert Demande');
            console.log(_context2.t0);
            sql.close();
            return _context2.abrupt("return", 'CNID');

          case 29:
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 31], [4, 23]]);
  }));
  return _setDemandeClient.apply(this, arguments);
}

function deleteDemandeClient(_x4) {
  return _deleteDemandeClient.apply(this, arguments);
} // set new message


function _deleteDemandeClient() {
  _deleteDemandeClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
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
            return new sql.Request().input('id', sql.Int, id).output('typedelete', sql.Bit).output('recevoir_ID', sql.VarChar) //for notif
            .execute('DeleteDemandeClient');

          case 7:
            res = _context3.sent;
            sql.close();
            console.log(res);
            console.log("demande deleted");
            return _context3.abrupt("return", {
              result: "DD",
              typedelete: res.output.typedelete,
              recevoir_ID: res.output.recevoir_ID
            });

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            console.log('can not delete Demande');
            sql.close();
            return _context3.abrupt("return", 'CNDD');

          case 19:
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21], [3, 14]]);
  }));
  return _deleteDemandeClient.apply(this, arguments);
}

function updateDemandeClient(_x5, _x6) {
  return _updateDemandeClient.apply(this, arguments);
}

function _updateDemandeClient() {
  _updateDemandeClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(Demande, io) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return sql.connect(config);

          case 3:
            _context4.prev = 3;
            console.log(Demande);
            _context4.next = 7;
            return new sql.Request().input('demande_C_ID', sql.Int, Demande.demande_C_ID).input('nature', sql.VarChar, Demande.nature).input('objet', sql.VarChar, Demande.objet).input('des', sql.VarChar, Demande.demande_C_description).input('MED', sql.Bit, Demande.mise_disposition).input('DMED', sql.Date, Demande.date_mise_dispostion).input('achat', sql.Bit, Demande.achat).input('nAchat', sql.Int, Demande.nAchat).input('Dachat', sql.Date, Demande.date_achat).input('oAchat', sql.VarChar, Demande.oAchats).input('etat', sql.VarChar, Demande.etat).output('NID', sql.Int) //for notif
            .output('recevoir_ID', sql.VarChar) // for notif
            .output('DDATE', sql.DateTime).execute('updateDemandeClient').then(function (res, err) {
              if (err) return 'CNUD';
              var Notif = {
                // notification Info 
                userID: Demande.utilisateurs_ID,
                notification_ID: res.output.NID,
                demande_ID: Demande.demande_C_ID,
                seen: 0,
                description_notif: 'est modifé(e) la demande client numéro ' + Demande.demande_C_ID,
                icon: 'devices',
                date_notification: res.output.DDATE
              };
              console.log(Notif);
              io.emit("UpdateNotif" + res.output.recevoir_ID, Notif); //notifier le CD.
            });

          case 7:
            console.log('Demande Updated');
            sql.close();
            return _context4.abrupt("return", 'DU');

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            console.log('can not update Demande');
            sql.close();
            return _context4.abrupt("return", 'CNUD');

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
    }, _callee4, null, [[0, 20], [3, 12]]);
  }));
  return _updateDemandeClient.apply(this, arguments);
}

module.exports = {
  setDemandeClient: setDemandeClient,
  deleteDemandeClient: deleteDemandeClient,
  getDemandeClient: getDemandeClient,
  updateDemandeClient: updateDemandeClient
};