var express = require('express');
const usuario = require('../models/usuario');
var router = express.Router();
var sequelize = require('../models').sequelize;
var usuarioDestinoVisitado = require('../models').usuarioDestinoVisitado;
var Destino = require('../models').Destino;


/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/adicionar/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
	
    let instrucaoSql = `SELECT 
    Destino.idDestino
    FROM Destino
    where nomeDestino = '${req.body.nomeDestinoVisitado}';`;

    var idDestino = 0;
    sequelize.query(instrucaoSql, {
		model: Destino,
		mapToModel: true 
	})
	.then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);
        idDestino = resultado[0].idDestino;
        console.log(`O idDestino é: ${idDestino}`)    
        
        if (idDestino == 0) {
        console.log('Destino não encontrado');
        console.log(`>> O idDestino é: ${idDestino}`)
        res.status(404).send('Destino não encontrado');
        }
        
        let idUsuario = req.params.idUsuario;

        usuarioDestinoVisitado.create({
            fkUsuario: idUsuario,
            fkDestino: idDestino,
            anoViagem: req.body.anoViagem
        }).then(resultado => {
            console.log("Post realizado com sucesso!!");
            res.send(resultado);
        }).catch(erro => {
            console.log('DEU UM ERRINHO')
            console.error(erro);
            res.status(500).send(erro.message);
        })
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
    });
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
    let instrucaoSql = `SELECT 
    Usuario.nome,
    Destino.nomeDestino,
    usuarioDestinoVisitado.anoViagem
    FROM usuarioDestinoVisitado
    RIGHT JOIN Destino
    ON usuarioDestinoVisitado.fkDestino = Destino.idDestino
    LEFT JOIN Usuario
    ON fkUsuario = idUsuario
    ORDER BY usuarioDestinoVisitado.anoViagem DESC;`;

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

/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.idUsuario;

    let instrucaoSql = `SELECT 
    Usuario.nome,
    Destino.nomeDestino,
    usuarioDestinoVisitado.anoViagem
    FROM usuarioDestinoVisitado
    RIGHT JOIN Destino
    ON usuarioDestinoVisitado.fkDestino = Destino.idDestino
    LEFT JOIN Usuario
    ON fkUsuario = idUsuario
    WHERE fkUsuario = ${idUsuario}
    ORDER BY usuarioDestinoVisitado.anoViagem DESC`;

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

module.exports = router;
