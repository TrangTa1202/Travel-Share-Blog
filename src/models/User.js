const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    email: {
      type: String, required: true, maxLength: 50, unique: true,
    },
    password: { type: String },
    avatar: { type: String },
    authType: { type: String, default: 'local' },
    authGoogleId: { type: String },
    authFacebookId: { type: String },
    isVerify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', function a(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password + process.env.JWT_SECRET, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword + process.env.JWT_SECRET, this.password);
};

module.exports = mongoose.model('users', userSchema);
