const mongoose = require('mongoose');

const { Schema } = mongoose;

const postsSchema = new Schema(
  {
    title: { type: String ,required: true, maxLength: 200 },
    content: { type: String, required: true, maxLength: 1000 },
    images: {
      type: String, required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('posts', postsSchema);
