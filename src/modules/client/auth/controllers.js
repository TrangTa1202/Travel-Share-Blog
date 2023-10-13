const { User } = require('../../../models');

module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        firstName, lastName, username, email, password,
      } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // test commit

      await User.create({
        firstName, lastName, username, email, password,
      });

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      return res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
      next(error);
    }
  },
};
