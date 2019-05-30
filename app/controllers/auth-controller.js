'use strict'

const authRepository = require ('../repositories/auth-repository');
const emailService = require ('../services/email-service');
const authService = require ('../services/auth-service');
const bcrypt = require ('bcryptjs');
const crypto = require ('crypto');

    exports.registrarUsuario = async (req, res, next) => {
        try {
            
            let usuario = await authRepository.buscarEmail(req.body.email); 
             
            if (usuario) {
                res.status(400).send({message: 'Usuario existente'});
                return;
            }

            usuario = await authRepository.registrarUsuario(req.body);

            let token = await authService.gerarToken({
                id: usuario._id
            });

            usuario.senha = undefined;
            res.status(201).send({token: token, usuario: usuario});
        }
        catch (e) {
            res.status(400).send({ message: 'Falha ao salvar usuario'});
        }   
    }

    exports.autenticarUsuario = async (req, res, next) => {
        try {

            let usuario = await authRepository.autenticarUsuario(req.body.email);
            if (!usuario) {
                res.status(400).send({ message: 'Usuario não encontrado'});
                return;
            }

            if (!await bcrypt.compare(req.body.senha, usuario.senha)) {
                res.status(400).send({ message: 'E-mail ou senha invalidos'});
                return;
            }

            let token = await authService.gerarToken({
                id: usuario._id
            });

            usuario.senha = undefined;
            res.status(201).send({ token: token, usuario: usuario });
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao autenticar usuario', data: e});
        } 
    }

    exports.renovarToken = async (req, res, next) => {
        try {

            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            let data = await authService.decodificarToken(token);

            let usuario = await authRepository.buscarPorId(data.id);
            if (!usuario) {
                res.status(404).send({message: 'Usuario não encontrado'});
                return;
            }

            let novoToken = await authService.gerarToken({
                id: usuario._id
            });

            usuario.senha = undefined;
            res.status(201).send({ token: novoToken, usuario: usuario });
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao renovar token', data: e});
        } 
    }

    exports.lembrarSenha = async (req, res, next) => {
        try {

            let usuario = await authRepository.buscarEmail(req.body.email);
            if (!usuario) {
                res.status(400).send({message: 'Usuario não encontrado'});
                return;
            }

            let token = crypto.randomBytes(20).toString('hex');
            let now = new Date();
            now.setHours(now.getHours() + 1);

            let data = {token, now}
            await authRepository.lembrarSenha(usuario._id, data);

            let emailString = 'Ola, seu token de restauração de senha é: <strong>{0}</strong>.'
            emailService.send(req.body.email, 'Restauração de senha', emailString.replace('{0}', token));

            console.log(token, now);
            res.status(201).send({message: 'E-mail enviado'});
        }
        catch (e) {
            res.status(400).send({message: 'Falha ao recuperar senha token', data: e});
        }
    }

    exports.restaurarSenha = async (req, res, next) => {
        try {

            let usuario = await authRepository.resetarSenha(req.body.email);
            if (!usuario) {
                res.status(400).send({message: 'Usuario não encontrado'});
                return;
            }

            if (req.body.token !== usuario.senhaToken) {
                res.status(400).send({message: 'Token invalido'});
                return;
            }

            let now = new Date();

            if (now > usuario.senhaTemporaria) {
                res.status(400).send({message: 'Token expirado'});
                return;
            }

            usuario.senha = req.body.senha;
            await authRepository.restaurarSenha(usuario);

            res.status(201).send({message: 'Senha atualizada' });

        }
        catch (e) {
            res.status(400).send({message: 'Falha ao recuperar senha', data: e});
        }
    }