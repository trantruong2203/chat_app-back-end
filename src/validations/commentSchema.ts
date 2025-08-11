import Joi from 'joi';

export const createCommentSchema = Joi.object({
    userid: Joi.number().integer().positive().required().messages({
        'number.base': 'userid phải là số',
        'number.integer': 'userid phải là số nguyên',
        'number.positive': 'userid phải là số dương',
        'any.required': 'userid là bắt buộc'
    }),
    postid: Joi.number().integer().positive().required().messages({
        'number.base': 'postid phải là số',
        'number.integer': 'postid phải là số nguyên',
        'number.positive': 'postid phải là số dương',
        'any.required': 'postid là bắt buộc'
    }),
    content: Joi.string().trim().min(1).max(1000).required().messages({
        'string.base': 'Nội dung comment phải là chuỗi',
        'string.empty': 'Nội dung comment không được để trống',
        'string.min': 'Nội dung comment không được để trống',
        'string.max': 'Nội dung comment không được vượt quá 1000 ký tự',
        'any.required': 'Nội dung comment là bắt buộc'
    }),
    iconid: Joi.number().integer().positive().optional().messages({
        'number.base': 'iconid phải là số',
        'number.integer': 'iconid phải là số nguyên',
        'number.positive': 'iconid phải là số dương'
    }),
    imageurl: Joi.string().uri().optional().messages({
        'string.base': 'imageurl phải là chuỗi',
        'string.uri': 'imageurl phải là URL hợp lệ'
    }),
    commentid: Joi.number().integer().positive().optional().messages({
        'number.base': 'commentid phải là số',
        'number.integer': 'commentid phải là số nguyên',
        'number.positive': 'commentid phải là số dương'
    })
});

export const updateCommentSchema = Joi.object({
    userid: Joi.number().integer().positive().required().messages({
        'number.base': 'userid phải là số',
        'number.integer': 'userid phải là số nguyên',
        'number.positive': 'userid phải là số dương',
        'any.required': 'userid là bắt buộc'
    }),
    content: Joi.string().trim().min(1).max(1000).optional().messages({
        'string.base': 'Nội dung comment phải là chuỗi',
        'string.empty': 'Nội dung comment không được để trống',
        'string.min': 'Nội dung comment không được để trống',
        'string.max': 'Nội dung comment không được vượt quá 1000 ký tự'
    }),
    iconid: Joi.number().integer().positive().optional().messages({
        'number.base': 'iconid phải là số',
        'number.integer': 'iconid phải là số nguyên',
        'number.positive': 'iconid phải là số dương'
    }),
    imageurl: Joi.string().uri().optional().allow('').messages({
        'string.base': 'imageurl phải là chuỗi',
        'string.uri': 'imageurl phải là URL hợp lệ'
    })
}).min(2); // At least userid and one field to update

export const deleteCommentSchema = Joi.object({
    userid: Joi.number().integer().positive().required().messages({
        'number.base': 'userid phải là số',
        'number.integer': 'userid phải là số nguyên',
        'number.positive': 'userid phải là số dương',
        'any.required': 'userid là bắt buộc'
    })
});

export const commentIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID comment phải là số',
        'number.integer': 'ID comment phải là số nguyên',
        'number.positive': 'ID comment phải là số dương',
        'any.required': 'ID comment là bắt buộc'
    })
});

export const postIdSchema = Joi.object({
    postId: Joi.number().integer().positive().required().messages({
        'number.base': 'ID post phải là số',
        'number.integer': 'ID post phải là số nguyên',
        'number.positive': 'ID post phải là số dương',
        'any.required': 'ID post là bắt buộc'
    })
}); 