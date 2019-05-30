'use strict'

const mongoose = require ('mongoose');

const clienteSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    nome: {
        type: String,
        required: true
    },

    telefone: {
        type: String
    },

    descricao: {
        type: String
    }

}, {versionKey:false});

module.exports = mongoose.model('Cliente', clienteSchema);