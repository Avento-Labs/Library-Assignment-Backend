const joi = require('joi')

export default createBorrowShema =  joi.object().keys({
    borrowDate: joi.date().timestamp().required(),
    returnDate: joi.date().timestamp().required(),
    bookId: joi.string().required(),
    userId: joi.string().required()
    
})