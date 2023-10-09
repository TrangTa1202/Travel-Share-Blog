const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    comment: { type: String, required: true, maxLength: 300 },
    post: { type: Schema.Types.ObjectId, ref: 'posts' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('comments', commentsSchema);
