const express = require("express");
const axios = require('axios')
const app = express();
app.use(express.json());
require('dotenv').config()
const { PORT } = process.env
const { BARR } = process.env

const palavaChave = "importante"
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = observacao.texto.includes(palavaChave) ? "importante" : "comum";
        axios.post(`http://barramento-de-eventos-service:${BARR}/eventos`, {
            tipo: "ObservacaoClassificada",
            dados: observacao
        });
    }
};


app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({ msg: 'ok' });
});

app.listen(PORT, () => console.log(`Classificação. Porta ${PORT}`))