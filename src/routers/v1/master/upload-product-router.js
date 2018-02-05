var Router = require("restify-router").Router;
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");
var passport = require("../../../passports/jwt-passport");
var fs = require('fs');
var csv = require('fast-csv');
var ProductManager = require('bateeq-module').master.ProductManager;
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
            var manager = new ProductManager(db, {
                username: 'router'
            });

            fs.createReadStream(request.files.fileUpload.path)
                .pipe(csv())
                .on('data', function (data) {
                    dataCsv.push(data);
                })
                .on('end', function (data) {
                    dataAll = dataCsv;
                    if (dataAll[0][0] === "Kode Barang" && dataAll[0][1] === "Nama Barang" && dataAll[0][2] === "Satuan" && dataAll[0][3] === "Mata Uang" && dataAll[0][4] === "Harga" &&  dataAll[0][5] === "Tags" &&  dataAll[0][6] === "Keterangan") {
                        manager.insert(dataAll)
                            .then(doc => {
                                if (doc[0]["Error"] === undefined) {
                                    var result = resultFormatter.ok(apiVersion, 201, doc);
                                    response.send(201, result);
                                }
                                else {
                                    var product = [];
                                    for (var item of doc) {
                                        var _item = {
                                            "Kode Barang": item.code,
                                            "Nama Barang": item.name,
                                            "Satuan": item.uom,
                                            "Mata Uang": item.currency,
                                            "Harga": item.price,
                                            "Tags":item.tags,
                                            "Keterangan": item.description,
                                            "Error": item.Error
                                        }
                                        product.push(_item);
                                    }
                                    var options = {
                                        "Kode Barang": "string",
                                        "Nama Barang": "string",
                                        "Satuan": "string",
                                        "Mata Uang": "string",
                                        "Harga": "string",
                                        "Tags":"string",
                                        "Keterangan": "string",
                                        "Error": "string"
                                    };
                                    response.xls(`Error Log-barang ${moment(new Date()).format(dateFormat)}.xlsx`, product, options);

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