require("core-js/modules/es.array.join");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

require("regenerator-runtime/runtime");

var _asyncToGenerator = require("C:/Users/Yak/Desktop/MSIQ/msiq-v-1.0.0/node_modules/@babel/runtime/helpers/asyncToGenerator");

var express = require("express");

var router = express.Router();

var multer = require('multer');

var dbOperationsDemandeTirage = require('../../objects/DemandeTirage/dboperations');

var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './FilesTirage/');
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().toISOString().split(':').join('_') + file.originalname);
  }
});
var upload = multer({
  storage: storage
});

module.exports = function (io) {
  //this part the get the fie 
  router.post('/DemandeTirage', upload.single('FileData'), function (req, res) {
    console.log(req.file);
    var infoToSend = {
      userID: req.body.UserID,
      OriginalFileName: req.file.originalname,
      StoringName: req.file.filename,
      TypeOfFile: req.file.mimetype,
      DocTyp: req.body.DocType,
      AutreDes: req.body.AutreDes,
      NombreFeu: req.body.NombreFeuilles.substring(1, req.body.NombreFeuilles.length - 1),
      NombreCop: req.body.NombreCopies.substring(1, req.body.NombreCopies.length - 1),
      NombreTot: req.body.NombreTot,
      UT: req.body.UT,
      departement: req.body.departement,
      structure: req.body.structure
    };
    console.log(infoToSend);
    dbOperationsDemandeTirage.setDemandeTirage(infoToSend, io).then(function (result) {
      if (result === 'DI') {
        res.status(200).json({
          title: 'Voter demande de tirage a été envoyée'
        });
      } else if (result === 'CNID') {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
          error: 'CNID'
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          error: 'CNCTDB'
        });
      }
    });
  }); // delete a demande

  router.delete('/DemandeTirage/:id/:struct', function (req, res) {
    jwt.verify(req.headers.authorization || req.headers['Authorization'], 'TMPK3Y', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, decoded) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (err) {
                  res.status(500).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB'
                  });
                }

                ;
                dbOperationsDemandeTirage.deleteDemandeTirage(req.params.id).then(function (result) {
                  if (result.result === 'DD') {
                    io.emit("DeleteNofit" + result.recevoir_ID, req.params.id); //for notif CD

                    if (result.typedelete) {
                      io.emit(req.params.struct + "DTD");
                    }

                    res.status(200).json({
                      title: 'Votre demande tirage a été supprimée'
                    });
                  } else if (result === 'CNDD') {
                    res.status(401).json({
                      title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                      error: 'CNIU'
                    });
                  } else {
                    res.status(401).json({
                      title: 'Quelque chose s\'est mal passé dans le serveur',
                      error: 'CNCTDB'
                    });
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }); //Get a demand

  router.get('/DemandeTirage/:id', function (req, res) {
    dbOperationsDemandeTirage.GetDemandeTirage(req.params.id).then(function (result) {
      if (!!result) {
        res.status(200).json({
          title: 'Votre demande tirage a été chargée',
          demande: result
        });
      } else {
        res.status(401).json({
          title: 'Quelque chose s\'est mal passé dans le serveur',
          error: 'CNCTDB'
        });
      }
    });
  }); //update demand

  router.post('/UpdateDemandeTirage', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return dbOperationsDemandeTirage.upDemandeTirage(req.body, io).then(function (result) {
                if (result === 'DE') {
                  res.status(200).json({
                    title: 'Voter demande de tirage a été modifier'
                  });
                } else if (result === 'CNED') {
                  res.status(401).json({
                    title: 'Quelque chose s\'est mal passé. Veuillez verifier vous données',
                    error: 'CNED'
                  });
                } else {
                  res.status(401).json({
                    title: 'Quelque chose s\'est mal passé dans le serveur',
                    error: 'CNCTDB'
                  });
                }
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.get('/DownloadFile', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  return router;
};