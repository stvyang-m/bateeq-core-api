'use strict';

var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');

var passport = require('passport');
var server = restify.createServer();
 

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
// var brandRouter = require('./src/routers/v1/core/article/article-brand-router');
// brandRouter.applyRoutes(server);

// var categoryRouter = require('./src/routers/v1/core/article/article-category-router');
// categoryRouter.applyRoutes(server);

// var counterRouter = require('./src/routers/v1/core/article/article-counter-router');
// counterRouter.applyRoutes(server);

// var materialRouter = require('./src/routers/v1/core/article/article-material-router');
// materialRouter.applyRoutes(server);

// var motifRouter = require('./src/routers/v1/core/article/article-motif-router');
// motifRouter.applyRoutes(server);

// var originRouter = require('./src/routers/v1/core/article/article-origin-router');
// originRouter.applyRoutes(server);

// var seasonRouter = require('./src/routers/v1/core/article/article-season-router');
// seasonRouter.applyRoutes(server);

// var themeRouter = require('./src/routers/v1/core/article/article-theme-router');
// themeRouter.applyRoutes(server);

// var typeRouter = require('./src/routers/v1/core/article/article-type-router');
// typeRouter.applyRoutes(server);

// var variantRouter = require('./src/routers/v1/core/article/article-variant-router');
// variantRouter.applyRoutes(server);

// var articleRouter = require('./src/routers/v1/core/article/article-router');
// articleRouter.applyRoutes(server);

// var moduleRouter = require('./src/routers/v1/core/module-router');
// moduleRouter.applyRoutes(server);

var bankRouter = require('./src/routers/v1/master/bank-router');
bankRouter.applyRoutes(server, "v1/master/banks");

var cardTypeRouter = require('./src/routers/v1/master/card-type-router');
cardTypeRouter.applyRoutes(server, "v1/master/card-types");

var uploadFinishedGoodsRouter = require('./src/routers/v1/master/upload-finished-goods-router');
uploadFinishedGoodsRouter.applyRoutes(server, "v1/master/upload/finished-goods");

var finishedGoodsRouter = require('./src/routers/v1/master/finished-goods-router');
finishedGoodsRouter.applyRoutes(server, "v1/master/items/finished-goods");

var materialRouter = require('./src/routers/v1/master/material-router');
materialRouter.applyRoutes(server, "v1/master/items/materials");

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

var port = process.env.VCAP_APP_PORT || process.env.PORT || 3000;

var host = process.env.VCAP_APP_HOST || process.env.IP || "0.0.0.0";

server.listen(port, host);
console.log(`server created at ${host}:${port}`);

//server.listen(process.env.PORT, process.env.IP);
//console.log(`server created at ${process.env.IP}:${process.env.PORT}`);
