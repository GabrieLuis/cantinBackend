'use strict'

const express    = require ('express');
const bodyParser = require ('body-parser');
const mongoose   = require ('mongoose');
const cors = require ('cors');

const app = express();
// const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.connectionString, { useNewUrlParser: true });

/* Models */
const Produto = require ('./models/produto-model');
const Cliente = require ('./models/cliente-model');
const Venda = require ('./models/venda-model');
const Usuario = require ('./models/usuario-model');

/* Rotas */
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const vendaRoute = require('./routes/venda-route');
const authRoute = require('./routes/auth-route');

/* Usando as rotas */
app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/vendas', vendaRoute);
app.use('/auth', authRoute);

module.exports = app;
