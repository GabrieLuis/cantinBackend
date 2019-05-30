'use strict'

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

    exports.listarClientes = async (usuario) => {
        let clientes = await Cliente.find({usuario: usuario});
        return clientes;
    }

    exports.buscarPorId = async (id) => {
        let cliente = await Cliente.findById(id);
        return cliente;
    }

    exports.novoCliente = async (data) => {
        let cliente = new Cliente(data);
        await cliente.save();
    }

    exports.editarCliente = async (id, data) => {
        await Cliente.findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                telefone: data.telefone,
                descricao: data.descricao
            }
        });
    }

    exports.excluirCliente = async (id) => {
        await Cliente.findByIdAndRemove(id);
    }