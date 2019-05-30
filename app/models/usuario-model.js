'use strict'

const bcrypt = require ('bcryptjs');
const mongoose = require ('mongoose');

const usuarioSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    senha: {
        type: String,
        required: true,
        select: false
    },

    senhaToken: {
        type: String,
        select: false
    },

    senhaTemporaria: {
        type: Date,
        select: false
    }

}, {versionKey:false});

usuarioSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

module.exports = mongoose.model('Usuario', usuarioSchema);