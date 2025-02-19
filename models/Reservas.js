const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Livro = require('./livro');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    livroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Livro,
            key: 'id'
        }
    },
    dataReserva: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
    }
}, {
    tableName: 'reservas'
});

Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Reserva.belongsTo(Livro, { foreignKey: 'livroId' });

module.exports = Reserva;