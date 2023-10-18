const mongoose = require('mongoose');

const { Schema } = mongoose;

const verifyCodeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    code: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('verifyCode', verifyCodeSchema);
