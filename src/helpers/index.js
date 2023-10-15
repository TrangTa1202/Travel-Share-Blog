const { validationResult } = require('express-validator');

module.exports = {
  validate: async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      message: 'validate errors',
      payload: result.array({ onlyFirstError: true }),
    });
  },
};
