const nodemailer = require('nodemailer');
const { User, VerifyCode } = require('../../../models');
const { signToken, generateUniqueCode } = require('../../../helpers');

module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        firstName, lastName, username, email, password,
      } = req.body;

      await User.create({
        firstName, lastName, username, email, password,
      });

      return res.status(201).json({ status: 201, message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }

      if (!user.comparePassword(password)) {
        return res.status(401).json({ status: 401, message: 'Invalid password' });
      }

      const accessToken = signToken(user._id, user.email);

      return res.status(200).json({
        status: 200,
        message: 'Login successfully',
        payload: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }

      const isSpam = await VerifyCode.findOne({ user: user._id });

      if (isSpam) {
        return res.status(403).json({ status: 403, message: 'Too many requests' });
      }

      const code = generateUniqueCode();

      const verifyCode = await VerifyCode.create({
        user: user._id,
        code,
      });

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: 'travelShareBlog@gmail.com',
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${verifyCode.code}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          throw new Error('Error sending email');
        }
      });

      return res.status(200).json({
        status: 200,
        message: 'Verification code sent successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  verifyCode: async (req, res, next) => {
    try {
      const { code, email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }

      const verifyCode = await VerifyCode.findOne({ user: user._id, code });

      if (!verifyCode) {
        return res.status(404).json({ status: 404, message: 'Code is invalid' });
      }

      return res.status(200).json({
        status: 200,
        message: 'Verify code successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { email, code, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }

      const verifyCode = await VerifyCode.findOne({ user: user._id, code });

      if (!verifyCode) {
        return res.status(404).json({ status: 404, message: 'Code is invalid' });
      }

      user.password = password;
      await user.save();

      await VerifyCode.deleteOne({ user: user._id });

      return res.status(200).json({
        status: 200,
        message: 'Password reset successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
