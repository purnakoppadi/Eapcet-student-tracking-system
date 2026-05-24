import api from './api';

export async function uploadStudentsCsv(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  console.log(`[Upload Service] Starting upload: file=${file.name}, size=${file.size} bytes`);
  console.log(`[Upload Service] API Base URL: ${api.defaults.baseURL}`);
  
  try {
    console.log('[Upload Service] Sending FormData to /upload endpoint...');
    const response = await api.post('/upload', formData);
    
    console.log('[Upload Service] Upload response received:', response.status);
    console.log('[Upload Service] Response data:', response.data);
    
    if (response.data?.success) {
      console.log(`[Upload Service] ✅ Upload successful: inserted=${response.data.data?.inserted}, rejected=${response.data.data?.rejected}`);
      return response.data.data;
    }
    
    throw new Error(response.data?.message || 'Upload failed');
  } catch (error) {
    console.error('[Upload Service] ❌ Upload failed:', error.message);
    if (error.response) {
      console.error('[Upload Service] Error status:', error.response.status);
      console.error('[Upload Service] Error response:', error.response.data);
    } else if (error.request) {
      console.error('[Upload Service] No response received:', error.request);
    } else {
      console.error('[Upload Service] Error:', error);
    }
    throw error;
  }
}
