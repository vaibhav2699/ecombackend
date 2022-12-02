const Joi = require("joi");
const { responseMessages } = require("../../../helper/responseMessages");

exports.category = (req, res, next) => {
  try {
    if (req.body) {
      const schema = Joi.object({ categoryName: Joi.string().required() });

      let data = schema.validate(req.body);
      if (data.error) {
        return res.send(data.error);
      } else {
        next();
      }
    } else {
      return res.send(responseMessages.imgNotfound);
    }
  } catch (error) {
    return res.send(error);
  }
};
