export interface User {
    id: number;
    email: string;
    name: string;
    condominio: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }