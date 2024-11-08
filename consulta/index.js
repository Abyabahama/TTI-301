const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());
require('dotenv').config()
const { PORT } = process.env
const { BARR } = process.env

const baseConsulta = {};



const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"] || [];
        observacoes.push(observacao);
        baseConsulta[observacao.lembreteId]["observacoes"] = observacoes;
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"];
        const indice = observacoes.findIndex((o) => o.id === observacao.id);
        observacoes[indice] = observacao;
    }
};

app.get('/lembretes', (req, res) =>{
    res.status(200).send(baseConsulta);
});

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);

    } catch (err) {}
    res.status(200).send(baseConsulta);
});

app.listen(PORT, async () => {
    console.log(`Consultas, ${PORT}`)
    const resp = await axios.get(`http://barramento-de-eventos-service:${BARR}/eventos`)
    resp.data.forEach((valor, indice, colecao) => {
      try{
        funcoes[valor.tipo](valor.tipo)
      }
      catch(err){}
    })
  
})