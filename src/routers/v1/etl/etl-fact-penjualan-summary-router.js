var Router = require('restify-router').Router;
var router = new Router();
var FactPenjualanSummary = require('bateeq-module').etl.factPenjualanSummary;
var db = require('../../../db');
var SqlHelper = require('../../../sql-helper')
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';


router.get('/', (request, response, next) => {

    var mongoDbConnection = db.get();
    // var sql = new SqlHelper();
    var sqlConnection = SqlHelper.startConnection();

    Promise.all([mongoDbConnection, sqlConnection])
        .then(result => {
            var _db = result[0];
            var instance = new FactPenjualanSummary(_db, {
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

router.get('/:startDate/:endDate', (request, response, next) => {

    var mongoDbConnection = db.get();
    // var sql = new SqlHelper();
    var sqlConnection = SqlHelper.startConnection();
    var startDate = request.params.startDate;
    var endDate = request.params.endDate;

    Promise.all([mongoDbConnection, sqlConnection])
        .then(result => {
            var _db = result[0];
            var instance = new FactPenjualanSummary(_db, {
                username: "etl"
            }, SqlHelper, startDate, endDate);

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
