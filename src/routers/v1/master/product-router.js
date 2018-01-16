var Manager = require("bateeq-module").master.ProductManager;
var JwtRouterFactory = require("../jwt-router-factory");
const apiVersion = '1.0.0';
function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "code": 1
        }
    });
    return router;
}
module.exports = getRouter;