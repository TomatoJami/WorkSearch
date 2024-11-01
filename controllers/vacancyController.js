const { Vacancy, Office } = require('../models');
const generateCRUDControllers = require('./generateCRUDcontrollers');

const vacancyCRUDControllers = generateCRUDControllers(Vacancy);

const vacancyController = {
    ...vacancyCRUDControllers,

    findByName: async (req, res) => {
        const vacancyName = req.params.name
        try {
            const vacancies = await Vacancy.findAll({
                where: {
                    name: {
                        [Op.like]: `%${vacancyName}%`
                    }
                }
            })

            if (vacancies.length === 0) {
                return res.status(404).json({ message: 'No vacancies found!' });
            }

            res.status(200).json(vacancies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    findByLocation: async (req, res) => {
        const locationName = req.params.location;
        try {
            const vacancies = await Vacancy.findAll({
                include: {
                    model: Office,
                    where: {
                        location: {
                            [Op.like]: `%${locationName}%`
                        }
                    }
                }
            })
            
            if (vacancies.length === 0) {
                return res.status(404).json({ message: 'No vacancies found for this location!' });
            }

            res.status(200).json(vacancies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = vacancyController;