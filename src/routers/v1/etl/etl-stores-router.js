var Router = require('restify-router').Router;
var router = new Router();
var storesMigration = require('bateeq-module').etl.storesMigration;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.get('/', (request, response, next) => {

    db.get().then(db => {
        var instance = new storesMigration(db, {
            username: "etl"
        });
        instance.migrateDataStores()
            .then(() => {
                response.send(200);
            })
    });
});

module.exports = router;
