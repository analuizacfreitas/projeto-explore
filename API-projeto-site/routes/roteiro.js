var express = require('express');
const usuario = require('../models/usuario');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Roteiro = require('../models').Roteiro;

/* ROTEIRO */

router.get('/', function(req, res, next) {
    console.log('Recuperando todas as publicações');

    let instrucaoSql = `SELECT nomeDestino, URLRoteiro 
                        FROM roteiro 
                        INNER JOIN destino ON fkDestino = idDestino
                        ORDER BY nomeDestino ASC;`;

    sequelize.query(instrucaoSql, {
        model: Roteiro,
        mapToModel: true 
    })
    .then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);
        res.json(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});


module.exports = router;