var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var brandRouter = require('./src/routers/v1/core/article/article-brand-router');
brandRouter.applyRoutes(server);

var categoryRouter = require('./src/routers/v1/core/article/article-category-router');
categoryRouter.applyRoutes(server);

var counterRouter = require('./src/routers/v1/core/article/article-counter-router');
counterRouter.applyRoutes(server);

var materialRouter = require('./src/routers/v1/core/article/article-material-router');
materialRouter.applyRoutes(server);

var motifRouter = require('./src/routers/v1/core/article/article-motif-router');
motifRouter.applyRoutes(server);

var originRouter = require('./src/routers/v1/core/article/article-origin-router');
originRouter.applyRoutes(server);

var seasonRouter = require('./src/routers/v1/core/article/article-season-router');
seasonRouter.applyRoutes(server);

var themeRouter = require('./src/routers/v1/core/article/article-theme-router');
themeRouter.applyRoutes(server);

var typeRouter = require('./src/routers/v1/core/article/article-type-router');
typeRouter.applyRoutes(server);

var variantRouter = require('./src/routers/v1/core/article/article-variant-router');
variantRouter.applyRoutes(server);

var articleRouter = require('./src/routers/v1/core/article/article-router');
articleRouter.applyRoutes(server);

var moduleRouter = require('./src/routers/v1/core/module-router');
moduleRouter.applyRoutes(server);


var supplierRouter = require('./src/routers/v1/core/supplier-router');
supplierRouter.applyRoutes(server);

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)