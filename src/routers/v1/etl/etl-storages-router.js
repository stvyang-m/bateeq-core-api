var Router = require('restify-router').Router;
var router = new Router();
var storagesMigration = require('bateeq-module').etl.storagesMigration;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.get('/', (request, response, next) => {

    db.get().then(db => {
        var instance = new storagesMigration(db, {
            username: "etl"
        });
        instance.migrateDataStorages()
            .then(() => {
                response.send(200);
            })
    });
});

module.exports = router;
