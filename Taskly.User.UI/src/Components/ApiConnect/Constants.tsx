export const UserApiUrl: string = `https://localhost:7044`;
export const StickersApiUrl: string = `https://localhost:7162`;

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  login: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface UserFullResponse {
  id: string;
  login: string;
  email: string;
  username: string;
}
