const mongoose = require('mongoose');

const { Schema } = mongoose;

const postsSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true, maxLength: 20000 },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('posts', postsSchema);
