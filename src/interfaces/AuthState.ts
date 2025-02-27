export interface AdminInfo {
    username: string;
    environment: string;
  }
  
  export interface AuthState {
    token: string | null;
    adminInfo: AdminInfo | null;
  }
  