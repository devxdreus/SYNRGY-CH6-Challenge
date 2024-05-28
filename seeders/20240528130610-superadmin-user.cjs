'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash(
            'password',
            await bcrypt.genSalt(10)
        );
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Super Admin',
                    email: 'superadmin@mail.com',
                    password: hashedPassword,
                    role: 'superadmin',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
