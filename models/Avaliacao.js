const { DataTypes } = require("sequelize");
const sequelize = require("../config/banco.js");
const Usuario = require("./Usuario.js");
const Livro = require("./Livro.js");

const Avaliacao = sequelize.define("Avaliacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id"
        }
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Livro,
            key: "id"
        }
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_avaliacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = Avaliacao;
