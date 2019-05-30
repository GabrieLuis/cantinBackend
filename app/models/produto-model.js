'use strict'

const mongoose = require ('mongoose');

const produtoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    nome: {
        type: String,
        trim: true,
        required: true
    },

    marca: {
        type: String,
        trim: true,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    estoque: {
        type: Number,
        required: true 
    },

    quantidadeVendida: {
        type: Number,
        default: 0
    }

}, {versionKey:false});

module.exports = mongoose.model('Produto', produtoSchema);