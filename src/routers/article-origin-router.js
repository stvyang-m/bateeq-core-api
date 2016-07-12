var Router = require('restify-router').Router;;
var router = new Router();
var ArticleOriginManager = require('bateeq-module').article.ArticleOriginManager;
var db = require('../db');

router.get('articles/origins', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleOriginManager(db, {
            username: 'router'
        });
        
        var query = request.query;

        manager.read(query)
            .then(docs => {
                response.send(docs);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.get('articles/origins/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleOriginManager(db, {
            username: 'router'
        });
        
        var id = request.params.id;

        manager.getById(id)
            .then(doc => {
                response.send(doc);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.post('articles/origins', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleOriginManager(db, {
            username: 'router'
        });
        
        var data = request.body;

        manager.create(data)
            .then(docId => {
                response.header('Location', `articles/origins/${docId.toString()}`);
                response.send(201);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.put('articles/origins/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleOriginManager(db, {
            username: 'router'
        });
        
        var id = request.params.id;
        var data = request.body;

        manager.update(data)
            .then(docId => {
                response.send(200);
            })
            .catch(e => {
                next(e);
            })

    })
});

router.del('articles/origins/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new ArticleOriginManager(db, {
            username: 'router'
        });
        
        var id = request.params.id;
        var data = request.body;

        manager.delete(data)
            .then(docId => {
                response.send(200);
            })
            .catch(e => {
                next(e);
            })
    })
});


module.exports = router;