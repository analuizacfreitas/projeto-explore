var express = require('express');
const usuario = require('../models/usuario');
var router = express.Router();
var sequelize = require('../models').sequelize;
var usuarioDestinoDesejado = require('../models').usuarioDestinoDesejado;
var Destino = require('../models').Destino;


/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/adicionar/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
	
    let instrucaoSql = `SELECT 
    Destino.idDestino
    FROM Destino
    where nomeDestino = '${req.body.nomeDestinoDesejado}';`;

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
    
        usuarioDestinoDesejado.create({
            fkUsuario: idUsuario,
            fkDestino: idDestino 
            //fkDestino: req.body.fkDestino
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
    Destino.nomeDestino
    FROM usuarioDestinoDesejado
    RIGHT JOIN Destino
    ON usuarioDestinoDesejado.fkDestino = Destino.idDestino
    LEFT JOIN Usuario
    ON fkUsuario = idUsuario
    ORDER BY Destino.nomeDestino ASC;`;

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


/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.idUsuario;

    let instrucaoSql = `SELECT 
    Usuario.nome,
    Destino.nomeDestino
    FROM usuarioDestinoDesejado
    RIGHT JOIN Destino
    ON usuarioDestinoDesejado.fkDestino = Destino.idDestino
    LEFT JOIN Usuario
    ON fkUsuario = idUsuario
    WHERE fkUsuario = ${idUsuario}
    ORDER BY Destino.nomeDestino ASC;`;

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
