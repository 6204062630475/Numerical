let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');
    path = require('path');

let equationSchema = require('./models/Equation')
// Express Route
//const equationRoute = require('../backend/routes/equation.route');

// Connecting MongDB Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Chayakorn:1234@cluster0.gfol6pc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log('Database successfully connected');
}, 
    error => {
        console.log('Could not connect to database: ' + error)
    }
)

// const dotenv = require('dotenv');
// const config = require("config");
// const tokenTwo = config.get("tokenTwo");
// dotenv.config();
const tokenTwo = require("./config/tokenTwo.json");
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());

app.post('/Equations',(req, res) => {
    equationSchema.find((error, data) => {
        const token = req.body.tokenOne;
        if (token == tokenTwo.tokenTwo) {
            console.log(data);
            return res.json(data);
        } 
        return res.sendStatus(401);
    })
})

// PORT
const port = process.env.PORT || 4000;
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Equation API",
        description: "Equation API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:4000"]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
/**
 * @swagger
 * /equations:
 *  get:
 *      description: Use to request all customers
 *      responses:
 *          '200':
 *              description: A successful response
 */

const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})