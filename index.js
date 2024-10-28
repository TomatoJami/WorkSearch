const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to WorkSearch RESTful API' })
})

require('../WorkSearch/routes/userRoutes')(app);
require('../WorkSearch/routes/companyRoutes')(app);
require('../WorkSearch/routes/officeRoutes')(app);
require('../WorkSearch/routes/vacancyRoutes')(app);
require('../WorkSearch/routes/resumeRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '.')
})