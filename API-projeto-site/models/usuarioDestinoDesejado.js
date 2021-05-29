'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let usuarioDestinoDesejado = sequelize.define('usuarioDestinoDesejado',{	
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
	}, 
	{
		tableName: 'usuarioDestinoDesejado', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return usuarioDestinoDesejado;
};


