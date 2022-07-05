'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AccountBooks', [
      {
        userId: 1,
        amount: 1000,
        memo: '',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        amount: 2000,
        memo: 'memo1',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        amount: 3000,
        memo: '',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        amount: 4000,
        memo: 'memo2',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        amount: 5000,
        memo: '',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        amount: 6000,
        memo: 'memo3',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        amount: 7000,
        memo: '',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        amount: 8000,
        memo: 'memo4',
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AccountBooks', null, {});
  },
};
