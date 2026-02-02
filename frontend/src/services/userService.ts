const API_BASE_URL = 'http://localhost:5273';

export interface GetUserResponse {
     id: string;
     username: string | null;
     email: string | null;
}

export interface RegisterUserRequest {
     username: string;
     email: string;
     password: string;
}

export interface LoginRequest {
     email: string;
     password: string;
}

export interface LoginResponse {
     token: string;
}

class UserService {
     async login(credentials: LoginRequest): Promise<LoginResponse> {
          const response = await fetch(`${API_BASE_URL}/login`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(credentials),
          });

          if (!response.ok) {
               throw new Error(`Login failed: ${response.statusText}`);
          }

          return response.json();
     }

     /**
      * Register a new user
      */
     async register(userData: RegisterUserRequest): Promise<GetUserResponse> {
          const response = await fetch(`${API_BASE_URL}/register`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(userData),
          });

          if (!response.ok) {
               throw new Error(`Registration failed: ${response.statusText}`);
          }

          return response.json();
     }

     /**
      * Get current user profile
      */
     async getCurrentUser(token: string): Promise<GetUserResponse> {
          const response = await fetch(`${API_BASE_URL}/me`, {
               method: 'GET',
               headers: {
                    'Authorization': `Bearer ${token}`,
               },
          });

          if (!response.ok) {
               throw new Error(`Failed to fetch user: ${response.statusText}`);
          }

          return response.json();
     }

     /**
      * Logout user (optional - can be just client-side)
      */
     async logout(token: string): Promise<void> {
          try {
               await fetch(`${API_BASE_URL}/logout`, {
                    method: 'POST',
                    headers: {
                         'Authorization': `Bearer ${token}`,
                    },
               });
          } catch (error) {
               console.error('Logout error:', error);
          }
     }

     /**
      * Get stored auth token from localStorage
      */
     getStoredToken(): string | null {
          return localStorage.getItem('authToken');
     }

     /**
      * Store auth token in localStorage
      */
     storeToken(token: string): void {
          localStorage.setItem('authToken', token);
     }

     /**
      * Clear stored auth token
      */
     clearToken(): void {
          localStorage.removeItem('authToken');
     }
}

export default new UserService();
