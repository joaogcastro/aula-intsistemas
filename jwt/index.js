const express = require('express');
const jwt = require('jsonwebtoken');

const jwtSecret = 'topsecret';
const jwtExpiration = '1h';

const users = [
    { id: 0, email: 'teste@email.com', password: '123', cpf: '123.000.000-00' },
    { id: 1, email: 'teste2@email.com', password: '321', cpf: '456.000.000-00' },
    { id: 2, email: 'teste3@email.com', password: '456', cpf: '789.000.000-00' },
];

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Incluindo o id do usuário no token
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpiration });

    return res.json({ token });
});

app.post('/cpf', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, jwtSecret, (err, jwtUser) => {
        if (err) {
            return res.sendStatus(401);
        }

        const userId = parseInt(req.query.id); // Acessa o id da query string

        // Verifica se o id da query string corresponde ao id do usuário autenticado
        if (userId !== jwtUser.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const foundUser = users.find(user => user.id === userId); // Busca pelo id

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ cpf: foundUser.cpf });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});