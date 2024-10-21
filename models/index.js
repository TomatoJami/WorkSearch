const Company = require('./company');
const Office = require('./office');
const ProfessionType = require('./professiontype');
const Resume = require('./resume');
const User = require('./user');
const Vacancy = require('./vacancy');
const sequelize = require('../config/database');
const Role = require('./role');

//Одно ко многим компания - офис
Company.hasMany(Office, { as: 'offices', foreignKey: 'companyId' });
Office.belongsTo(Company, { as: 'company', foreignKey: 'companyId'});

//Одно ко многим тип профессии - вакансия
ProfessionType.hasMany(Vacancy, { as: 'vacancies', foreignKey: 'professionId' });
Vacancy.belongsTo(ProfessionType, { as: 'professionType', foreignKey: 'professionId'});

//Одно ко многим офис - вакансия
Office.hasMany(Vacancy, { as: 'vacancies', foreignKey: 'officeId' });
Vacancy.belongsTo(Office, { as: 'office', foreignKey: 'officeId'});

//Одно ко многим вакансия - резюме
Vacancy.hasMany(Resume, { as: 'resumes', foreignKey: 'vacancyId' });
Resume.belongsTo(Vacancy, { as: 'vacancy', foreignKey: 'vacancyId'});

//Одно ко многим пользователь - резюме
User.hasMany(Resume, { as: 'resumes', foreignKey: 'userId' });
Resume.belongsTo(User, { as: 'user', foreignKey: 'userId'});

//Много ко многим пользователь - роль
const UserRole = sequelize.define('UserRole', {}, {timestamps: false});

User.belongsToMany(Role, { through: UserRole, as: 'roles' });
Role.belongsToMany(User, { through: UserRole, as: 'users' });

module.exports = {
    Company,
    Office,
    ProfessionType,
    Resume,
    Role,
    User,
    Vacancy
};