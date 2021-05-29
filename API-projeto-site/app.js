process.env.NODE_ENV = 'dev'; // altere para 'production' ou 'dev'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var leiturasRouter = require('./routes/leituras');
var usuarioDestinoVisitado = require('./routes/usuarioDestinoVisitado');
var usuarioDestinoDesejado = require('./routes/usuarioDestinoDesejado');

var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/leituras', leiturasRouter);
app.use('/usuarioDestinoVisitado', usuarioDestinoVisitado);
app.use('/usuarioDestinoDesejado', usuarioDestinoDesejado);

module.exports = app;
