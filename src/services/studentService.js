import api from './api';

export async function fetchStudents(params = {}) {
  const response = await api.get('/students', { params: { limit: 100, ...params } });
  return response.data;
}

export async function createStudent(payload) {
  const response = await api.post('/students', payload);
  return response.data.data;
}

export async function deleteStudent(id) {
  await api.delete(`/students/${id}`);
}

export async function updateWorkflow(id, step, payload) {
  const response = await api.patch(`/students/${id}/${step}`, payload);
  return response.data.data;
}
