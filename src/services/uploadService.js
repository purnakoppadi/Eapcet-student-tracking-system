import api from './api';

export async function uploadStudentsCsv(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  console.log(`[Upload Service] Uploading file: ${file.name}, size: ${file.size} bytes`);
  
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('[Upload Service] Upload successful:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('[Upload Service] Upload failed:', error.message);
    console.error('[Upload Service] Error response:', error.response?.data);
    throw error;
  }
}
