const { query } = require('express-validator');

module.exports = {

  checkGetPosts: [
    query('limit')
      .optional({ checkFalsy: false })
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be an integer between 1 and 50'),
    query('page')
      .optional({ checkFalsy: false })
      .isInt({ min: 1 })
      .withMessage('Page must be an integer greater than or equal to 1'),
    query('q')
      .optional({ checkFalsy: false })
      .isString()
      .withMessage('Search query must be a string'),
  ],

};
