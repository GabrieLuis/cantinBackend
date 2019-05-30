'use strict'

const produtoRepository = require ('../repositories/produto-repository');
const authService = require ('../services/auth-service');

    exports.listarProdutos = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);


            let listaProdutos = await produtoRepository.listarProdutos(data.id);
            res.status(200).send(listaProdutos);
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao carregar os produtos', data: e});
        } 
    }

    exports.buscarPorId = async (req, res, next) => {
        try {
            let produto = await produtoRepository.buscarPorId(req.params.id);
            res.status(200).send(produto);
        }
        catch (e) {
            res.status(400).send({ message: 'Falha ao carregar o produto', data: e});
        }
    } 

    exports.novoProduto = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            let produto = await produtoRepository.buscarPorNome(req.body.nome, data.id);

            if (produto) {
                res.status(400).send({ message: 'Produto duplicado'});
                return;
            }

            produto = await produtoRepository.novoProduto({
                usuario: data.id,
                nome: req.body.nome,
                marca: req.body.marca,
                preco: req.body.preco,
                estoque: req.body.estoque
            });
            res.status(201).send({message: 'Produto salvo com sucesso'});
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao salvar o produto', data: e});
        }   
    }

    exports.editarProduto = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            let produto = await produtoRepository.buscarPorNome(req.body.nome, data.id);

            if (produto) {
                if (produto._id != req.params.id) {
                    res.status(400).send({ message: 'Produto duplicado'});
                    return;
                }
            }

            produto = await produtoRepository.editarProduto(req.params.id, req.body);
            res.status(201).send({message: 'Produto atualizado com sucesso'});

        }
        catch (e) {
            res.status(400).send({message: 'Falha ao atualizar o produto', data: e});
                
        }
    }

    exports.excluirProduto = async (req, res, next) => {
        try {
            await produtoRepository.excluirProduto(req.params.id);
            res.status(200).send({ message: 'Produto excluido com sucesso'});
        }
        catch (e) {
            res.status(400).send({ message: 'Falha ao excluir o produto', data: e});
        }
    }