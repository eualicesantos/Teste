const {DataTypes} = require('sequelize');
const sequelize = require('../config/banco.js');
const Usuario = require('./Usuario.js');
const Livro = require('./Livro.js');

const Emprestimo = sequelize.define("Emprestimo",{
    id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    id_usuario: {type: DataTypes.INTEGER, references: {model: Usuario, key: "id"}},
    id_livro: {type: DataTypes.INTEGER, references: {model: Livro, key: "id"}},
    data_emprestimo: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    data_devolucao: {type: DataTypes.DATE, allowNull: true},
    status: {type: DataTypes.ENUM("Ativo", "Devolvido"), defaultValue: "Ativo"} 
});

module.exports = Emprestimo