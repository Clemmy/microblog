var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    lastEdited: String,
    date: Date,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});

mongoose.model('Post', PostSchema);