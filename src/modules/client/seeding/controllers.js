const { faker } = require('@faker-js/faker');
const { User, Post, Comment } = require('../../../models');

module.exports = {
  fakeUsers: async (req, res, next) => {
    try {
      for (let i = 0; i < 10; i += 1) {
        const user = new User({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),

        });

        await user.save();
      }

      return res.status(201).json({ message: 'Users faked successfully' });
    } catch (error) {
      next(error);
    }
  },

  fakePosts: async (req, res, next) => {
    try {
      await Post.deleteMany();

      const users = await User.find();

      const posts = [];

      for (let i = 0; i < 200; i += 1) {
        const images = [];
        const user = users[Math.floor(Math.random() * users.length)];

        for (let j = 0; j < 3; j += 1) {
          images.push(faker.image.imageUrl());
        }

        const totalLikes = Math.floor(Math.random() * 10) + 1;
        const totalComments = Math.floor(Math.random() * 100) + 1;

        const post = {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(40),
          images,
          totalLikes,
          totalComments,
          author: user._id,
        };

        posts.push(post);
      }

      await Post.insertMany(posts);

      return res.status(201).json({ message: 'Posts faked successfully' });
    } catch (error) {
      next(error);
    }
  },

  fakeComments: async (req, res, next) => {
    try {
      await Comment.deleteMany();

      const users = await User.find();
      const posts = await Post.find();
      const comments = [];

      for (let i = 0; i < 400; i += 1) {
        const user = users[Math.floor(Math.random() * users.length)];
        const post = posts[Math.floor(Math.random() * posts.length)];

        const comment = {
          comment: faker.lorem.paragraph(),
          author: user._id,
          post: post._id,
        };

        comments.push(comment);
      }

      await Comment.insertMany(comments);

      return res.status(201).json({ message: 'Comments faked successfully' });
    } catch (error) {
      next(error);
    }
  },
};
