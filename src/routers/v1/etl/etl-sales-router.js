var Router = require('restify-router').Router;
var router = new Router();
var SalesMigration = require('bateeq-module').etl.salesMigration;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.get('/', (request, response, next) => {

    db.get().then(db => {
        var instance = new SalesMigration(db, {
            username: "etl"
        });
        instance.migrate()
            .then(() => {
                response.send(200);
            })
    });
});

module.exports = router;
