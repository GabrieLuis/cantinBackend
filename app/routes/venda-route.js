'use strict'

const express = require ('express');
const router  = express.Router();
const vendaController = require ('../controllers/venda-controller');
const authSrv = require ('../services/auth-service');

router.get('/', authSrv.autorizar, vendaController.listarVendas);
router.get('/:id', authSrv.autorizar, vendaController.buscarPorId);
router.post('/', authSrv.autorizar, vendaController.novaVenda);

module.exports = router;