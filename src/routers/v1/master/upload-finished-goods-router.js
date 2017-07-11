var Router = require('restify-router').Router;
var router = new Router();
var map = require('bateeq-module').merchandiser.map;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");
var passport = require('../../../passports/jwt-passport');
var FinishedGoodsManager = require('bateeq-module').master.FinishedGoodsManager;
var fs = require('fs');
var csv = require('fast-csv');
var PkgCloudHelper = require('../../../pkg-cloud-helper')

const apiVersion = '1.0.0';
router.post('/', passport, (request, response, next) => {
    // router.post('/', (request, response, next) => {
    var dateFormat = "DD MMM YYYY";
    var locale = 'id-ID';
    var moment = require('moment');
    moment.locale(locale);

    db.get().then(db => {
        var dataCsv = [];
        var dataAll;
        // var manager = new FinishedGoodsManager(db, request.user);
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });

        fs.createReadStream(request.files.fileUpload.path)
            .pipe(csv())
            .on('data', function (data) {
                dataCsv.push(data);
            })
            .on('end', function (data) {
                dataAll = dataCsv;
                if (dataAll[0][0] === "Barcode" && dataAll[0][1] === "Nama" && dataAll[0][2] === "UOM" && dataAll[0][3] === "Size" && dataAll[0][4] === "HPP" && dataAll[0][5] === "Harga Jual (Domestic)" && dataAll[0][6] === "Harga Jual (Internasional)" && dataAll[0][7] === "RO") {
                    manager.insert(dataAll)
                        .then(doc => {
                            if (doc[0]["Error"] === undefined) {
                                var result = resultFormatter.ok(apiVersion, 201, doc);
                                response.send(201, result);
                            }
                            else {
                                var options = {
                                    "Barcode": "string",
                                    "Nama": "string",
                                    "UOM": "string",
                                    "Size": "string",
                                    "HPP": "string",
                                    "Harga Jual (Domestic)": "string",
                                    "Harga Jual (Internasional)": "string",
                                    "RO": "string",
                                    "Error": "string"
                                };
                                response.xls(`Error Log-Produk${moment(new Date()).format(dateFormat)}.xlsx`, doc, options);

                            }
                        })
                        .catch(e => {
                            var error = resultFormatter.fail(apiVersion, 500, e);
                            response.send(500, error);
                        })
                } else {
                    var error = resultFormatter.fail(apiVersion, 401, "");
                    response.send(401, error);
                }
            })
            .on("error", (err) => {
                var error = resultFormatter.fail(apiVersion, 500, e);
                response.send(500, err);
            });
    })
});


router.post('/image/', (request, response, next) => {
    var dateFormat = "DD MMM YYYY";
    var locale = 'id-ID';
    var moment = require('moment');
    moment.locale(locale);


    db.get().then(db => {

        // console.log(request.files.imageUpload);
        // console.log(request.files.motifUpload);

        var colorCode = request.body["colorCode"];
        var articleColor = request.body["article-color"];
        var products = request.body["products"];

        var uploadHelper = require('../../../upload-helper')
        PkgCloudHelper.getStorageClient()
            .then((storageClient) => {
                var uploadFileProcess = [];
                uploadFileProcess.push(uploadHelper.uploadFile(request.files.imageUpload, storageClient, "bateeq-product-image"));
                // uploadFileProcess.push(uploadHelper.uploadFile(request.files.motifUpload, storageClient, "bateeq-motif-image"));
                Promise.all(uploadFileProcess)
                    .then((results) => {
                        var result = resultFormatter.ok(apiVersion, 200, results);
                        response.send(200, result);
                    })
                    .catch((errorResults) => {
                        var error = resultFormatter.fail(apiVersion, 500, errorResults);
                        response.send(500, error);
                    });
            })
            .catch((err) => {
                var error = resultFormatter.fail(apiVersion, 500, errorResults);
                response.send(500, error);
            });
    });
});


router.post('/product-image/', (request, response, next) => {

    db.get().then(db => {

        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });


        var data = request.body;


        manager.updateImage(data)
            .then(updateResults => {
                var result = resultFormatter.ok(apiVersion, 201, updateResults);
                response.send(201, result);
            })
            .catch(updateErrors => {
                var error = resultFormatter.fail(apiVersion, 400, updateErrors);
                response.send(400, error);
            });
    });
});

module.exports = router;