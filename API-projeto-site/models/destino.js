'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Destino = sequelize.define('Destino',{	
		idDestino: {
			field: 'idDestino',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		nomeDestino: {
			field: 'nomeDestino',
			type: DataTypes.STRING,
			allowNull: false
		},
	}, 
	{
		tableName: 'Destino', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Destino;
};