const express = require('express');
const path = require('path')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

const routes = require('./routes/routes');
const dbConnect = require(path.join(__dirname, '/config/database/dbConnect.js'));
const { errorHandler, notFound } = require('./middlewares/error/error.js');

const PORT = process.env.PORT || 5000;

dbConnect();

app.use('/', routes);

app.use(notFound)
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));