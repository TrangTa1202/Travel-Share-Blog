const jwt = require('jsonwebtoken');

module.exports = {

  signToken: (id, email) => jwt.sign({ user_id: id, email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  }),

  generateUniqueCode: () => {
    let code = '';

    while (code.length < 6) {
      const randomNumber = Math.floor(Math.random() * 10).toString();
      if (!code.includes(randomNumber)) {
        code += randomNumber;
      }
    }

    return code;
  },

  fuzzySearch: (searchValue) => {
    if (!searchValue) {
      return null;
    }

    const regex = new RegExp(searchValue, 'i');
    return regex;
  },

};
