'use strict'

const jwt = require ('jsonwebtoken');

    exports.gerarToken = async (data) => {
        return jwt.sign(data, process.env.api, {expiresIn: '1d'});
    }

    exports.decodificarToken = async (token) => {
        let data = await jwt.verify(token, process.env.api);
        return data;
    }

    exports.autorizar = (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            res.status(401).json({message: 'Acesso não autorizado'});
        } else {
            jwt.verify(token, process.env.api, (error, decoded) => {
                if (error) {
                    res.status(401).json({message: 'Token invalido'});
                } else {
                    next();
                }
            });
        }
    }