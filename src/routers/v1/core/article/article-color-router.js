var Router = require('restify-router').Router;;
var router = new Router();
var ArticleColorManager = require('bateeq-module').master.article.ArticleColorManager;
var db = require('../../../../db');
var resultFormatter = require("../../../../result-formatter");

const apiVersion = '1.0.0';

router.get('v1/core/articles/colors', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleColorManager(db, {
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

router.get('v1/core/articles/colors/all', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleColorManager(db, {
            username: 'router'
        });

        manager.readAll()
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

router.get('v1/core/articles/colors/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleColorManager(db, {
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
            })

    })
});

router.get('v1/core/articles/colors/code/:code', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleColorManager(db, {
            username: 'router'
        });

        var code = request.params.code;
        var query = {
            "code": code
        }

        manager.getSingleByQuery(query)
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

module.exports = router;