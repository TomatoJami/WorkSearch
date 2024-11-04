const db = require('../config/database');
const { Company, Office, ProfessionType, Resume, Role, User, Vacancy } = require('../models');

db.sync({ force: true }).then(async () => {
    console.log("Database created!")

    // const user1 = await User.create({
    //     username: 'admin',
    //     firstname: 'Eduard',
    //     lastname: 'Toomemets',
    //     email: 'admin@example.com',
    //     password: 'admin_123'
    // });

    // const user2 = await User.create({
    //     username: 'user',
    //     firstname: 'Arseni',
    //     lastname: 'Sergejev',
    //     email: 'user@example.com',
    //     password: 'user_123'
    // })

    // const role1 = await Role.create({
    //     id: 1,
    //     name: 'user'
    // })

    // const role2 = await Role.create({
    //     id: 2,
    //     name: 'administrator'
    // })

    // await user1.addRole(role2);
    // await user2.addRole(role1);

}).catch(error => {
    console.error('Ошибка при создании базы данных', error);
});
