'use strict'

const sendgridKey = require ('sendgrid')(process.env.sendgridKey || config.sendgridKey);

    exports.send = async (to, subject, body) => {
        sendgridKey.send({
            to: to,
            from: 'gabriellsantana13@gmail.com',
            subject: subject,
            html: body
        });
    }