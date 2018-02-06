var Router = require("restify-router").Router;
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");
var passport = require("../../../passports/jwt-passport");
var fs = require('fs');
var csv = require('fast-csv');
var SupplierManager = require('bateeq-module').master.SupplierManager;
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.post('/', (request, response, next) => {
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);

        db.get().then(db => {
            var dataCsv = [];
            var dataAll;
            var manager = new SupplierManager(db, {
                username: 'router'
            });

            fs.createReadStream(request.files.fileUpload.path)
                .pipe(csv())
                .on('data', function (data) {
                    dataCsv.push(data);
                })
                .on('end', function (data) {
                    dataAll = dataCsv;
                    if (dataAll[0][0] === "Kode" && dataAll[0][1] === "Nama Supplier" && dataAll[0][2] === "Alamat" && dataAll[0][3] === "Kontak" && dataAll[0][4] === "PIC" && dataAll[0][5] === "Import" && dataAll[0][6] === "NPWP" && dataAll[0][7] === "Serial Number") {
                        manager.insert(dataAll)
                            .then(doc => {
                                if (doc[0]["Error"] === undefined) {
                                    var result = resultFormatter.ok(apiVersion, 201, doc);
                                    response.send(201, result);
                                }
                                else {
                                    var supplier = [];
                                    for (var item of doc) {
                                        var _item = {
                                            "Kode": item.code,
                                            "Nama Supplier": item.name,
                                            "Alamat": item.address,
                                            "Kontak": item.contact,
                                            "PIC": item.PIC,
                                            "Import": item.import,
                                            "NPWP": item.NPWP,
                                            "Serial Number": item.serialNumber,
                                            "Error": item.Error
                                        }
                                        supplier.push(_item);
                                    }
                                    var options = {
                                        "Kode": "string",
                                        "Nama Supplier": "string",
                                        "Alamat": "string",
                                        "Kontak": "string",
                                        "PIC": "string",
                                        "Import": "string",
                                        "NPWP": "string",
                                        "Serial Number": "string",
                                        "Error": "string"
                                    };
                                    response.xls(`Error Log-supplier ${moment(new Date()).format(dateFormat)}.xlsx`, supplier, options);

                                }
                            })
                            .catch(e => {
                                var error = resultFormatter.fail(apiVersion, 404, e);
                                response.send(404, error);
                            })
                    } else {
                        var error = resultFormatter.fail(apiVersion, 404, "");
                        response.send(404, error);

                    }
                });
        })
    });
    return router;
}

module.exports = getRouter;