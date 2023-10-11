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

      await User.create({
        firstName, lastName, username, email, password,
      });

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  },
};
