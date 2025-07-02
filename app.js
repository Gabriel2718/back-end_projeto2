const http  = require('http');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { connect } = require('./db');
const { configurar } = require('./configurar');

configurar();

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
app.use(cookieParser());
app.use(
    session({
        secret: 'segredo_criptografico',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60000}
    })
);

function checkLogin(req, res, next) {
    if(req.session.logado){
        next();
    } else {
        res.redirect('/login');
    }
}

async function checkUserInfo(usuario, senha) {
    const {db, client} = await connect();
    const userInfo = await db.collection('usuarios').findOne({user: usuario});
    client.close();

    if(userInfo === null){
        return false;
    } else {
        return userInfo.pass === senha;
    }
}

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const {usuario, senha} = req.body; //os valores "name" dos inputs são enviados com a rquisição post

    verified = await checkUserInfo(req.body.usuario, req.body.senha).then((verified) => {
        if(verified) {
            req.session.logado = true;
            res.redirect('/');
        } else {
            res.send('Usuário ou senha inválidos <a href="/login">Tentar de novo</a>');
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/', checkLogin, (req, res) => {
    res.render('index');
});

app.listen(3000);