var Router = require('restify-router').Router;
var router = new Router();
var SalesMigration = require('bateeq-module').etl.salesMigration;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';


router.get('/', (request, response, next) => {

    db.get().then(db => {
        var branch = request.params.branch;
        var start = request.params.between;
        var end = request.params.and;
        var instance = new SalesMigration(db, {
            username: "etl"
        });

        instance.getDataSales(branch, start, end)

            .then(() => {
                response.send(200);
            })
    });
});

module.exports = router;
