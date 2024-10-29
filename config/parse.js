const fs = require('fs');
const sequelize = require('../config/database');
const { Company, Office, ProfessionType, Resume, Vacancy } = require('../models');

async function insertData() {
    try {
        const jsonData = fs.readFileSync('data.json', 'utf8');
        const data = JSON.parse(jsonData).tables;

        console.log("Parsed Data:", data);  

        const companies = data.companies.data;
        const offices = data.offices.data;
        const professionTypes = data.professionTypes.data;
        const resumes = data.resumes.data;
        const vacancies = data.vacancies.data;

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

        console.log("Data successfully inserted into database.");
    } catch (error) {
        console.error("Error parsing or inserting data:", error);
    }
}

insertData();
