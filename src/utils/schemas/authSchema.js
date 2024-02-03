const Joi = require('joi')

module.exports = {
    loginSchema:(()=>{
        return Joi.object().keys({
            email: Joi.string().required().email().min(3).max(100),
            password: Joi.string().required()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        });
    })(), 
} 
