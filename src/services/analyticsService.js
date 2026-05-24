import api from './api';

export async function fetchDashboardAnalytics() {
  const response = await api.get('/analytics/dashboard');
  return response.data.data;
}

export async function fetchBranchAnalytics() {
  const response = await api.get('/analytics/branches');
  return response.data.data;
}

export async function fetchProgressAnalytics() {
  const response = await api.get('/analytics/progress');
  return response.data.data;
}
