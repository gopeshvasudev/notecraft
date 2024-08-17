import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true }
);

function userModelValidator(userData) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": `Username must be a string`,
      "string.alphanum": `Username can only contain alpha-numeric characters`,
      "string.min": `Username must be at least {#limit} characters long`,
      "string.max": `Username cannot exceed {#limit} characters`,
    }),
    email: Joi.string().email().required().messages({
      "string.email": `Invalid email address`,
    }),
    password: Joi.string()
      .custom((value, helpers) => {
        if (value.length < 8) {
          return helpers.message(
            "Password length must be at least 8 characters"
          );
        }
        if (!/^[a-zA-Z0-9_@]+$/.test(value)) {
          return helpers.message(
            "Password must contain only underscore and alphanumeric characters"
          );
        }
        return value; // Return the value if validation passes
      })
      .required(),
  });
  const { error } = schema.validate(userData);
  return error;
}

const User = mongoose.model("User", userSchema);
export { userModelValidator };
export default User;
