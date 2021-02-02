const Joi=require('@hapi/joi')
const reg_validation=(body)=>{
    const schema=Joi.object({
        name: Joi.string().required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
        
    return schema.validate(body)
}
const login_validation=(body)=>{
    const schema=Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
        
    return schema.validate(body)
}
module.exports={reg_validation,login_validation}