
import Lead from "../models/Lead.js";
import mongoose from "mongoose";

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, status } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      status,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

// @desc    Get all leads of logged-in user
// @route   GET /api/leads
// @access  Private

export const getLeads = async (req, res) => {
  try {
    const {
      search = "",
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const currentPage = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.min(
      50,
      Math.max(1, parseInt(limit) || 10)
    );

    const allowedSortFields = [
      "name",
      "company",
      "createdAt",
      "updatedAt",
    ];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const sortOrder = order === "asc" ? 1 : -1;

    const filter = {
      user: req.user.id,
    };

    if (search.trim()) {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    if (status && status !== "All") {
      if (!["New", "Contacted", "Qualified", "Lost"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status filter",
        });
      }

      filter.status = status;
    }

    const totalLeads = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      count: leads.length,
      totalLeads,
      currentPage,
      totalPages: Math.ceil(totalLeads / pageSize),
      leads,
    });
  } catch (error) {
    console.error("Get Leads Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};



// @desc    Get a single lead
// @route   GET /api/leads/:id
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Get Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
export const updateLead = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "email",
      "phone",
      "company",
      "source",
      "status",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error("Update Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Delete Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};



export const getLeadStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Base filter: only logged-in user's leads
    const filter = {
      user: new mongoose.Types.ObjectId(req.user.id),
    };

    // Apply selected date range
    if (startDate || endDate) {
      filter.createdAt = {};

      if (startDate) {
        const start = new Date(startDate);

        if (isNaN(start.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid start date",
          });
        }

        filter.createdAt.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);

        if (isNaN(end.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid end date",
          });
        }

        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const stats = await Lead.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      Lost: 0,
    };

    stats.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    const totalLeads = Object.values(statusCounts).reduce(
      (total, count) => total + count,
      0
    );

    return res.status(200).json({
      success: true,
      totalLeads,
      statusCounts,
    });
  } catch (error) {
    console.error("Lead Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};



// @desc    Get monthly lead growth for the last 6 months
// @route   GET /api/leads/growth
// @access  Private


export const getLeadGrowth = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const now = new Date();

    let start = startDate
      ? new Date(startDate)
      : new Date(now.getFullYear(), now.getMonth() - 5, 1);

    let end = endDate ? new Date(endDate) : now;

    if (
      isNaN(start.getTime()) ||
      isNaN(end.getTime()) ||
      start > end
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date range",
      });
    }

    const growthData = await Lead.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          leads: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    const dailyData = [];

    const currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0);

    const lastDate = new Date(end);
    lastDate.setHours(0, 0, 0, 0);

    while (currentDate <= lastDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const existingData = growthData.find(
        (item) =>
          item._id.year === year &&
          item._id.month === month &&
          item._id.day === day
      );

      dailyData.push({
        month: currentDate.toLocaleString("en-US", {
          month: "short",
        }),
        day,
        leads: existingData?.leads || 0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.status(200).json({
      success: true,
      growth: dailyData,
    });
  } catch (error) {
    console.error("Lead Growth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead growth",
    });
  }
};

