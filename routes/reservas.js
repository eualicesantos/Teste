const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const Usuario = require('../models/usuario');
const Livro = require('../models/livro');

// Criar uma reserva
router.post('/reservar', async (req, res) => {
    try {
        const { usuarioId, livroId } = req.body;
        const reserva = await Reserva.create({ usuarioId, livroId });
        res.status(201).json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar reserva' });
    }
});

// Listar todas as reservas
router.get('/listar', async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ include: [Usuario, Livro] });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar reservas' });
    }
});

// Atualizar status da reserva
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await Reserva.update({ status }, { where: { id: req.params.id } });
        res.json({ message: 'Reserva atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar reserva' });
    }
});

// Cancelar uma reserva
router.delete('/:id', async (req, res) => {
    try {
        await Reserva.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Reserva cancelada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cancelar reserva' });
    }
});

module.exports = router;
