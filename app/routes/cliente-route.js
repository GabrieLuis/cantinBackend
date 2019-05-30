'use strict'

const express = require ('express');
const router  = express.Router();
const clienteController = require ('../controllers/cliente-controller');
const authSrv = require ('../services/auth-service');

router.get('/', authSrv.autorizar, clienteController.listarClientes);
router.get('/:id', authSrv.autorizar, clienteController.buscarPorId);
router.post('/', authSrv.autorizar, clienteController.novoCliente);
router.put('/:id', authSrv.autorizar, clienteController.editarCliente);
router.delete('/:id', authSrv.autorizar, clienteController.excluirCliente);

module.exports = router;