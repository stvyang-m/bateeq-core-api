var Manager = require("bateeq-module").master.SupplierManager;
var JwtRouterFactory = require("../jwt-router-factory");
const apiVersion = '1.0.0';
function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "name": 1
        }
    });
    return router;
}
module.exports = getRouter;