const express = require('express');
const { Op } = require('sequelize');
const Livro = require('../models/Livro.js');

const router = express.Router();

// Novo livro
router.post('/', async (req, res) => {
    try {
        const { titulo, autor, ano } = req.body;
        const livro = await Livro.create({ titulo, autor, ano });
        res.status(201).json(livro);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Buscar livro por ID, título ou autor
router.get('/buscar', async (req, res) => {
    try {
        const { termo } = req.query;

        if (!termo) {
            return res.status(400).json({ erro: 'Nenhum termo de busca fornecido' });
        }

        // Verifica se o termo é um número válido para buscar por ID
        const whereClause = {
            [Op.or]: []
        };

        if (!isNaN(termo)) {
            whereClause[Op.or].push({ id: Number(termo) });
        }

        whereClause[Op.or].push(
            { titulo: { [Op.like]: `%${termo}%` } },
            { autor: { [Op.like]: `%${termo}%` } }
        );

        const livros = await Livro.findAll({ where: whereClause });

        if (livros.length === 0) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }

        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Atualizar um livro
router.put('/:id', async (req, res) => {
    try {
        const { titulo, autor, ano, disponibilidade } = req.body;
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }

        // Atualiza os dados do livro
        await livro.update({ titulo, autor, ano, disponibilidade });
        res.json(livro);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Listar livros com todos os detalhes
router.get('/listar', async (req, res) => {
    try {
        // Aqui você pode especificar mais detalhes, se necessário
        const livros = await Livro.findAll({
            attributes: ['id', 'titulo', 'autor', 'ano', 'disponibilidade']
        });
        
        // Verifica se livros existem
        if (livros.length === 0) {
            return res.status(404).json({ erro: 'Nenhum livro encontrado' });
        }

        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Excluir um livro pelo ID
router.delete('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }

        await livro.destroy();
        res.json({ mensagem: 'Livro excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;