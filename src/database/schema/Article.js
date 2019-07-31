const mongoose = require('mongoose');
const xss = require('xss');
const { Schema } = mongoose;

let ObjectId = Schema.Types.ObjectId;

const articleSchema = new Schema({
    UserId: ObjectId,
    title: {
        unique: false,
        type: String
    },
    content: {
        unique: false,
        type: String
    },
    author: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

articleSchema.pre('save', function(next) {
    this.title = xss(this.title);
    this.content = xss(this.content);
    next();
});

mongoose.model('Article', articleSchema);