var Router = require('restify-router').Router;
var router = new Router();
var ItemMigration = require('bateeq-module').etl.itemsMigration;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.get('/', (request, response, next) => {
    ItemMigration.migrateDataItems()
        .then(() => {
            response.send(200);
        })
});
