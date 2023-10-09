const { faker } = require('@faker-js/faker');
const { Room } = require('../models');

roomSeeder = {
    async () => {
        for (let i = 0; i < 10; i++) {
          await Room.create({
            name: faker.lorem.word(),
          });
        }
};
