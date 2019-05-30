'use strict'

const mongoose = require('mongoose');
const Venda = mongoose.model('Venda');

    exports.listarVendas = async (usuario) => {
        let vendas = await Venda.find({usuario: usuario});
        return vendas;
    }

    exports.buscarPorId = async (id) => {
        let venda = await Venda.findById(id);
        return venda;
    }

    exports.novaVenda = async (data) => {
        let venda = new Venda(data);
        await venda.save();
    }