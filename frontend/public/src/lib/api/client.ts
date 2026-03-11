import axios from 'axios';

// Forzar la URL correcta con /api
const API_URL = 'http://localhost:4000/api';

console.log('🔧 API URL configurada:', API_URL);
console.log('📡 Todas las peticiones irán a:', API_URL);

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para logging de peticiones
apiClient.interceptors.request.use(request => {
  const baseURL = request.baseURL || '';
  const url = request.url || '';
  console.log('🚀 Petición:', request.method?.toUpperCase(), baseURL + url);
  return request;
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    const config = error.config || {};
    const baseURL = config.baseURL || '';
    const url = config.url || '';
    
    console.error('❌ Error en petición:', {
      url: url,
      baseURL: baseURL,
      fullUrl: baseURL + url,
      method: config.method?.toUpperCase(),
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
)