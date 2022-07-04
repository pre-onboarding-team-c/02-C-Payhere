'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AccountBooks', [
      {
        userId: 1,
        expenses: 1000,
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        expenses: 2000,
        memo: 'memo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        expenses: 3000,
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        expenses: 4000,
        memo: 'memo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AccountBooks', null, {});
  },
};
