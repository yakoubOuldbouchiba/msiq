require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all messages.


function getDemandesVehicule() {
  return _getDemandesVehicule.apply(this, arguments);
} //getting a single demande


function _getDemandesVehicule() {
  _getDemandesVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
  return _getDemandesVehicule.apply(this, arguments);
}

function getDemandeVehicule(_x) {
  return _getDemandeVehicule.apply(this, arguments);
} // set new message


function _getDemandeVehicule() {
  _getDemandeVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
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
            return pool.request().input("id", sql.VarChar, id).execute('GetDemandeVehicule');

          case 7:
            demande = _context2.sent;
            console.log('Demande getted');
            sql.close();
            console.log(demande.recordset[0]);
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
  return _getDemandeVehicule.apply(this, arguments);
}

function setDemandeVehicule(_x2, _x3) {
  return _setDemandeVehicule.apply(this, arguments);
} // delete message


function _setDemandeVehicule() {
  _setDemandeVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(Demande, io) {
    var date_depart, date_retour, result, Demand, Notif, _result, _Demand, _Notif, _result2, _Demand2, _Notif2;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            date_depart = Demande.D.date_depart + " " + Demande.D.heure_depart;
            date_retour = Demande.D.date_retour + " " + Demande.D.heure_retour;
            console.log(Demande);
            _context3.next = 6;
            return sql.connect(config);

          case 6:
            _context3.prev = 6;

            if (!(Demande.UT == 'Chef departement')) {
              _context3.next = 20;
              break;
            }

            _context3.next = 10;
            return new sql.Request().input('userID', sql.VarChar, Demande.D.UserID).input('lieu', sql.VarChar, Demande.D.lieu).input('organisme', sql.VarChar, Demande.D.organisme).input('motif_deplacement', sql.VarChar, Demande.D.motif_deplacement).input('date_depart', sql.DateTime, date_depart).input('lieu_remmassage_d', sql.VarChar, Demande.D.lieu_ramassage_d).input('date_retour', sql.DateTime, date_retour).input('lieu_remmassage_r', sql.VarChar, Demande.D.lieu_ramassage_r).input('nature_marchandise', sql.VarChar, Demande.D.nature_marchandise).input('utilisateur1', sql.VarChar, Demande.D.utilisateur1_ID).input('utilisateur2', sql.VarChar, Demande.D.utilisateur2_ID).input('utilisateur3', sql.VarChar, Demande.D.utilisateur3_ID).output('demande_v_id', sql.Int).output('FID', sql.Int) //for notification
            .output('recevoir_ID', sql.VarChar) //for notification
            .output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Directeur').execute('InsertDemandeVehicule');

          case 10:
            result = _context3.sent;
            Demand = {
              demande_ID: result.output.demande_v_id,
              demande_Date: result.output.DDATE,
              type_demande: 'Demande véhicule',
              etat: 'Directeur',
              motif: '',
              seen: 0
            }; // check from to

            Notif = {
              // notification Info 
              userID: Demande.D.UserID,
              notification_ID: result.output.FID,
              demande_ID: result.output.demande_v_id,
              seen: 0,
              description_notif: 'est effecuté(e) une nouvelle demande véhicule',
              icon: 'commute',
              date_notification: result.output.DDATE
            };
            io.emit(Demande.structure + "VD", Demand); //notifier reporting

            io.emit("NewNotif" + result.output.recevoir_ID, Notif); //notifier le CD.

            io.emit('NewDemandD' + Demande.D.structure, Demand);
            io.emit(Demande.D.UserID, Demand);
            console.log('Demande Inserted');
            sql.close();
            return _context3.abrupt("return", {
              result: 'DI',
              demande_v_id: result.output.demande_v_id
            });

          case 20:
            if (!(Demande.UT == 'Directeur')) {
              _context3.next = 36;
              break;
            }

            _context3.next = 23;
            return new sql.Request().input('userID', sql.VarChar, Demande.D.UserID).input('lieu', sql.VarChar, Demande.D.lieu).input('organisme', sql.VarChar, Demande.D.organisme).input('motif_deplacement', sql.VarChar, Demande.D.motif_deplacement).input('date_depart', sql.DateTime, date_depart).input('lieu_remmassage_d', sql.VarChar, Demande.D.lieu_ramassage_d).input('date_retour', sql.DateTime, date_retour).input('lieu_remmassage_r', sql.VarChar, Demande.D.lieu_ramassage_r).input('nature_marchandise', sql.VarChar, Demande.D.nature_marchandise).input('utilisateur1', sql.VarChar, Demande.D.utilisateur1_ID).input('utilisateur2', sql.VarChar, Demande.D.utilisateur2_ID).input('utilisateur3', sql.VarChar, Demande.D.utilisateur3_ID).output('demande_v_id', sql.Int).output('DDATE', sql.DateTime).output('FID', sql.Int) //for notification
            .output('recevoir_ID', sql.VarChar) //for notification
            .input('etat', sql.VarChar, 'Chef de parc').execute('InsertDemandeVehicule');

          case 23:
            _result = _context3.sent;
            _Demand = {
              demande_ID: _result.output.demande_v_id,
              demande_Date: _result.output.DDATE,
              type_demande: 'Demande véhicule',
              etat: 'Chef de parc',
              motif: '',
              seen: 0
            }; // check from to

            _Notif = {
              // notification Info 
              userID: Demande.D.UserID,
              notification_ID: _result.output.FID,
              demande_ID: _result.output.demande_v_id,
              seen: 0,
              description_notif: 'est effecuté(e) une nouvelle demande véhicule',
              icon: 'commute',
              date_notification: _result.output.DDATE
            };
            io.emit(Demande.structure + "VD", _Demand); //notifier reporting

            io.emit("NewNotif" + _result.output.recevoir_ID, _Notif); //notifier le CD.

            io.emit('NewDemandCD', _Demand);
            io.emit('NewDemandCP', _Demand);
            io.emit(Demande.D.UserID, _Demand);
            console.log('Demande Inserted');
            sql.close();
            return _context3.abrupt("return", {
              result: 'DI',
              demande_v_id: _result.output.demande_v_id
            });

          case 36:
            _context3.next = 38;
            return new sql.Request().input('userID', sql.VarChar, Demande.D.UserID).input('lieu', sql.VarChar, Demande.D.lieu).input('organisme', sql.VarChar, Demande.D.organisme).input('motif_deplacement', sql.VarChar, Demande.D.motif_deplacement).input('date_depart', sql.DateTime, date_depart).input('lieu_remmassage_d', sql.VarChar, Demande.D.lieu_ramassage_d).input('date_retour', sql.DateTime, date_retour).input('lieu_remmassage_r', sql.VarChar, Demande.D.lieu_ramassage_r).input('nature_marchandise', sql.VarChar, Demande.D.nature_marchandise).input('utilisateur1', sql.VarChar, Demande.D.utilisateur1_ID).input('utilisateur2', sql.VarChar, Demande.D.utilisateur2_ID).input('utilisateur3', sql.VarChar, Demande.D.utilisateur3_ID).output('demande_v_id', sql.Int).output('DDATE', sql.DateTime).output('FID', sql.Int) //for notification
            .output('recevoir_ID', sql.VarChar) //for notification
            .input('etat', sql.VarChar, 'Chef Departement').execute('InsertDemandeVehicule');

          case 38:
            _result2 = _context3.sent;
            _Demand2 = {
              demande_ID: _result2.output.demande_v_id,
              demande_Date: _result2.output.DDATE,
              type_demande: 'Demande véhicule',
              etat: 'Chef Departement',
              motif: '',
              seen: 0
            }; // check from to

            _Notif2 = {
              // notification Info 
              userID: Demande.D.UserID,
              notification_ID: _result2.output.FID,
              demande_ID: _result2.output.demande_v_id,
              seen: 0,
              description_notif: 'est effecuté(e) une nouvelle demande véhicule',
              icon: 'commute',
              date_notification: _result2.output.DDATE
            };
            io.emit(Demande.structure + "VD", _Demand2); //notifier reporting

            io.emit("NewNotif" + _result2.output.recevoir_ID, _Notif2); //notifier le CD.

            io.emit('NewDemandCD' + Demande.D.structure + Demande.D.departement, _Demand2);
            io.emit(Demande.D.UserID, _Demand2);
            console.log('Demande Inserted');
            sql.close();
            return _context3.abrupt("return", {
              result: 'DI',
              demande_v_id: _result2.output.demande_v_id
            });

          case 48:
            _context3.next = 56;
            break;

          case 50:
            _context3.prev = 50;
            _context3.t0 = _context3["catch"](6);
            console.log(_context3.t0);
            console.log('can not instert Demande');
            sql.close();
            return _context3.abrupt("return", 'CNID');

          case 56:
            _context3.next = 62;
            break;

          case 58:
            _context3.prev = 58;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 62:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 58], [6, 50]]);
  }));
  return _setDemandeVehicule.apply(this, arguments);
}

function deleteDemandeVehicule(_x4) {
  return _deleteDemandeVehicule.apply(this, arguments);
} // edit demande


function _deleteDemandeVehicule() {
  _deleteDemandeVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    var res;
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
            return new sql.Request().input('id', sql.Int, id).output('typedelete', sql.Bit).output('recevoir_ID', sql.VarChar) //for notif
            .execute('DeleteDemandeVehicule');

          case 7:
            res = _context4.sent;
            sql.close();
            console.log("demande deleted");
            return _context4.abrupt("return", {
              result: "DD",
              typedelete: res.output.typedelete,
              recevoir_ID: res.output.recevoir_ID // for notif

            });

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](3);
            console.log('can not delete Demande');
            sql.close();
            return _context4.abrupt("return", 'CNDD');

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
    }, _callee4, null, [[0, 20], [3, 13]]);
  }));
  return _deleteDemandeVehicule.apply(this, arguments);
}

function editDemandeVehicule(_x5, _x6) {
  return _editDemandeVehicule.apply(this, arguments);
}

function _editDemandeVehicule() {
  _editDemandeVehicule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(Demande, io) {
    var date_depart, date_retour, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            date_depart = Demande.date_depart + " " + Demande.heure_depart;
            date_retour = Demande.date_retour + " " + Demande.heure_retour;
            _context5.next = 5;
            return sql.connect(config);

          case 5:
            _context5.prev = 5;
            console.log(Demande);
            console.log(date_depart);
            console.log(date_retour);
            _context5.next = 11;
            return new sql.Request().input('demande_v_id', sql.Int, Demande.demande_V_ID).input('lieu', sql.VarChar, Demande.lieu).input('organisme', sql.VarChar, Demande.organisme).input('motif_deplacement', sql.VarChar, Demande.motif_deplacement).input('date_depart', sql.DateTime, date_depart).input('lieu_remmassage_d', sql.VarChar, Demande.lieu_ramassage_d).input('date_retour', sql.DateTime, date_retour).input('lieu_remmassage_r', sql.VarChar, Demande.lieu_ramassage_r).input('nature_marchandise', sql.VarChar, Demande.nature_marchandise).input('utilisateur1', sql.VarChar, Demande.utilisateur1_ID).input('utilisateur2', sql.VarChar, Demande.utilisateur2_ID).input('utilisateur3', sql.VarChar, Demande.utilisateur3_ID).input('matricule', sql.VarChar, Demande.matricule).input('CID', sql.Int, Demande.chauffeur_ID).input('Observ', sql.VarChar, Demande.observation).output('NID', sql.Int) //for notif
            .output('recevoir_ID', sql.VarChar) // for notif
            .input('etat', sql.VarChar, Demande.etat).output('DDATE', sql.DateTime).execute('UpdateDemandeVehicule').then(function (res, err) {
              if (err) return 'CNUD';
              var Notif = {
                // notification Info 
                userID: Demande.uID,
                notification_ID: res.output.NID,
                demande_ID: Demande.demande_V_ID,
                seen: 0,
                description_notif: 'est modifé(e) la demande véhicule numéro ' + Demande.demande_V_ID,
                icon: 'commute',
                date_notification: res.output.DDATE
              };
              io.emit("UpdateNotif" + res.output.recevoir_ID, Notif); //notifier le CD.
            });

          case 11:
            result = _context5.sent;
            console.log('Demande Inserted');
            sql.close();
            return _context5.abrupt("return", 'DU');

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](5);
            console.log(_context5.t0);
            console.log('can not instert Demande');
            sql.close();
            return _context5.abrupt("return", 'CNUD');

          case 23:
            _context5.next = 29;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t1 = _context5["catch"](0);
            console.log('connection error');
            return _context5.abrupt("return", 'CNCTDB');

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 25], [5, 17]]);
  }));
  return _editDemandeVehicule.apply(this, arguments);
}

module.exports = {
  getDemandesVehicule: getDemandesVehicule,
  getDemandeVehicule: getDemandeVehicule,
  setDemandeVehicule: setDemandeVehicule,
  editDemandeVehicule: editDemandeVehicule,
  deleteDemandeVehicule: deleteDemandeVehicule
};