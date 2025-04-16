const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');

const app = express();
const redis = new Redis(); 

const PORT = 80;
const API_B_URL = 'http://localhost:3000/weather';

async function saveCity(data) {
    await redis.set(
        `city:${data.city.replaceAll(' ', '').toLowerCase()}`,
        JSON.stringify(data),
        'EX',
        60 // Expires in 60sec
    );
}

async function getCity(city) {
    return JSON.parse(await redis.get(`city:${city.replaceAll(' ', '').toLowerCase()}`));
}

function getRecommendation(temp) {
    if (temp > 30) {
        return 'Hidratação e protetor solar.';
    } else if (temp >= 15 && temp <= 30) {
        return 'O clima está agradável!';
    } else {
        return 'Use um casaco.';
    }
}

app.get('/recommendation/:city', async (req, res) => {
    try {
        const city = req.params.city;
        let cityData = await getCity(city);
        let cached = false;

        if (cityData) {
            cached = true;
        } else {
            const { data } = await axios.get(`${API_B_URL}/${city}`);
            cityData = data;
        }

        if (!cityData) {
            res.status(404).json({ error: 'Cidade nao encontrada'});
            return;
        }

        !cached && saveCity(cityData);

        const recommendation = getRecommendation(cityData.temp);

        res.json({
            city: cityData.city,
            temperature: cityData.temp,
            unit: cityData.unit,
            recommendation: recommendation,
        });
    } catch (error) {
        res.status(500);
    }
});

app.listen(PORT, () => {
    console.log(`API A rodando em http://localhost:${PORT}`);
});
