'use strict'

const express = require ('express');
const router  = express.Router();
const produtoController = require ('../controllers/produto-controller');
const authSrv = require ('../services/auth-service');

router.get('/', authSrv.autorizar, produtoController.listarProdutos);
router.get('/:id', authSrv.autorizar, produtoController.buscarPorId);
router.post('/', authSrv.autorizar, produtoController.novoProduto);
router.put('/:id', authSrv.autorizar, produtoController.editarProduto);
router.delete('/:id', authSrv.autorizar, produtoController.excluirProduto);

module.exports = router;