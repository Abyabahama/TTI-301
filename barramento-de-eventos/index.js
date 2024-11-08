const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
require('dotenv').config()
const { PORT } = process.env
const { PORTLEM } = process.env
const { PORTOBS } = process.env
const { PORTCLA } = process.env
const { PORTCON } = process.env
const { PORTLOG } = process.env


app.use(bodyParser.json());

const eventos = [];

app.post('/eventos', (req, res) => {
    const evento = req.body;
    eventos.push(evento)
    //Envia evento para o ms de lembretes
    try {
        axios.post('http://lembretes-clusterip-service:${PORTLEM}/eventos', evento);
    } catch (err) {alert}
     //Envia evento para o ms de observacoes
    try {
        axios.post('http://observacoes-clusterip-service:${PORTOBS}/eventos', evento);
    } catch (err) {alert}
    //Envia evento para o ms de consulta
    try {
        axios.post("http://consulta-clusterip-service:${PORTCON}/eventos", evento);
    } catch (err) {alert}
    //Envia evento para o ms de classificacao
    try {
        axios.post("http://classificacao-clusterip-service:${PORTCLA}/eventos", evento);
    } catch (err) {alert}
    try {
        axios.post("http://logs-clusterip-service:${PORTLOG}/eventos", evento);
    } catch (err) {alert} 
    res.status(200).send({ msg:'ok' });
})

app.get('/eventos', (req, res) => {
    res.send(eventos)
})

app.listen(PORT, () => {
    console.log("Barramento de eventos, porta ${PORT}")
})