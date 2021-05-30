const joi = require("joi");
const { RegisterValidationErrors} = require("../../../domain/customMessages/messages");

const RegisterValidation = joi.object({
    userName: joi.string().required().messages({
        "string.base": RegisterValidationErrors.USER_NAME_TYPE,
        "any.required": RegisterValidationErrors.USER_NAME_REQUIRED
    }),
    firstName: joi.string().messages({
        "string.base": RegisterValidationErrors.FIRST_NAME_TYPE
    }),
    lastName: joi.string().messages({
        "string.base": RegisterValidationErrors.LAST_NAME_TYPE
    }),
    emailAddress: joi.string().email().required().messages({
        "string.base": RegisterValidationErrors.EMAIL_ADDRESS_TYPE,
        "any.required": RegisterValidationErrors.EMAIL_ADDRESS_REQUIRED,
        "string.email": RegisterValidationErrors.EMAIL_ADDRESS_VALID

    }),
    phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        "string.base": RegisterValidationErrors.PHONE_NUMBER_TYPE,
        "any.required": RegisterValidationErrors.PHONE_NUMBER_REQUIRED,
        "string.pattern.base": RegisterValidationErrors.PHONE_NUMBER_VALID

    }),
    password: joi.string().required().messages({
        "string.base": RegisterValidationErrors.PASSWORD_TYPE,
        "any.required": RegisterValidationErrors.PASSWORD_REQUIRED
    }),
    confirmPassword: joi.string().equal(joi.ref('password')).required({
        "string.base": RegisterValidationErrors.CONFIRM_PASSWORD_TYPE,
        "any.required": RegisterValidationErrors.CONFIRM_PASSWORD_REQUIRED,
        "string.equal": RegisterValidationErrors.CONFIRM_PASSWORD_VALID
    })

})
module.exports = RegisterValidation;