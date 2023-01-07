const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = 8000;
const app = express();

require('./server/config/mongoose.config');

app.use(cookieParser());
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./server/routes/product.routes')(app);

const c = process.env.FIRST_SECRET_KEY;
console.log(`Constant: ${c}`);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );