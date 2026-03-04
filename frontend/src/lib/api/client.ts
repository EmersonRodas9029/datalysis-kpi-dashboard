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
  console.log('🚀 Petición:', request.method?.toUpperCase(), request.baseURL + request.url);
  return request;
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error en petición:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullUrl: error.config?.baseURL + error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);
