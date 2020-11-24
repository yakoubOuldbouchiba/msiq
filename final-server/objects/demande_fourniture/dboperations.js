require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var config = require('../../config/dbconfig.js');

var sql = require('mssql'); // getting all demande.


function getDemandeFourniture(_x) {
  return _getDemandeFourniture.apply(this, arguments);
} // set new demande


function _getDemandeFourniture() {
  _getDemandeFourniture = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var pool, demande;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log(id);
            _context.next = 4;
            return sql.connect(config);

          case 4:
            pool = _context.sent;
            _context.prev = 5;
            _context.next = 8;
            return pool.request().input("demande_f_id", sql.Int, id).execute('GetObjetOftDemandeFourniture');

          case 8:
            demande = _context.sent;
            console.log('Demande getted');
            sql.close();
            console.log(demande.recordset);
            return _context.abrupt("return", {
              result: 'DG',
              //Demand inserted
              demande: demande.recordset
            });

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](5);
            console.log('can not Get Demande');
            sql.close();
            return _context.abrupt("return", 'CNGD');

          case 20:
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](0);
            console.log('connection error');
            return _context.abrupt("return", 'CNCTDB');

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 22], [5, 15]]);
  }));
  return _getDemandeFourniture.apply(this, arguments);
}

function setDemandeFourniture(_x2, _x3) {
  return _setDemandeFourniture.apply(this, arguments);
} //edit demande


function _setDemandeFourniture() {
  _setDemandeFourniture = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(Demande, io) {
    var objets, notification_ID, demande_id, i, objet, Demand, Notif, _objets, _notification_ID, _demande_id, _i, _objet, _Demand, _Notif, _objets2, _notification_ID2, _demande_id2, _i2, _objet2, _Demand2, _Notif2;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sql.connect(config);

          case 3:
            _context2.prev = 3;
            console.log(Demande);

            if (!(Demande.UT == 'Chef departement')) {
              _context2.next = 28;
              break;
            }

            _context2.next = 8;
            return new sql.Request().input('userID', sql.VarChar, Demande.userID).output('demande_id', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Directeur').execute('InsertDemandeFourniture');

          case 8:
            objets = _context2.sent;
            notification_ID = objets.output.FID;
            demande_id = objets.output.demande_id; //id of demande insert it 

            i = 0;

          case 12:
            if (!(i < Demande.objetsDemande.length)) {
              _context2.next = 19;
              break;
            }

            objet = Demande.objetsDemande[i];
            _context2.next = 16;
            return new sql.Request().input('demande_id', sql.Int, demande_id).input('code_objet', sql.VarChar, objet.code_object).input('qty_demande', sql.Int, objet.qty_demande).execute('InserObjetOftDemandeFourniture');

          case 16:
            i++;
            _context2.next = 12;
            break;

          case 19:
            Demand = {
              //  for the WorkFlow
              demande_ID: objets.output.demande_id,
              demande_Date: objets.output.DDATE,
              type_demande: 'Demande fourniture',
              etat: 'Directeur',
              motif: '',
              seen: 0
            };
            Notif = {
              // notification Info 
              userID: Demande.userID,
              notification_ID: notification_ID,
              demande_ID: demande_id,
              seen: 0,
              description_notif: 'est effecuté(e) une nouvelle demande fourniture',
              icon: 'edit'
            };
            console.log(Notif); //io.emit(Demande.struct+"FD" , Demand )//for repporting 

            io.emit("NewNotif" + objets.output.recevoir_ID, Notif); //notifier le CD.

            io.emit(Demande.userID, Demand);
            io.emit('NewDemandD' + Demande.structure, Demand);
            console.log('Demande Inserted');
            sql.close();
            return _context2.abrupt("return", 'DI');

          case 28:
            if (!(Demande.UT == 'Directeur')) {
              _context2.next = 53;
              break;
            }

            _context2.next = 31;
            return new sql.Request().input('userID', sql.VarChar, Demande.userID).output('demande_id', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'DAM').execute('InsertDemandeFourniture');

          case 31:
            _objets = _context2.sent;
            _notification_ID = _objets.output.FID;
            _demande_id = _objets.output.demande_id; //id of demande insert it 

            _i = 0;

          case 35:
            if (!(_i < Demande.objetsDemande.length)) {
              _context2.next = 42;
              break;
            }

            _objet = Demande.objetsDemande[_i];
            _context2.next = 39;
            return new sql.Request().input('demande_id', sql.Int, _demande_id).input('code_objet', sql.VarChar, _objet.code_object).input('qty_demande', sql.Int, _objet.qty_demande).execute('InserObjetOftDemandeFourniture');

          case 39:
            _i++;
            _context2.next = 35;
            break;

          case 42:
            _Demand = {
              //  for the WorkFlow
              demande_ID: _objets.output.demande_id,
              demande_Date: _objets.output.DDATE,
              type_demande: 'Demande fourniture',
              etat: 'DAM',
              motif: '',
              seen: 0
            };
            _Notif = {
              // notification Info 
              userID: Demande.userID,
              notification_ID: _notification_ID,
              demande_ID: _demande_id,
              seen: 0,
              description_notif: 'est effecuté(e) une nouvelle demande fourniture',
              icon: 'edit'
            };
            console.log(_Notif); //io.emit(Demande.struct+"FD" , Demand )//for repporting 

            io.emit("NewNotif" + _objets.output.recevoir_ID, _Notif); //notifier le CD.

            io.emit(Demande.userID, _Demand);
            io.emit('NewDemandRD', _Demand);
            console.log('Demande Inserted');
            sql.close();
            return _context2.abrupt("return", 'DI');

          case 53:
            _context2.next = 55;
            return new sql.Request().input('userID', sql.VarChar, Demande.userID).output('demande_id', sql.Int).output('FID', sql.Int).output('recevoir_ID', sql.VarChar).output('DDATE', sql.DateTime).input('etat', sql.VarChar, 'Chef Departement').execute('InsertDemandeFourniture');

          case 55:
            _objets2 = _context2.sent;
            _notification_ID2 = _objets2.output.FID;
            _demande_id2 = _objets2.output.demande_id; //id of demande insert it 

            _i2 = 0;

          case 59:
            if (!(_i2 < Demande.objetsDemande.length)) {
              _context2.next = 66;
              break;
            }

            _objet2 = Demande.objetsDemande[_i2];
            _context2.next = 63;
            return new sql.Request().input('demande_id', sql.Int, _demande_id2).input('code_objet', sql.VarChar, _objet2.code_object).input('qty_demande', sql.Int, _objet2.qty_demande).execute('InserObjetOftDemandeFourniture');

          case 63:
            _i2++;
            _context2.next = 59;
            break;

          case 66:
            _Demand2 = {
              //  for the WorkFlow
              demande_ID: _objets2.output.demande_id,
              demande_Date: _objets2.output.DDATE,
              type_demande: 'Demande fourniture',
              etat: 'Chef Departement',
              motif: '',
              seen: 0
            };
            _Notif2 = {
              // notification Info 
              userID: Demande.userID,
              notification_ID: _notification_ID2,
              demande_ID: _demande_id2,
              seen: 0,
              description_notif: 'est effecuté(e) une nouvelle demande fourniture',
              icon: 'edit'
            };
            console.log(_Notif2); //io.emit(Demande.struct+"FD" , Demand )//for repporting 

            io.emit("NewNotif" + _objets2.output.recevoir_ID, _Notif2); //notifier le CD.

            io.emit(Demande.userID, _Demand2);
            io.emit('NewDemandCD' + Demande.structure + Demande.departement, _Demand2);
            console.log('Demande Inserted');
            sql.close();
            return _context2.abrupt("return", 'DI');

          case 75:
            _context2.next = 83;
            break;

          case 77:
            _context2.prev = 77;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            console.log('can not instert Demande');
            sql.close();
            return _context2.abrupt("return", 'CNID');

          case 83:
            _context2.next = 89;
            break;

          case 85:
            _context2.prev = 85;
            _context2.t1 = _context2["catch"](0);
            console.log('connection error');
            return _context2.abrupt("return", 'CNCTDB');

          case 89:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 85], [3, 77]]);
  }));
  return _setDemandeFourniture.apply(this, arguments);
}

function editDemandeFourniture(_x4, _x5) {
  return _editDemandeFourniture.apply(this, arguments);
} // delete demande


function _editDemandeFourniture() {
  _editDemandeFourniture = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(Demande, io) {
    var res, Notif, i, objet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return sql.connect(config);

          case 3:
            _context3.prev = 3;
            console.log(Demande);
            _context3.next = 7;
            return new sql.Request().input('demande_id', sql.Int, Demande.demande_id) //notifier le CD.)
            .output('NID', sql.Int) //for notif
            .output('recevoir_ID', sql.VarChar) // for notif
            .input('etat', sql.VarChar, Demande.objetsDemande[0].etat).execute('deleteObjetOftDemandeFourniture');

          case 7:
            res = _context3.sent;
            //id of demande insert it 
            Notif = {
              // notification Info 
              userID: Demande.uID,
              notification_ID: res.output.NID,
              demande_ID: Demande.demande_id,
              seen: 0,
              description_notif: 'est modifé(e) la demande fourniture numéro ' + Demande.demande_id,
              icon: 'edit'
            };
            io.emit("UpdateNotif" + res.output.recevoir_ID, Notif); //notifier le CD.

            i = 0;

          case 11:
            if (!(i < Demande.objetsDemande.length)) {
              _context3.next = 18;
              break;
            }

            objet = Demande.objetsDemande[i];
            _context3.next = 15;
            return new sql.Request().input('demande_id', sql.Int, Demande.demande_id).input('code_objet', sql.VarChar, objet.code_object).input('qty_demande', sql.Int, objet.qty_demande).execute('InserObjetOftDemandeFourniture');

          case 15:
            i++;
            _context3.next = 11;
            break;

          case 18:
            console.log('Demande updated');
            sql.close();
            return _context3.abrupt("return", 'DU');

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            console.log('can not update Demande');
            sql.close();
            return _context3.abrupt("return", 'CNUD');

          case 29:
            _context3.next = 35;
            break;

          case 31:
            _context3.prev = 31;
            _context3.t1 = _context3["catch"](0);
            console.log('connection error');
            return _context3.abrupt("return", 'CNCTDB');

          case 35:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 31], [3, 23]]);
  }));
  return _editDemandeFourniture.apply(this, arguments);
}

function deleteDemandeFourniture(_x6) {
  return _deleteDemandeFourniture.apply(this, arguments);
}

function _deleteDemandeFourniture() {
  _deleteDemandeFourniture = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
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
            .execute('deleteDemandeFourniture');

          case 7:
            res = _context4.sent;
            sql.close();
            console.log("demande deleted");
            return _context4.abrupt("return", {
              result: "DD",
              typedelete: res.output.typedelete,
              recevoir_ID: res.output.recevoir_ID
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
  return _deleteDemandeFourniture.apply(this, arguments);
}

module.exports = {
  getDemandeFourniture: getDemandeFourniture,
  setDemandeFourniture: setDemandeFourniture,
  editDemandeFourniture: editDemandeFourniture,
  deleteDemandeFourniture: deleteDemandeFourniture
};