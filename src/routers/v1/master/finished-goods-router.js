var Router = require('restify-router').Router;
var router = new Router();
var FinishedGoodsManager = require('bateeq-module').master.FinishedGoodsManager;
var db = require('../../../db');
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.get('/', (request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });

        var query = request.query;

        manager.read(query)
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.get('/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });

        var id = request.params.id;

        manager.getSingleById(id)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.get('/code/:code', (request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });
        var query = request.query;
        var code = request.params.code;
        var query = request.query;
        query.filter = {
            'code': code
        };
        manager.read(query)
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    });
});

router.get('/ro/:ro',(request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });
        var query = request.query;
        var ro = request.params.ro;
        query.filter = {
            'article.realizationOrder': ro
        };

        manager.read(query)
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    });
});

router.post('/', (request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });

        var data = request.body;

        manager.create(data)
            .then(docId => {
                response.header('Location', `/finished-goods/${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.put('/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });

        var id = request.params.id;
        var data = request.body;

        manager.update(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.del('/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new FinishedGoodsManager(db, {
            username: 'router'
        });

        var id = request.params.id;
        manager.getSingleById(id)
            .then((doc) => {
                var result;
                if (!doc) {
                    result = resultFormatter.fail(apiVersion, 404, new Error("data not found"));
                    response.send(400, error);
                }
                else {
                    return manager.delete(doc)
                        .then((docId) => {
                            result = resultFormatter.ok(apiVersion, 204);
                            response.send(204, result);
                        });
                }
            });
    });
});


module.exports = router;