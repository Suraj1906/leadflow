
import api from "./api";

const getStats = async (params = {}) => {
  const response = await api.get("/leads/stats", { params });
  return response.data;
};

const getLeads = async (params = {}) => {
  const response = await api.get("/leads", { params });
  return response.data;
};

const createLead = async (leadData) => {
  const response = await api.post("/leads", leadData);
  return response.data;
};

const updateLead = async (id, leadData) => {
  const response = await api.put(`/leads/${id}`, leadData);
  return response.data;
};

const getGrowth = async (params = {}) => {
  const response = await api.get("/leads/growth", { params });
  return response.data;
};

const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

const leadService = {
  getStats,
  getLeads,
  createLead,
  updateLead,
  deleteLead,
   getGrowth,
};

export default leadService;
