const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input correctly";
    let extraDetails = "Error from Backend";

    // Prefer Zod error messages
    if (Array.isArray(err.errors) && err.errors.length > 0 && typeof err.errors[0].message === "string") {
      extraDetails = err.errors[0].message;
    } else if (typeof err.message === "string" && err.message.trim().startsWith("[")) {
      // If err.message is a stringified array, try to parse and extract the first message
      try {
        const arr = JSON.parse(err.message);
        if (Array.isArray(arr) && arr[0]?.message) {
          extraDetails = arr[0].message;
        } else {
          extraDetails = err.message;
        }
      } catch {
        extraDetails = err.message;
      }
    } else if (typeof err.message === "string") {
      extraDetails = err.message;
    } else {
      extraDetails = "Unknown error";
    }

    const error = {
      status,
      message,
      extraDetails
    };

    console.log(error);
    next(error);
  }
};

module.exports = validate;
