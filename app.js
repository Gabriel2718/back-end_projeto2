const http  = require('http');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { configurar } = require('./configurar');

const app = express();

app.set(
    'view engine', 'hbs'
);

app.set(
    'views', path.join(__dirname, 'views')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: false
}));

configurar();

app.listen(3000);