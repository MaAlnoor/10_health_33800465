// Import express and ejs
var express = require('express')
var ejs = require('ejs')
const path = require('path')
var mysql = require('mysql2');
var session = require('express-session');
require('dotenv').config();
const expressSanitizer = require('express-sanitizer');

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css)
app.use(express.static(path.join(__dirname, 'public')))

// Define our application-specific data
app.locals.appData = { appName: "Fitness Tracker" }

// Define the database connection pool
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
global.db = db;

// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Create an input sanitizer
app.use(expressSanitizer());

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the workout routes
const workoutsRoutes = require('./routes/workouts')
app.use('/workouts', workoutsRoutes)

// Load API routes
const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Fitness Tracker app listening on port ${port}!`))
