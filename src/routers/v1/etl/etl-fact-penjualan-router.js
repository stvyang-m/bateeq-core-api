var Router = require('restify-router').Router;
var router = new Router();
var FactPenjualan = require('bateeq-module').etl.factPenjualan;
var db = require('../../../db');
var SqlHelper = require('../../../sql-helper')
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';


router.get('/', (request, response, next) => {
    var mongoDbConnection = db.get();
    var sqlConnection = SqlHelper.startConnection();

    Promise.all([mongoDbConnection, sqlConnection])
        .then(result => {
            var _db = result[0];
            var instance = new FactPenjualan(_db, {
                username: "etl"
            }, SqlHelper);

            instance.run()
                .then(() => {
                    response.send(200);
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
        });
});

module.exports = router;
