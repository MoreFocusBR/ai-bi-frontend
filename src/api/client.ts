import axios from 'axios';

// Instância Axios configurada
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
});

// Nota: o interceptor de token será injetado após a inicialização do Auth0Client, 
// o que faremos num nível superior ou num hook de inicialização se preferirmos.
// Na documentação, mencionou-se que o interceptor acessaria o auth0Client globalmente.
