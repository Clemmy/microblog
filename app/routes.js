var path = require('path');
var mongoose = require('mongoose');
var multiparty = require('connect-multiparty');
var fs = require('fs');

module.exports = function (app) {

    var Blog = mongoose.model('Blog');
    var Post = mongoose.model('Post');

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.post('/api/blogs/:blog/posts', multiparty(), function(req, res, next) {
        var imgUrl = null;
        var picture = req.files.picture; // only populated when I do action = "/api/images"
        if (picture.originalFilename !== '') {
            var source = fs.createReadStream(picture.path);
            var destination = fs.createWriteStream(path.resolve('localstorage/images') + '/' + picture.originalFilename); // microblog/localstorage/images

            source.pipe(destination, {end: false});
            source.on("end", function () {
                fs.unlinkSync(picture.path);
            });
            imgUrl = "/storage/"+picture.originalFilename;
        }

        var post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        post.lastEdited = new Date();
        post.blog = req.blog; // adds reference
        post.imageUrl = imgUrl;
        console.log(post);

        post.save(function (err, post) {
            if (err) {
                return next(err);
            }
            req.blog.posts.push(post); // adds reference and saves it
            req.blog.save(function (err, blog) {
                if (err) {
                    return next(err);
                }
                res.json(post); // done
            });
        });
    });

    // GET get all blogs
    app.get('/api/blogs', function (req, res, next) {
        Blog.find(function (err, blogs) {
            if (err) {
                return next(err);
            }
            res.json(blogs);
        });
    });

    // GET get all blogs with populated posts
    app.get('/api/blogs/all', function (req, res, next) {
        Blog.find(function (err, blogs) {
            if (err) {
                return next(err);
            }
            res.json(blogs); //TODO: use promises/waterfall here
        });
    });

    // POST create a blog
    app.post('/api/blogs', function (req, res, next) {
        var blog = new Blog();
        blog.name = req.body.name;
        blog.description = req.body.description;
        blog.author = req.body.author;
        blog.posts = [];
        blog.save(function (err, post) {
            if (err) {
                return next(err);
            }
            res.json(blog);
        });
    });

    // adds blog object to req object in the next handler called
    app.param('blog', function (req, res, next, blogId) {
        var query = Blog.findById(blogId);

        query.exec(function (err, blog) {
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
    app.get('/api/blogs/:blog', function (req, res) {
        res.json(req.blog);
    });

    // GET get all posts
    app.get('/api/blogs/:blog/posts', function (req, res) {
        req.blog.populate('posts', function (err, posts) {
            res.json(req.blog.posts);
        });
    });

    // adds blog object to req object in the next handler called
    app.param('post', function (req, res, next, postId) {
        var query = Post.findById(postId);

        query.exec(function (err, post) {
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
    app.get('/api/blogs/:blog/posts/:post', function (req, res) {
        res.json(req.post);
    });

    // DELETE deletes a post by id
    app.delete('/api/blogs/:blog/posts/:post', function (req, res) {
        Post.remove({_id: req.params.post}, function (err, post) {
            if (err)
                res.send(err);
            Blog.findById(req.params.blog, function (err, blog) {
                blog.posts.pull(req.params.post);
                blog.save();
            });

            res.json({message: 'Successfully deleted post'});
        });
    });

    // DELETE deletes a blog by id
    app.delete('/api/blogs/:blog', function (req, res) {
        Blog.remove({_id: req.params.blog}, function (err, blog) {

            if (err)
                res.send(err);
            for (var i = 0; i < req.blog.posts.length; ++i) {
                Post.remove({_id: req.blog.posts[i]}), function (err, post) { //TODO: fix hanging deletes
                    console.log(err); //debug
                }
                //Post.findByIdAndRemove(req.blog.posts[i]);
            }
            res.json({message: 'Successfully deleted blog'});
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile(path.resolve('client/app/index.html'));
    });

};