const {DataTypes} = require("sequelize");
const sequelize = require('../config/banco.js');

const Livro = sequelize.define('Livro', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    titulo: {type: DataTypes.STRING, allowNull: false},
    autor: {type: DataTypes.STRING, allowNull: false},
    ano: {type: DataTypes.INTEGER, allowNull: false},
    disponibilidade: {type: DataTypes.BOOLEAN, defaultValue: true}
});

module.exports = Livro