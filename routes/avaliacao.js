const express = require("express");
const router = express.Router();
const Avaliacao = require("../models/Avaliacao");

// Criar uma nova avaliação
router.post("/avaliacoes", async (req, res) => {
    try {
        const avaliacao = await Avaliacao.create(req.body);
        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar uma avaliação
router.put("/avaliacoes/:id", async (req, res) => {
    try {
        await Avaliacao.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Avaliação atualizada" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Excluir uma avaliação
router.delete("/avaliacoes/:id", async (req, res) => {
    try {
        await Avaliacao.destroy({ where: { id: req.params.id } });
        res.json({ message: "Avaliação excluída" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
