var express = require('express');
const usuario = require('../models/usuario');
var router = express.Router();
var sequelize = require('../models').sequelize;
var usuarioDestinoVisitado = require('../models').usuarioDestinoVisitado;
var usuarioDestinoDesejado = require('../models').usuarioDestinoDesejado;
var Destino = require('../models').Destino;


/* DESTINOS VISITADOS */
router.get('/destinosVisitados/:idUsuario', function(req, res, next) {
    console.log('Recuperando todas as publicações');
    
    let idUsuario = req.params.idUsuario;
    
    let instrucaoSql = `SELECT
                            qtdDestinosUsuario, mediaDestinosUsuarios
                        FROM
                        (
                            SELECT
                                COUNT(fkDestino) as qtdDestinosUsuario
                            FROM usuarioDestinoVisitado
                            WHERE fkUsuario = ${idUsuario}
                        ) t0
                        INNER JOIN
                        (
                            SELECT ROUND(AVG(qtdDestinos), 2) as mediaDestinosUsuarios
                            FROM 
                            (
                                SELECT COUNT(fkDestino) as qtdDestinos
                                FROM usuarioDestinoVisitado
                                GROUP BY fkUsuario
                            ) t1
                        ) t2;`;

	sequelize.query(instrucaoSql, {
		model: usuarioDestinoVisitado,
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

/* TOP 3 DESTINOS VISITADOS */
router.get('/top3DestinosVisitados', function(req, res, next) {
console.log('Recuperando todas as publicações');

let instrucaoSql = `SELECT nomeDestino, COUNT(nomeDestino) AS qtdUsuarios
                    FROM destino INNER JOIN usuarioDestinoVisitado 
                    WHERE fkDestino = idDestino
                    GROUP BY nomeDestino 
                    ORDER BY qtdUsuarios DESC 
                    LIMIT 3;`;

sequelize.query(instrucaoSql, {
    model: usuarioDestinoVisitado,
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

/* DESTINOS DESEJADOS */
router.get('/destinosDesejados/:idUsuario', function(req, res, next) {
console.log('Recuperando todas as publicações');

let idUsuario = req.params.idUsuario;

let instrucaoSql = `SELECT
                        qtdDestinosUsuario, mediaDestinosUsuarios
                    FROM
                    (
                        SELECT
                            COUNT(fkDestino) as qtdDestinosUsuario
                        FROM usuarioDestinoDesejado
                        WHERE fkUsuario = ${idUsuario}
                    ) t0
                    INNER JOIN
                    (
                        SELECT ROUND(AVG(qtdDestinos), 2) as mediaDestinosUsuarios
                        FROM 
                        (
                            SELECT COUNT(fkDestino) as qtdDestinos
                            FROM usuarioDestinoDesejado
                            GROUP BY fkUsuario
                        ) t1
                    ) t2;`;

sequelize.query(instrucaoSql, {
    model: usuarioDestinoDesejado,
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

/* TOP 3 DESTINOS DESEJADOS */
router.get('/top3DestinosDesejados', function(req, res, next) {
    console.log('Recuperando todas as publicações');
    
    let instrucaoSql = `SELECT nomeDestino, COUNT(nomeDestino) AS qtdUsuarios
                        FROM destino INNER JOIN usuarioDestinoDesejado 
                        WHERE fkDestino = idDestino
                        GROUP BY nomeDestino 
                        ORDER BY qtdUsuarios DESC 
                        LIMIT 3;`;

    sequelize.query(instrucaoSql, {
        model: usuarioDestinoDesejado,
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