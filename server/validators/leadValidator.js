
import { body, validationResult } from "express-validator";

export const validateLead = [
  body("name")
    .trim()
    .notEmpty().withMessage("Lead name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),

  body("company")
    .trim()
    .notEmpty().withMessage("Company name is required"),

  body("source")
    .notEmpty().withMessage("Lead source is required")
    .isIn(["Website", "LinkedIn", "Referral", "Advertisement", "Other"])
    .withMessage("Invalid lead source"),

  body("status")
    .optional()
    .isIn(["New", "Contacted", "Qualified", "Lost"])
    .withMessage("Invalid lead status"),
];

export const validateLeadUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 characters"),

  body("company")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company name cannot be empty"),

  body("source")
    .optional()
    .isIn(["Website", "LinkedIn", "Referral", "Advertisement", "Other"])
    .withMessage("Invalid lead source"),

  body("status")
    .optional()
    .isIn(["New", "Contacted", "Qualified", "Lost"])
    .withMessage("Invalid lead status"),
];

export const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};
