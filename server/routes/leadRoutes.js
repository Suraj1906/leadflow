
import express from "express";
import protect from "../middleware/authMiddleware.js";



import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
} from "../controllers/leadController.js";

import {
  validateLead,
  validateLeadUpdate,
  checkValidation,
} from "../validators/leadValidator.js";

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Create lead with validation
router.post("/", validateLead, checkValidation, createLead);

// Get all leads
router.get("/", getLeads);

router.get("/stats", getLeadStats);

// Get a single lead
router.get("/:id", getLeadById);

// Update lead with validation
router.put("/:id", validateLeadUpdate, checkValidation, updateLead);

// Delete a lead
router.delete("/:id", deleteLead);

export default router;
