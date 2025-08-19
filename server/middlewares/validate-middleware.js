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





// const { ZodError } = require("zod");

// // Middleware function to validate request body using a given schema
// const validate = (schema) => async (req, res, next) => {
//   try {
//     // Try to parse and validate req.body against schema
//     const parsedBody = await schema.parseAsync(req.body);

//     // If valid, replace req.body with parsedBody (ensures only valid data goes forward)
//     req.body = parsedBody;

//     // Move to the next middleware/controller
//     next();
//   } catch (err) {
//     // Default error response details
//     const status = 422; // Unprocessable Entity
//     const message = "Fill the input correctly";
//     let extraDetails = "Error from Backend";

//     // 1. If Zod provides detailed error messages, use the first one
//     if (Array.isArray(err.errors) && err.errors.length > 0 && typeof err.errors[0].message === "string") {
//       extraDetails = err.errors[0].message;

//     // 2. If error.message looks like a stringified array, parse and extract message
//     } else if (typeof err.message === "string" && err.message.trim().startsWith("[")) {
//       try {
//         const arr = JSON.parse(err.message);
//         if (Array.isArray(arr) && arr[0]?.message) {
//           extraDetails = arr[0].message;
//         } else {
//           extraDetails = err.message;
//         }
//       } catch {
//         extraDetails = err.message; // fallback if JSON.parse fails
//       }

//     // 3. Otherwise, use err.message directly (if available)
//     } else if (typeof err.message === "string") {
//       extraDetails = err.message;

//     // 4. If no useful message, fallback to generic
//     } else {
//       extraDetails = "Unknown error";
//     }

//     // Prepare error object
//     const error = {
//       status,
//       message,
//       extraDetails
//     };

//     // Log error for debugging
//     console.log(error);

//     // Pass error to next middleware (Express error handler)
//     next(error);
//   }
// };

// module.exports = validate;
