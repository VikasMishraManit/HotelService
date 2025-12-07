import { QueryInterface } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Hotels
      ADD COLUMN rating DECIMAL(3,2) DEFAULT 0,
      ADD COLUMN rating_count INT DEFAULT 0;
    `);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Hotels
      DROP COLUMN rating,
      DROP COLUMN rating_count;
    `);
  }
};
