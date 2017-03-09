var Router = require('restify-router').Router;
var router = new Router();
var DimBranch = require('bateeq-module').etl.dimBranch;
var DimTime = require('bateeq-module').etl.dimTime;
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

            var arrInstance = [];

            arrInstance.push(new DimBranch(_db, {
                username: "etl"
            }, SqlHelper));
            arrInstance.push(new DimTime(_db, {
                username: "etl"
            }, SqlHelper));

            var etlProcess = [];
            for (var i in arrInstance) {
                etlProcess.push(arrInstance[i].run());
            }

            Promise.all(etlProcess)
                .then(() => {
                    response.send(200);
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        });
});

module.exports = router;
