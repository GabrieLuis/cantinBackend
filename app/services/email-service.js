'use strict'

const sendgridKey = require ('sendgrid')(process.env.sendgridKey);

    exports.send = async (to, subject, body) => {
        sendgridKey.send({
            to: to,
            from: '',
            subject: subject,
            html: body
        });
    }