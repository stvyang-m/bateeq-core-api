var Router = require('restify-router').Router;
var router = new Router();
var map = require('bateeq-module').merchandiser.map;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");
var passport = require('../../../passports/jwt-passport');
var FinishedGoodsManager = require('bateeq-module').master.FinishedGoodsManager;
var fs = require('fs');
var csv = require('fast-csv');

const apiVersion = '1.0.0';
//router.post('/', passport, (request, response, next) => {
router.post('/', (request, response, next) => {
    var dateFormat = "DD MMM YYYY";
    var locale = 'id-ID';
    var moment = require('moment');
    moment.locale(locale);

    db.get().then(db => {


        db.collection("migration.log").insert({
            name: "uploadTest3",
            data: {
                "db" : "method entered",
                dateFormat : dateFormat,
                locale : locale
            }
        });

        var dataCsv = [];
        var dataAll;
        // var manager = new FinishedGoodsManager(db, request.user);
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });


        db.collection("migration.log").insert({
            name: "uploadTest2",
            data: {
                "1": request.files.fileUpload.path
            }
        });

        fs.createReadStream(request.files.fileUpload.path)
            .pipe(csv())
            .on('data', function (data) {
                dataCsv.push(data);
            })
            .on('end', function (data) {
                dataAll = dataCsv;

                /*
                    Test only
                 */

                db.collection("migration.log").insert({
                    name: "uploadTest",
                    data: dataAll
                });

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
                            var error = resultFormatter.fail(apiVersion, 111, e);
                            response.send(111, error);
                        })
                } else {
                    var error = resultFormatter.fail(apiVersion, 401, "");
                    response.send(401, error);
                }
            })
            .on("error", (err) => {
                db.collection("migration.log").insert({
                    name: "uploadTestError",
                    data: {
                        err
                    }
                });
                var error = resultFormatter.fail(apiVersion, 123, e);
                response.send(123, err);
            });
    })
});

module.exports = router;