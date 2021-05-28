'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let usuarioDestino = sequelize.define('usuarioDestino',{	
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
        visitado: {
            field: 'visitado',
            type: DataTypes.STRING,
            allowNull: true //false
        }
	}, 
	{
		tableName: 'usuarioDestino', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return usuarioDestino;
};


