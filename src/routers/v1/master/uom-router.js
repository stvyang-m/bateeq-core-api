var Manager = require("bateeq-module").master.UomManager;
var JwtRouterFactory = require("../jwt-router-factory");
const apiVersion = '1.0.0';

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "unit": 1
        }
    });
    return router;
}
module.exports = getRouter;