'use strict'

const vendaRepository = require ('../repositories/venda-repository');
const produtoRepository = require ('../repositories/produto-repository');
const authService = require ('../services/auth-service');

    exports.listarVendas = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            let listaVendas = await vendaRepository.listarVendas(data.id);
            res.status(200).send(listaVendas);
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao carregar vendas', data: e});
        } 
    }

    exports.buscarPorId = async (req, res, next) => {
        try {
            let venda = await vendaRepository.buscarPorId(req.params.id);
            res.status(200).send(venda);
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao carregar a venda', data: e});
        }
    }

    exports.novaVenda = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            for (let i=0; i<req.body.itensVenda.length; i++) {
                let produto = await produtoRepository.buscarPorId(req.body.itensVenda[i].produto);

                let id = req.body.itensVenda[i].produto
                let novoEstoque = produto.estoque - req.body.itensVenda[i].quantidade;
                let novoTotalVendidos = produto.quantidadeVendida + req.body.itensVenda[i].quantidade;
                
                await produtoRepository.venderProduto(id, novoEstoque, novoTotalVendidos);
            }

            let numeroVendas = await vendaRepository.listarVendas(data.id);
            
            await vendaRepository.novaVenda({
                usuario: data.id,
                numero: numeroVendas.length + 1,
                cliente: req.body.cliente,
                descontoVenda: req.body.descontoVenda,
                totalVenda: req.body.totalVenda,
                itensVenda: req.body.itensVenda
            });
            
            res.status(201).send({message: 'Venda salva com sucesso'});
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao salvar a venda', data: e});
        }   
    }