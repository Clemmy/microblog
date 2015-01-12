var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

mongoose.model('Blog', BlogSchema);