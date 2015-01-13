var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    lastEdited: Date,
    content: String,
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    imageUrl: String
});

mongoose.model('Post', PostSchema);