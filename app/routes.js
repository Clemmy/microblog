var path = require('path');
var mongoose = require('mongoose');

module.exports = function(app) {

    var Blog = mongoose.model('Blog');
    var Post = mongoose.model('Post');

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/nerds', function(req, res) {
        //res.send('hey');
        //res.end();
        res.json({ message: 'hooray! welcome to our api!' });
    });

    app.get('/api/blogs', function(req, res, next) {
        Blog.find(function(err, blogs){
            if(err){ return next(err); }

            res.json(blogs);
        });
    });



    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
            res.sendFile(path.resolve('client/app/index.html'));
    });

};