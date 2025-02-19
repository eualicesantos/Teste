const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para interpretar JSON no corpo das requisições

// Simulação de dados de livros
let livros = [
    { id: 1, title: "1984", cover: "/images/1984.jpg" },
    { id: 2, title: "Dom Casmurro", cover: "/images/domcasmurro.jpg" }
];

// Rota para listar todos os livros
app.get('/api/livros', (req, res) => {
    res.json(livros);
});

// Rota para adicionar um novo livro
app.post('/api/livros', (req, res) => {
    const novoLivro = req.body;
    if (novoLivro.id && novoLivro.title && novoLivro.cover) {
        livros.push(novoLivro);
        res.status(201).json({ message: "Livro adicionado com sucesso!" });
    } else {
        res.status(400).json({ error: "Dados inválidos" });
    }
});

// Rota para remover um livro pelo ID
app.delete('/api/livros/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    livros = livros.filter(livro => livro.id !== livroId);
    res.json({ message: "Livro removido com sucesso!" });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});