const joi = require('joi')

export default createBorrowShema =  joi.object().keys({
    title:  joi.string().required(),
    author: joi.string().required(),
    isbn:   joi.string().required(),
    quantity: joi.number().required().min(1)
    
})