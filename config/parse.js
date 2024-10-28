const fs = require('fs');
const sequelize = require('../config/database');
const { Company, Office, ProfessionType, Resume, Vacancy } = require('../models'); 

async function insertData() {
    try {
        const jsonData = fs.readFileSync('data.json', 'utf8');
        const data = JSON.parse(jsonData);

        const companies = data.companies;
        const offices = data.offices;
        const professionTypes = data.professionTypes;
        const resumes = data.resumes;
        const vacancies = data.vacancies;

        for (const company of companies) {
            await Company.create(company);
        }

        for (const office of offices) {
            await Office.create(office);
        }

        for (const profession of professionTypes) {
            await ProfessionType.create(profession);
        }

        for (const resume of resumes) {
            await Resume.create(resume);
        }

        for (const vacancy of vacancies) {
            await Vacancy.create(vacancy);
        }

        console.log('Данные успешно вставлены в базу данных.');
    } catch (error) {
        console.error('Ошибка при вставке данных:', error);
    }
}

insertData();
