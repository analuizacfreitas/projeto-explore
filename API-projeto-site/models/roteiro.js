'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Roteiro = sequelize.define('Roteiro',{	
		fkDestino: {
			field: 'fkDestino',
			type: DataTypes.INTEGER,
			primaryKey: true,
        },
        URLRoteiro: {
			field: 'URLRoteiro',
			type: DataTypes.STRING,
			allowNull: false
		},
    },
	{
		tableName: 'Roteiro', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Roteiro;
};