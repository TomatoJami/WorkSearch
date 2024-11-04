const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/userRoutes.js', 
    './routes/officeRoutes.js', 
    './routes/resumeRoutes.js', 
    './routes/vacancyRoutes.js',
    './routes/companyRoutes.js'
];

const config = {
    info: {
        title: 'Work Search API',
        description: 'API documentation for Work Search application',
    },
    tags: [
        {
            name: 'users',
            description: 'User management endpoints',
        },
        {
            name: 'offices',
            description: 'Office management endpoints',
        },
        {
            name: 'vacancies',
            description: 'Vacancy management endpoints',
        },
        {
            name: 'resumes',
            description: 'Resume management endpoints',
        },
        {
            name: 'companies',
            description: 'Company management endpoints',
        }
    ],
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config).then(() => {
    require('./index');
});
