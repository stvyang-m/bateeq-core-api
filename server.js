var restify = require('restify');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var originRouter = require('./src/routers/article-origin-router');
originRouter.applyRoutes(server);

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)