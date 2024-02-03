const joi = require('joi')

export default createBorrowShema =  joi.object().keys({
    name:  joi.string().required(),
    email: joi.email().required(),
    password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})      