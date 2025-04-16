const express = require('express');
const app = express();

const PORT = 3000;

const weatherDataArray = [
    { "id": 0,  "city": "Sao Paulo",     "temp": 25, "unit": "Celsius" },
    { "id": 1,  "city": "Rio de Janeiro","temp": 41, "unit": "Celsius" },
    { "id": 2,  "city": "Belo Horizonte","temp": 23, "unit": "Celsius" },
    { "id": 3,  "city": "Curitiba",      "temp": 12, "unit": "Celsius" },
    { "id": 4,  "city": "Porto Alegre",  "temp": 21, "unit": "Celsius" },
    { "id": 5,  "city": "Brasilia",      "temp": 24, "unit": "Celsius" },
    { "id": 6,  "city": "Recife",        "temp": 30, "unit": "Celsius" },
    { "id": 7,  "city": "Salvador",      "temp": 29, "unit": "Celsius" },
    { "id": 8,  "city": "Fortaleza",     "temp": 31, "unit": "Celsius" },
    { "id": 9,  "city": "Manaus",        "temp": 32, "unit": "Celsius" }
];

app.get('/weather/:city', (req, res) => {
    const cityParam = req.params.city;
    res.json(weatherDataArray.find(item => item.city.replaceAll(' ', '').toLowerCase() === cityParam.toLowerCase()));
});

app.listen(PORT, () => {
    console.log(`API B rodando em http://localhost:${PORT}`);
});
