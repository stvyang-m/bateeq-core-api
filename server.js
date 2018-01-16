'use strict';

var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');

var passport = require('passport');
var server = restify.createServer();

var json2xls = require('json2xls');
server.use(json2xls.middleware);

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    headers: ['Content-Disposition']
}));

server.use(passport.initialize());
server.use(function (request, response, next) {
    var query = request.query;
    query.order = !query.order ? {} : JSON.parse(query.order);
    query.filter = !query.filter ? {} : JSON.parse(query.filter);
    request.queryInfo = query;
    next();
});
var motifRouter = require('./src/routers/v1/core/article/article-motif-router');
motifRouter.applyRoutes(server);

var materialRouter = require('./src/routers/v1/core/article/article-material-router');
materialRouter.applyRoutes(server);

var categoryRouter = require('./src/routers/v1/core/article/article-category-router');
categoryRouter.applyRoutes(server, 'v1/master/categories');

var seasonRouter = require('./src/routers/v1/core/article/article-season-router');
seasonRouter.applyRoutes(server);

var counterRouter = require('./src/routers/v1/core/article/article-counter-router');
counterRouter.applyRoutes(server);

var subCounterRouter = require('./src/routers/v1/core/article/article-sub-counter-router');
subCounterRouter.applyRoutes(server);

var collectionRouter = require('./src/routers/v1/core/article/article-collection-router');
collectionRouter.applyRoutes(server);

var subCollectionRouter = require('./src/routers/v1/core/article/article-sub-collection-router');
subCollectionRouter.applyRoutes(server);

var materialCompositionRouter = require('./src/routers/v1/core/article/article-material-composition-router');
materialCompositionRouter.applyRoutes(server);

var subMaterialCompositionRouter = require('./src/routers/v1/core/article/article-sub-material-composition-router');
subMaterialCompositionRouter.applyRoutes(server);

var processRouter = require('./src/routers/v1/core/article/article-process-router');
processRouter.applyRoutes(server);

var subProcessRouter = require('./src/routers/v1/core/article/article-sub-process-router');
subProcessRouter.applyRoutes(server);

var colorRouter = require('./src/routers/v1/core/article/article-color-router');
colorRouter.applyRoutes(server);

var typeRouter = require('./src/routers/v1/core/article/article-type-router');
typeRouter.applyRoutes(server);

var rangeDiscProductRouter = require('./src/routers/v1/master/range-disc-product-router');
rangeDiscProductRouter.applyRoutes(server, "v1/master/range-disc-products");

var bankRouter = require('./src/routers/v1/master/bank-router');
bankRouter.applyRoutes(server, "v1/master/banks");

var unitRouter = require('./src/routers/v1/master/unit-router');
unitRouter.applyRoutes(server, "v1/master/units");

var cardTypeRouter = require('./src/routers/v1/master/card-type-router');
cardTypeRouter.applyRoutes(server, "v1/master/card-types");

var uploadFinishedGoodsRouter = require('./src/routers/v1/master/upload-finished-goods-router');
uploadFinishedGoodsRouter.applyRoutes(server, "v1/master/upload");

var finishedGoodsRouter = require('./src/routers/v1/master/finished-goods-router');
finishedGoodsRouter.applyRoutes(server, "v1/master/items/finished-goods");

var itemRouter = require('./src/routers/v1/master/item-router');
itemRouter.applyRoutes(server, "v1/master/items");

var moduleRouter = require('./src/routers/v1/master/module-router');
moduleRouter.applyRoutes(server, "v1/master/modules");

var storageRouter = require('./src/routers/v1/master/storage-router');
storageRouter.applyRoutes(server, "v1/master/storages");

var storeRouter = require('./src/routers/v1/master/store-router');
storeRouter.applyRoutes(server, "v1/master/stores");

var supplierRouter = require('./src/routers/v1/master/supplier-router');
supplierRouter.applyRoutes(server, "v1/master/suppliers");

var expeditionServiceRouter = require('./src/routers/v1/master/expedition-service-router');
expeditionServiceRouter.applyRoutes(server, "v1/master/expedition-service-routers");

var powerBiReportRouter = require('./src/routers/v1/core/power-bi-report-router');
powerBiReportRouter.applyRoutes(server, "/v1/core/power-bi/reports");

var itemsSpMigrationRouter = require('./src/routers/v1/etl/etl-item-router');
itemsSpMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/items");

var itemsMigrationRouter = require('./src/routers/v1/etl/etl-sp-item-router');
itemsMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/sp-items");

var salesMigrationRouter = require('./src/routers/v1/etl/etl-sales-router');
salesMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/sales");

var storesMigrationRouter = require('./src/routers/v1/etl/etl-stores-router');
storesMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/stores");

var storagesMigrationRouter = require('./src/routers/v1/etl/etl-storages-router');
storagesMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/storages");

var salesSpMigrationRouter = require('./src/routers/v1/etl/etl-sp-sales-router');
salesSpMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/sp-sales");

var itemMigrationRouter = require('./src/routers/v1/etl/etl-item');
itemMigrationRouter.applyRoutes(server, "/v1/etl/migrations/sql2mongo/item");

var etlFactPenjualanRouter = require('./src/routers/v1/etl/etl-fact-penjualan-router');
etlFactPenjualanRouter.applyRoutes(server, "/v1/etl/fact-penjualan");

var etlFactPenjualanSummaryRouter = require('./src/routers/v1/etl/etl-fact-penjualan-summary-router');
etlFactPenjualanSummaryRouter.applyRoutes(server, "/v1/etl/fact-penjualan-summary");

var etlDimBranch = require('./src/routers/v1/etl/etl-dim-branch-router');
etlDimBranch.applyRoutes(server, "/v1/etl/dim-branch");

var etlDim = require('./src/routers/v1/etl/etl-dim-router');
etlDim.applyRoutes(server, "/v1/etl/dim");

var etlUpdateProduct = require('./src/routers/v1/etl/etl-update-products');
etlUpdateProduct.applyRoutes(server, "/v1/etl/update-product");

let designTrackingBoardRouter = require('./src/routers/v1/manufacture/design-tracking-board-router');
designTrackingBoardRouter().applyRoutes(server, "v1/manufacture/design-tracking-boards");

let designTrackingStageRouter = require('./src/routers/v1/manufacture/design-tracking-stage-router');
designTrackingStageRouter().applyRoutes(server, "v1/manufacture/design-tracking-stages");

let designTrackingDesignRouter = require('./src/routers/v1/manufacture/design-tracking-design-router');
designTrackingDesignRouter().applyRoutes(server, "v1/manufacture/design-tracking-designs");

let designTrackingActivityRouter = require('./src/routers/v1/manufacture/design-tracking-activity-router');
designTrackingActivityRouter().applyRoutes(server, "v1/manufacture/design-tracking-activities");

let designTrackingReasonRouter = require('./src/routers/v1/master/design-tracking-reason-router');
designTrackingReasonRouter().applyRoutes(server, "v1/master/design-tracking-reasons");

var budgetRouter = require('./src/routers/v1/master/budget-router');
budgetRouter().applyRoutes(server, 'v1/master/budgets');

var productRouter = require("./src/routers/v1/master/product-router");
productRouter().applyRoutes(server, 'v1/master/products');

var port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;

var host = process.env.VCAP_APP_HOST || process.env.IP || "0.0.0.0";

server.listen(port, host);
console.log(`server created at ${host}:${port}`); 
