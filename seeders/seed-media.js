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
    return queryInterface.bulkInsert("media", [

      {media: "Paperback", createdAt: new Date(), updatedAt: new Date()},
      {media: "Hardback", createdAt: new Date(), updatedAt: new Date()},
      {media: "Kindle", createdAt: new Date(), updatedAt: new Date()},
      {media: "Audiobook", createdAt: new Date(), updatedAt: new Date()},
      {media: "Game", createdAt: new Date(), updatedAt: new Date()},
      {media: "Movie/Film", createdAt: new Date(), updatedAt: new Date()},
      {media: "Music", createdAt: new Date(), updatedAt: new Date()}

  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("media", null, {});
  }

};
