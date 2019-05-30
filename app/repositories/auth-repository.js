'use strict'

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

    exports.registrarUsuario = async (data) => {
        let resultado = new Usuario(data);
        await resultado.save(); 
        return resultado;
    }

    exports.buscarEmail = async (email) => {
        const resultado = await Usuario.findOne({email: email});
        return resultado;
    }

    exports.autenticarUsuario = async (email) => {
        const resultado = await Usuario.findOne({email: email}).select('+senha');
        return resultado;
    }

    exports.lembrarSenha = async (id, data) => {
        await Usuario.findByIdAndUpdate(id, {
            $set: {
                senhaToken: data.token,
                senhaTemporaria: data.now
            }
        });
    }

    exports.resetarSenha = async (email) => {
        const resultado = await Usuario.findOne({email: email}).select('+senhaToken senhaTempo');
        return resultado;
    }

    exports.restaurarSenha = async (resultado) => {
        await resultado.save(); 
        return resultado;
    }