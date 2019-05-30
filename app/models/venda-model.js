'use strict'

const mongoose = require ('mongoose');

const vendaSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    numero: {
        type: Number,
        required: true
    },

    data: {
        type: Date,
        required: true,
        default: Date.now
    },

    cliente: {
        type: String,
        required: true,
        default: 'Cliente não cadastrado'
    },

    descontoVenda: {
        type: Number,
        default: 0
    },

    totalVenda: {
        type: Number,
        required: true
    },

    itensVenda: [{

        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto',
            required: true
        },

        quantidade: {
            type: Number,
            required: true
        },

        valorUnitario: {
            type: Number,
            required: true
        },

        descontoItem: {
            type: Number,
            default: 0
        },

        totalItem: {
            type: Number,
            required: true
        }
    }]

}, {versionKey:false});

module.exports = mongoose.model('Venda', vendaSchema);