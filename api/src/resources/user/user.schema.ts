import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "O nome deve ter no mínimo 3 caracteres.",
    "string.empty": "O nome é obrigatório.",
    "any.required": "O nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O email informado não é válido.",
    "string.empty": "O email é obrigatório.",
    "any.required": "O email é obrigatório.",
  }),
  password: Joi.string()
    .pattern(
      /^(?=(?:.*[a-z]){1,})(?=(?:.*[A-Z]){1,})(?=(?:.*[0-9]){1,})(?=(?:.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.",
      "string.empty": "A senha é obrigatória.",
      "any.required": "A senha é obrigatória.",
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "O nome deve ter no mínimo 3 caracteres.",
  }),
  email: Joi.string().email().messages({
    "string.email": "O email informado não é válido.",
  }),
  password: Joi.string()
    .pattern(
      /^(?=(?:.*[a-z]){1,})(?=(?:.*[A-Z]){1,})(?=(?:.*[0-9]){1,})(?=(?:.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
    )
    .messages({
      "string.pattern.base":
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.",
    }),
}).min(1);
