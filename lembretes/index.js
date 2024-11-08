const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
require('dotenv').config()
const { PORT } = process.env
const { BARR } = process.env

app.use(bodyParser.json());
lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
    res.send(lembretes)
});

app.put ('/lembretes', async (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador,
        texto
    };
    await axios.post(`http://barramento-de-eventos-service:${BARR}/eventos`, {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto
        }
    });
    res.status(201).send(lembretes[contador]);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(201).send({ msg: 'ok' });
})

app.listen(PORT, () => {
    console.log(`Lembretes, porta ${PORT}`)
})