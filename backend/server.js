const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const connectDb = require('./db/connect')
const cookieParser = require('cookie-parser')

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173', // Allow only requests from this origin
    methods: 'GET,POST,DELETE,PATCH', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
};

const authRouter = require('./routes/auth')
const {createAdminAccount} = require('./utils/admin')

connectDb()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

createAdminAccount()

app.use('/api', authRouter)

const port = process.env.PORT || 5000

app.listen(port, (() => console.log(`Server is listening on port ${port}...`)))