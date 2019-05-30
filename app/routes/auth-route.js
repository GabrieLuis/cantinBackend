'use strict'

const express = require ('express');
const router  = express.Router();
const authController = require ('../controllers/auth-controller');
const authSrv = require ('../services/auth-service');

router.post('/', authController.registrarUsuario);
router.post('/autenticar', authController.autenticarUsuario);
router.post('/renovar-token', authSrv.autorizar, authController.renovarToken);
router.post('/lembrar-senha', authController.lembrarSenha);
router.post('/restaurar-senha', authController.restaurarSenha);
 
module.exports = router;