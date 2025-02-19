const express = require('express');
const Emprestimo = require("../models/Emprestimo.js");
const Livro = require("../models/Livro.js");
const Usuario = require("../models/Usuario.js");

const router = express.Router();

//criar emprestimo
router.post('/', async (req, res) => {
    try {
        const { id_usuario, id_livro} = req.body;
        const livro = await Livro.findByPk(id_livro);

        if (!livro || !livro.disponibilidade){
            return res.status(400).json({erro: "Não foi possivel concluir o empréstimo: Livro Indisponivel"});
        }

        const emprestimo = await Emprestimo.create({id_usuario, id_livro});
        await livro.update({disponibilidade: false});

        res.status(201).json(emprestimo);
    } catch (error){
        res.status(500).json({erro: error.message});
    }
});

//buscar os emprestimo
router.get('/', async (req, res) => {
    const emprestimos = await Emprestimo.findAll({ include: [Livro, Usuario]});
    res.json(emprestimos);
});

//fechar emprestimo
router.put('/:id/devolver', async (req, res) => {
    try {
        const emprestimo = await Emprestimo.findByPk(req.params.id);
        if (!emprestimo) return res.status(404).json({ erro: "Empréstimo não encontrado"});

        await emprestimo.update({status: "Devolvido", data_devolucao: new Date() });

        const livro = await Livro.findByPk(emprestimo.id_livro);
        await livro.update({ disponibilidade: true});

        res.json({ mensagem: "Livro Devolvido!"});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;