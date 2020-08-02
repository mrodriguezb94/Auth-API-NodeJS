const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.status(400).json(validation.error);
            }

            if (!req.value) {
                req.value = {};
            }

            req.value['body'] = validation.value;
            next();

            // req.value.body instead of req.body
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        }),
        logInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}