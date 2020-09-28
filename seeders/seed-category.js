'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("categories", [

      {category: "Novel", createdAt: new Date(), updatedAt: new Date()},
      {category: "Short Stories", createdAt: new Date(), updatedAt: new Date()},
      {category: "Non Fiction", createdAt: new Date(), updatedAt: new Date()},
      {category: "Secondary Resource", createdAt: new Date(), updatedAt: new Date()}

  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("categories", null, {});
  }

};
