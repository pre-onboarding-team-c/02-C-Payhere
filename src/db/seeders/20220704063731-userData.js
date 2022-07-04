"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "kgeeeu@gmail.com",
        password: "password1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "whoamixzerone@gmail.com",
        password: "password2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
