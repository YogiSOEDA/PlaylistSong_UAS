const Joi = require("joi");

const SongPayloadSchema = Joi.object({
    title : Joi.string().required(),
    year : Joi.number().integer().min(1800).required(),
    artist: Joi.string().required(),
    gendre: Joi.string().required(),
    duration: Joi.string().regex(/^([00-60]{2}):([00-60]{2}):([00-60]{2})$/).required()

});

module.exports = SongPayloadSchema;