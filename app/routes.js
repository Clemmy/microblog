var path = require('path');
var mongoose = require('mongoose');

module.exports = function(app) {

    var Blog = mongoose.model('Blog');
    var Post = mongoose.model('Post');

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // GET get all blogs
    app.get('/api/blogs', function(req, res, next) {
        Blog.find(function(err, blogs){
            if (err) {
                return next(err);
            }
            res.json(blogs);
        });
    });

    // POST create a blog
    app.post('/api/blogs', function(req, res, next) {
        var blog = new Blog();
        blog.name = req.body.name;
        blog.description = req.body.description;
        blog.author = req.body.author;
        blog.posts = [];
        blog.save(function(err, post) {
            if (err) {
                return next(err);
            }
            res.json(blog);
        });
    });

    // adds blog object to req object in the next handler called
    app.param('blog', function(req, res, next, blogId) {
        var query = Blog.findById(blogId);

        query.exec(function (err, blog){
            if (err) {
                return next(err);
            }
            if (!blog) {
                return next(new Error("Cannot find blog"));
            }
            req.blog = blog;
            return next();
        });
    });

    // GET get a blog by id
    app.get('/api/blogs/:blog', function(req, res) {
        res.json(req.blog);
    });

    // POST create a post
    app.post('/api/blogs/:blog/posts', function(req, res, next) {
        var post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        post.lastEdited = new Date();
        //post.blog = { type : req.blog._id };
        post.blog = req.blog; // adds reference

        post.save(function(err, post){
            if (err) {
                return next(err);
            }
            req.blog.posts.push(post); // adds reference and saves it
            req.blog.save(function(err, blog) {
                if (err) {
                    return next(err);
                }
                res.json(post);
            });
        });
    });

    // GET get all posts
    app.get('/api/blogs/:blog/posts', function(req, res, next) {
        req.blog.populate('posts', function(err, posts) {
            res.json(req.blog.posts);
        });
    });

    // adds blog object to req object in the next handler called
    app.param('post', function(req, res, next, postId) {
        var query = Post.findById(postId);

        query.exec(function (err, post){
            if (err) {
                return next(err);
            }
            if (!post) {
                return next(new Error("Cannot find post"));
            }
            req.post = post;
            return next();
        });
    });

    // GET get a post by id
    app.get('/api/blogs/:blog/posts/:post', function(req, res) {
        res.json(req.post);
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
            res.sendFile(path.resolve('client/app/index.html'));
    });

};