var Router = require('restify-router').Router;;
var router = new Router();
var ArticleBrandManager = require('bateeq-module').core.article.ArticleBrandManager;
var db = require('../../../../db');
var resultFormatter = require("../../../../result-formatter");

const apiVersion = '1.0.0';

router.get('v1/core/articles/brands', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleBrandManager(db, {
            username: 'router'
        });

        var query = request.query;

        manager.read(query)
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

router.get('v1/core/articles/brands/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleBrandManager(db, {
            username: 'router'
        });

        var id = request.params.id;

        manager.getById(id)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.post('v1/core/articles/brands', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleBrandManager(db, {
            username: 'router'
        });

        var data = request.body;

        manager.create(data)
            .then(docId => {
                response.header('Location', `articles/brands/${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })

    })
});

router.put('v1/core/articles/brands/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleBrandManager(db, {
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
            })

    })
});

router.del('v1/core/articles/brands/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleBrandManager(db, {
            username: 'router'
        });

        var id = request.params.id;
        var data = request.body;

        manager.delete(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});


module.exports = router;