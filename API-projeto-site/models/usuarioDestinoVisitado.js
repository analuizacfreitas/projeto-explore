'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let usuarioDestinoVisitado = sequelize.define('usuarioDestinoVisitado',{	
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
		},	
		fkDestino: {
			field: 'fkDestino',
			type: DataTypes.INTEGER,
			primaryKey: true,
		},	
		anoViagem: {
			field: 'anoViagem',
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	}, 
	{
		tableName: 'usuarioDestinoVisitado', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return usuarioDestinoVisitado;
};


