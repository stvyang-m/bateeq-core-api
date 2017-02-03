var Router = require('restify-router').Router;
var router = new Router();
var FactPenjualanSummary = require('bateeq-module').etl.factPenjualanSummary;
var db = require('../../../db');
var SqlHelper = require('../../../sql-helper')
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';


router.get('/', (request, response, next) => {

    var mongoDbConnection = db.get();
    var sql = new SqlHelper();
    var sqlConnection = sql.startConnection();

    Promise.all([mongoDbConnection, sqlConnection])
        .then(result => {
            var _db = result[0];
            var instance = new FactPenjualanSummary(_db, {
                username: "etl"
            }, sql);

            instance.run()
                .then(() => {
                    response.send(200);
                })
        });
});

module.exports = router;
