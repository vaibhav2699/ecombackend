const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const { responseMessages } = require("../../../helper/responseMessages");

exports.product = (req, res, next) => {
  try {
    if (req.body) {
      const schema = Joi.object({
        name: Joi.string().required(),
        specification: Joi.string(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        discountPrice: Joi.number(),
        categoryId: Joi.objectId(),
      });

      let data = schema.validate(req.body);
      if (data.error) {
        return res.send(data.error);
      } else {
        next();
      }
    } else {
      return res.send(responseMessages.prodcutNotfound);
    }
  } catch (error) {
    return res.send(error);
  }
};
