const express = require('express');
const cors = require('cors');
const sequelize = require('./config/banco.js');
const path = require('path'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));


const LivroRoutes = require('./routes/livros.js')
const EmprestimoRoutes = require('./routes/emprestimos.js')

app.use("/Livros", LivroRoutes);
app.use("/Emprestimo", EmprestimoRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'TelaInicial', 'telainicial.html'));
  });

sequelize.sync().then(() => console.log("Banco conectado!"));

app.listen(2200, () => console.log("Servidor Rodando em http://localhost:2200"));
