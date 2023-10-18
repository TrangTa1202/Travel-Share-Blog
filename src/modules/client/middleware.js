const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = {
  Validate: async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      message: 'validate errors',
      payload: result.array({ onlyFirstError: true }),
    });
  },

  Guard: (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token || !token.length) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      return next();
    } catch (error) {
      next(error);
    }
  },

  ErrorHandler: (error, res) => {
    const errStatus = error.statusCode || 500;
    const errMsg = error.message || 'Something went wrong';
    return res.status(errStatus).json({
      status: errStatus,
      message: errMsg,
    });
  },
};
