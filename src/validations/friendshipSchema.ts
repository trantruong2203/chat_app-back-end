import joi from 'joi';

const friendshipSchema = joi.object({
    userid: joi.number().required().messages({
        'number.base': `"userid" phải là số`,
        'number.empty': `"userid" không được để trống`,
        'any.required': `"userid" là bắt buộc`
    }),
    sentat: joi.number().required().messages({
        'number.base': `"sentat" phải là số`,
        'number.empty': `"sentat" không được để trống`,
        'any.required': `"sentat" là bắt buộc`
    }),
    status: joi.boolean().required().messages({
        'boolean.base': `"status" phải là boolean`,
        'boolean.empty': `"status" không được để trống`,
        'any.required': `"status" là bắt buộc`
    }),
})

export default friendshipSchema;