'use strict'

const clienteRepository = require ('../repositories/cliente-repository');
const authService = require ('../services/auth-service');

    exports.listarClientes = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            let listaClientes = await clienteRepository.listarClientes(data.id);
            res.status(200).send(listaClientes);
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao carregar clientes', data: e});
        } 
    }

    exports.buscarPorId = async (req, res, next) => {
        try {
            let cliente = await clienteRepository.buscarPorId(req.params.id);
            res.status(200).send(cliente);
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao carregar o cliente', data: e});
        }
    }

    exports.novoCliente = async (req, res, next) => {
        try {
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            await clienteRepository.novoCliente({
                usuario: data.id,
                nome: req.body.nome,
                telefone: req.body.telefone,
                descricao: req.body.descricao
            });
            res.status(201).send({message: 'Cliente salvo com sucesso'});
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao salvar o cliente', data: e});
        }   
    }

    exports.editarCliente = async (req, res, next) => {
        try {
            await clienteRepository.editarCliente(req.params.id, req.body);
            res.status(201).send({message: 'Cliente atualizado com sucesso'});
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao atualizar o cliente', data: e});     
        }
    }

    exports.excluirCliente = async (req, res, next) => {
        try {
            await clienteRepository.excluirCliente(req.params.id);
            res.status(200).send({message: 'Cliente excluido com sucesso'});
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao excluir o cliente', data: e});
        }
    }