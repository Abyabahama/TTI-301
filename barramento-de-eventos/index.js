const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

const eventos = [];

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento)
    //Envia evento para o ms de lembretes
    axios.post('http://localhost:4000/eventos', evento);
    //Envia evento para o ms de observacoes
    axios.post('http://localhost:5000/eventos', evento);
    //Envia evento para o ms de consulta
    axios.post("http://localhost:6000/eventos", evento);
    //Envia evento para o ms de classificacao
    axios.post("http://localhost:7000/eventos", evento);
    res.status(200).send({ msg:'ok' });
})

app.get('/eventos', (req, res) => {
    res.send(eventos)
})

app.listen(10000, () => {
    console.log("Barramento de eventos, porta 10000")
})