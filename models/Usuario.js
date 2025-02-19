const { DataTypes } = require("sequelize");
const sequelize = require("../config/banco.js");

const Usuario = sequelize.define("Usuario", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garantir que o e-mail seja único
        validate: {
            isEmail: true, // Validação de formato de e-mail
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true // Opcional
    },
    tipo_usuario: {
        type: DataTypes.ENUM("Aluno", "Bibliotecário", "Administrador"),
        allowNull: false,
        defaultValue: "Aluno" // Usuário por padrão será aluno
    },
    data_cadastro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    // Opções adicionais para a tabela
    timestamps: false, // Desabilitar a criação automática de colunas de timestamps (createdAt e updatedAt)
});

module.exports = Usuario;
