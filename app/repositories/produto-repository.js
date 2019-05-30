'use strict'

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

    exports.listarProdutos = async (usuario) => {
        let produtos = await Produto.find({usuario: usuario});
        return produtos;
    }

    exports.buscarPorNome = async (nome, usuario) => {
        let produto = await Produto.findOne({nome: nome, usuario: usuario});
        return produto;
    }

    exports.buscarPorId = async (id) => {
        let produto = await Produto.findById(id);
        return produto;
    }

    exports.novoProduto = async (data) => {
        let produto = new Produto(data);
        await produto.save();
    }

    exports.editarProduto = async (id, data) => {
        await Produto.findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                marca: data.marca,
                preco: data.preco,
                estoque: data.estoque
            }
        });
    }

    exports.venderProduto = async (id, novoEstoque, novoTotalVendidos) => {
        await Produto.findByIdAndUpdate(id, {
            $set: {
                estoque: novoEstoque,
                quantidadeVendida: novoTotalVendidos
            }
        });
    }

    exports.excluirProduto = async (id) => {
        await Produto.findByIdAndRemove(id);
    }
