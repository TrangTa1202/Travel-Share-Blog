const { Post } = require('../../../models');
const { fuzzySearch } = require('../../../helpers');

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const { limit, page, q } = req.query;

      const conditionFind = {};

      if (q) {
        conditionFind.title = fuzzySearch(q);
      }

      const sizePage = (!limit || limit > 50) ? 10 : limit;
      const currentPage = (!page || page < 1) ? 1 : page;

      const [data, total] = await Promise.all([
        Post.find(conditionFind)
          .populate([
            { path: 'author', select: 'firstName lastName avatar' },
            {
              path: 'comments',
              populate: { path: 'user', select: 'firstName lastName avatar' },
              select: 'comment',
            },
          ])
          .skip((sizePage * currentPage) - sizePage)
          .limit(sizePage)
          .lean(),
        Post.countDocuments(conditionFind),
      ]);

      return res.status(200).json({ status: 200, payload: { data, total } });
    } catch (error) {
      next(error);
    }
  },
};
