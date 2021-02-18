const dateFormat = require('../utils/dateFormat');
const { Schema, model, Types } = require('mongoose');

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: "You must include text for your reply.",
            trim: true
        },
        writtenBy: {
            type: String,
            required: "You must include a name.",
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: "You must include a name.",
            trim: true
        },
        commentBody: {
            type: String,
            required: "You must include text for your comment.",
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;