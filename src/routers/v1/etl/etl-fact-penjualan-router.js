var Router = require('restify-router').Router;
var router = new Router();
var FactPenjualan = require('bateeq-module').etl.factPenjualan;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';


router.get('/', (request, response, next) => {

    db.get().then(db => {
        var instance = new FactPenjualan(db, {
            username: "etl"
        });

        instance.run()
            .then(() => {
                response.send(200);
            })
    });
});

module.exports = router;
