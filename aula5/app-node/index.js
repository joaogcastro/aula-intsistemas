const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Dados de exemplo para os carros
const carros = [
    {
        id: 1,
        name: 'Civic',
        price: 25000,
        company: 'Honda',
        description: 'Um sedan compacto com ótimo desempenho e eficiência de combustível.'
    },
    {
        id: 2,
        name: 'Fusca',
        price: 15000,
        company: 'Volkswagen',
        description: 'Um clássico carro compacto que fez história.'
    },
    {
        id: 3,
        name: 'Mustang',
        price: 55000,
        company: 'Ford',
        description: 'Um icônico carro esportivo conhecido por sua performance.'
    },
    {
        id: 4,
        name: 'Corolla',
        price: 22000,
        company: 'Toyota',
        description: 'Um sedan confiável e econômico, ideal para o dia a dia.'
    }
];

// Rota para retornar os carros
app.get('/products', (req, res) => {
    const id = req.query.id;
    if (id) {
        res.json(carros[id]);
        return;
    }
    res.json(carros);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});